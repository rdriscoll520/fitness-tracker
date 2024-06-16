import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
        } else {
            alert(data.message || 'Failed to add weight');  
        }
        
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight in lbs"
                required
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default WeightForm;
