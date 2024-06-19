import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';


function WeightHistory() {
    const [weights, setWeights] = useState([]);
    const [error, setError] = useState(null);
    const auth = useAuth();  // Use the useAuth hook to access the authentication status

    useEffect(() => {
        const fetchWeights = async () => {
            const token = localStorage.getItem('token');  // Retrieve the token from localStorage
            if (!token || !auth.isAuthenticated) { // Check if token and authenticated state are valid
                return;
            }
            try {
                const response = await fetch('http://localhost:5000/get_weights', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setWeights(data);
            } catch (err) {
                setError('Failed to fetch weights. Please try again later.');
                console.error('Fetch error:', err);
            }
        };

        fetchWeights();
    }, [auth.isAuthenticated]); // Depend on isAuthenticated to re-run when authentication status changes

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <ul>
            {weights.length > 0 ? (
                weights.map((entry, index) => (
                    <li key={index}>{`Date: ${entry.date}, Weight: ${entry.weight} lbs`}</li>
                ))
            ) : (
                <div>No weight history available for this user.</div>
            )}
        </ul>
    );
}

export default WeightHistory;
