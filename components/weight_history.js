import React, { useEffect, useState} from 'react';

function WeightHistory({ username }) {
    const [weights, setWeights] = useState([]);

    useEffect(() => {
        const fetchWeights = async () => {
            const response = await fetch(`http://localhost:5000/get_weights/${username}`);
            const data = await response.json();
            setWeights(data)
        };

        fetchWeights();
    }, [username]);

    return (
        <ul>
            {weights.map((entry, index) => (
                <li key={index}>{`Date: ${entry.date}, Weight: ${entry.weight} lbs`}</li>
            ))}
        </ul>
    );
}

export default WeightHistory;