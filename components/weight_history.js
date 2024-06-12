import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // Import useParams

function WeightHistory() {
    const [weights, setWeights] = useState([]);
    const [error, setError] = useState(null);
    const { username } = useParams();  // Destructure username from URL parameters

    useEffect(() => {
        const fetchWeights = async () => {
            if (!username) { // Check if username is available
                return;
            }
            try {
                const response = await fetch(`http://localhost:5000/get_weights/${username}`);
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
    }, [username]); // Dependency array includes username to re-run when username changes

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
