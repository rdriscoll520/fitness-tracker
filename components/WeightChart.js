import React from 'react';
import { Line } from 'react-chartjs-2';

const WeightChart = ({ weights }) => {
    const data = {
        labels: weights.map(weight => new Date(weight.date).toLocaleDateString()),
        datasets: [
            {
                label: 'Weight over Time',
                data: weights.map(weight => weight.value),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: false
            }
        },
        responsive: true,
        maintainAspectRatio: false
    };

    return <Line data={data} options={options} />;
};

export default WeightChart;
