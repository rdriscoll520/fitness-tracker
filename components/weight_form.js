import React, { useState } from 'react';

function WeightForm() {
    const [username, setUsername] = useState('');
    const [weight, setWeight] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:5000/add_weight', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ username, weight }) 
        });
        const data = await response.json();
        alert(data.message);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
            />
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
