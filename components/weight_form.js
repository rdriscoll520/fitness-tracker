import React, { useState } from 'react';

function WeightForm() {
    //hooks
    const [username, setUsername] = useState('');
    const [weight, setWeight] = useState('');

    //asynchronus function to handle forms
    const handleSubmit = async (event) => {
        event.preventDefault();

        //POST request
        const response = await fetch('http://localhost:5000/add_weight', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ username, weight }) 
        });
        //convert the data to a JSON object
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
            <button type="submit">Submit</button>
        </form>
    )
}

export default WeightForm;