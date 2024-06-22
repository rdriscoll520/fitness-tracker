from flask import Flask, request, jsonify
from pymongo import MongoClient
import datetime
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from datetime import datetime, timezone, timedelta
import logging
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError
import os

logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(app)

client = MongoClient('mongodb://localhost:27017/')
db = client['FitnessApp']
weights_collection = db['weight']
users_collection = db['users']

SECRET_KEY = os.environ.get('SECRET_KEY', 'your_very_secret_key_here')

@app.route('/authenticate', methods=['POST'])
def authenticate_user():
    credentials = request.json
    user = users_collection.find_one({'username': credentials['username']})

    if user and check_password_hash(user['password'], credentials['password']):
        token = jwt.encode({
            'sub': user['username'],
            'iat': datetime.now(timezone.utc),  # Issued at time (timezone aware)
            'exp': datetime.now(timezone.utc) + timedelta(days=1),  # Expiry time
            'user_id': str(user['_id']),  # Include user ID in the token
            'email': user['email']  # Include additional user information
        }, SECRET_KEY, algorithm='HS256')
        return jsonify({'token': token}), 200
    else:
        return jsonify({'message': 'Invalid username or password'}), 401

@app.route("/create_account", methods=['POST'])
def create_account():
    user_data = request.json
    user_data['password'] = generate_password_hash(user_data['password'])

    if users_collection.find_one({'username': user_data['username']}):
        return jsonify({'message': 'Username already exists'}), 409

    user_data['created_at'] = datetime.now(timezone.utc)  # Ensure created_at is set
    result = users_collection.insert_one(user_data)

    return jsonify({'message': 'User created', 'id': str(result.inserted_id)}), 201

@app.route('/protected_route', methods=['GET'])
def protected_route():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'message': 'Authorization header is missing'}), 403
    try:
        token_type, token = auth_header.split()
        if token_type.lower() != 'bearer':
            raise ValueError('Authorization header must start with Bearer')
        data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return jsonify({'user_id': data['user_id'], 'username': data['sub'], 'email': data['email']}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token'}), 401
    except Exception as e:
        logging.error(f'Error: {e}')
        return jsonify({'message': 'An error occurred processing your request'}), 400

@app.route('/add_weight', methods=['POST'])
def add_weight():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'message': 'Authorization header is missing'}), 403
    try:
        token_type, token = auth_header.split()
        if token_type.lower() != 'bearer':
            raise ValueError('Authorization header must start with Bearer')
        data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token'}), 401
    except Exception as e:
        logging.error(f'Error: {e}')
        return jsonify({'message': 'An error occurred processing your request'}), 400

    weight_data = request.json
    if 'weight' not in weight_data:
        return jsonify({'message': 'Weight value is missing'}), 400

    try:
        weight_data['username'] = data['sub']
        weight_data['user_id'] = data['user_id']  # Include user ID
        weight_data['email'] = data['email']  # Include additional user information

        # Use custom date if provided, otherwise use current time
        weight_data['date'] = weight_data.get('date', datetime.now(timezone.utc).isoformat())
        weight_data['value'] = float(weight_data['weight'])  # Ensure value is stored as a number

        logging.debug(f'Inserting weight data: {weight_data}')
        result = weights_collection.insert_one(weight_data)
        return jsonify({'message': 'Weight added', 'id': str(result.inserted_id)}), 201
    except KeyError as e:
        logging.error(f'KeyError: {e}')
        return jsonify({'message': f'Missing key: {e}'}), 400
    except Exception as e:
        logging.error(f'Error: {e}')
        return jsonify({'message': 'An error occurred processing your request'}), 400


@app.route('/get_weights', methods=['GET'])
def get_weights():
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({'message': 'Authorization header is missing or invalid'}), 403

    token = auth_header.split(' ')[1]
    try:
        data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        username = data['sub']
        
        logging.debug(f'Retrieving weights for user: {username}')
        weights = list(weights_collection.find({'username': username}, {'_id': 0}))
        logging.debug(f'Retrieved weights: {weights}')
        
        return jsonify(weights), 200
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token'}), 401
    except Exception as e:
        logging.error(f'Error: {e}')
        return jsonify({'message': 'An error occurred processing your request', 'error': str(e)}), 400

@app.route('/verify_token', methods=['POST'])
def verify_token():
    auth_header = request.headers.get('Authorization')
    if auth_header:
        token = auth_header.split(" ")[1]  # Assumes Bearer token
        try:
            jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            return jsonify({"message": "Token is valid"}), 200
        except ExpiredSignatureError:
            return jsonify({"message": "Token has expired"}), 401
        except InvalidTokenError:
            return jsonify({"message": "Invalid token"}), 401
    return jsonify({"message": "Authorization header is missing"}), 403

if __name__ == "__main__":
    app.run(debug=True)
