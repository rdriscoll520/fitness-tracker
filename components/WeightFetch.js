import React, { useEffect, useState } from 'react';
import WeightChart from './WeightChart';

const WeightTracker = ({ username }) => {
    const [weights, setWeights] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeights = async () => {
            try {
                const response = await fetch(`http://localhost:5000/get_weights/${username}`);
                if (response.ok) {
                    const data = await response.json();
                    setWeights(data);
                    setLoading(false);
                } else {

                    console.error('Failed to fetch weights');
                }
            } catch (error) {
                console.error('Error fetching weights:', error);
            }
        };

        if (username) {
            fetchWeights();
        }
    }, [username]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Weight Tracker</h1>
            {weights.length > 0 ? <WeightChart weights={weights} /> : <p>No weight data available.</p>}
        </div>
    );
};

export default WeightTracker;
