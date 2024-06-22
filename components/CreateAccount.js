import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 20px;
  background-color: #1a1a2e;  // A deep blue tone
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);  // Darker shadow for depth
  max-width: 400px;
  margin: 40px auto;
  color: #e0e1dd;  // Light gray text for contrast
`;

const Form = styled.form`
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: left; // Center align the content of FormGroup
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #c2c2f0;  // Light blue to maintain readability
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  background-color: #0f0f22;  // Very dark blue, almost black
  color: #e0e1dd;  // Light text color for contrast
  border: 1px solid #2e2e6a;  // Darker blue border
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px 0;
  background-color: #4c6ef5;  // Bright blue for contrast
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #3b54e2;  // Darker blue on hover
    transform: translateY(-2px);  // Subtle lift effect
  }
`;

const ErrorMsg = styled.span`
  color: #ff3860;  // A bright color for error messages
`;
const CreateAccount = () => {
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    const navigate = useNavigate();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
  
      try {
        const response = await axios.post('http://localhost:5000/create_account', {
          username: formData.username,
          email: formData.email,
          password: formData.password
        });
        alert(response.data.message);
        navigate('/sign-in')
      } catch (error) {
        alert("An error occurred while creating the account.");
        console.error(error);
      }
    };
  
    return (
        <Container>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Username</Label>
            <Input type="text" name="username" value={formData.username} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label>Confirm Password</Label>
            <Input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </FormGroup>
          <Button type="submit">Create Account</Button>
        </Form>
      </Container>
    );
  };
  
  export default CreateAccount;