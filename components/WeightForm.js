import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';

// Styled components
const FormContainer = styled.div`
  padding: 20px;
  background-color: #1a1a2e;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  max-width: 400px;
  margin: 40px auto;
  color: #e0e1dd;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  background-color: #0f0f22;
  color: #e0e1dd;
  border: 1px solid #2e2e6a;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #0a0a23;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #161641;
  }
`;

// WeightForm component
function WeightForm() {
    const { isAuthenticated } = useAuth();
    const [weight, setWeight] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/sign-in');  
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');  

        if (!token) {
            alert('Please sign in to submit your weight.');
            return;
        }

        const response = await fetch('http://localhost:5000/add_weight', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ weight })
        });
        const data = await response.json();
        if (response.ok) {
            alert(data.message);
            setWeight(''); // Clear the weight input after successful submission
        } else {
            alert(data.message || 'Failed to add weight');
        }
        
    };
    
    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <Input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Enter weight in lbs"
                    required
                />
                <Button type="submit">Submit</Button>
            </form>
        </FormContainer>
    );
}

export default WeightForm;
