import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation

function UsernameForm() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = (event) => {
        event.preventDefault();
        if (username) { // Check if username is not empty
            navigate(`/weight-history/${username}`);
        } else {
            alert('Please enter a username.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit">View Weight History</button>
            </form>
        </div>
    );
}

export default UsernameForm;
