import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import CreateAccount from './CreateAccount';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const FormContainer = styled.div`
  padding: 20px;
  background-color: #1a1a2e;  // A deep blue tone
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);  // Darker shadow for depth
  max-width: 400px;
  margin: 40px auto;
  color: #e0e1dd;  // Light gray text for contrast
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #c2c2f0;  // Light blue to maintain readability
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  background-color: #0f0f22;  // Very dark blue, almost black
  color: #e0e1dd;  // Light text color for contrast
  border: 1px solid #2e2e6a;  // Darker blue border
  border-radius: 4px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #0a0a23;  // Very dark blue
  color: #ffffff;  // White text
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #161641;  // Slightly lighter blue on hover
  }
`;
export const CreateAccountButton = styled(Button)`
  background-color: #007bff; // A bright blue to stand out
  color: #ffffff;
  border: 1px solid #0056b3; // Slightly darker border for emphasis
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post('http://localhost:5000/authenticate', {
            username: username,
            password: password
          });
          const { token } = response.data;
          localStorage.setItem('token', token);
          navigate('/');
        } catch (error) {
            if(error.response) {
                alert(error.response.data.message);
            } else {
                console.error('Error', error.message);
            }
        }
    };

    const handleCreateAccount = () => {
        navigate('/create-account'); 
      };
  
    return (
      <FormContainer>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
          <Button type="submit">Sign In</Button>
          <CreateAccountButton onClick={handleCreateAccount}>Create Account</CreateAccountButton>
        </form>
      </FormContainer>
    );
  }
  
  export default SignIn;