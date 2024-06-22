import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';

const HistoryContainer = styled.div`
  padding: 20px;
  background-color: #1a1a2e;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  max-width: 600px;  // Slightly wider to accommodate more content
  margin: 40px auto;
  color: #e0e1dd;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  padding: 8px;
  border-bottom: 1px solid #2e2e6a; // A subtle line between items
  &:last-child {
    border-bottom: none; // Remove border from the last item
  }
`;

const ErrorMessage = styled.div`
  color: #E57373; // A light red for errors
  text-align: center;
  padding: 20px;
`;

const NoDataMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #B0BEC5; // A muted color for "no data" messages
`;
const HistoryGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;  // 2 parts for the date, 1 part for the weight
  gap: 10px;
  padding: 20px;
`;

const GridHeader = styled.div`
  font-weight: bold;
  padding: 10px;
  color: #e0e1dd;
  background-color: #1a1a2e;
  border-radius: 4px;
  text-align: center;
`;

const GridItem = styled.div`
  background-color: #0f0f22;
  padding: 10px;
  border-radius: 4px;
  color: #e0e1dd;
  text-align: center;
`;



function WeightHistory() {
    const [weights, setWeights] = useState([]);
    const [error, setError] = useState(null);
    const auth = useAuth();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(undefined, {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true  // Use 12-hour format; set to false for 24-hour format
        });
    };

    useEffect(() => {
        const fetchWeights = async () => {
            const token = localStorage.getItem('token');
            if (!token || !auth.isAuthenticated) {
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
    }, [auth.isAuthenticated]);

    if (error) {
        return <ErrorMessage>Error: {error}</ErrorMessage>;
    }

    return (
        <HistoryContainer>
            <HistoryGrid>
                <GridHeader>Date and Time</GridHeader>
                <GridHeader>Weight</GridHeader>
                {weights.length > 0 ? (
                    weights.map((entry, index) => (
                        <React.Fragment key={index}>
                            <GridItem>{formatDate(entry.date)}</GridItem>
                            <GridItem>{`${entry.weight} lbs`}</GridItem>
                        </React.Fragment>
                    ))
                ) : (
                    <GridItem style={{ gridColumn: "1 / -1" }}>No weight history available for this user.</GridItem>
                )}
            </HistoryGrid>
        </HistoryContainer>
    );
}

export default WeightHistory;