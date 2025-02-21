import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Line } from 'react-chartjs-2'; // Chart.js for the chart component
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Content = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [{
            label: 'Expenses Over Time',
            data: [30, 40, 35, 50, 60],
            borderColor: '#1f77b4',
            fill: false,
        }]
    };

    return (
        <div className="container-fluid p-4">
            <h2>Welcome </h2>
            <Row className="mt-4">
                <Col md={4}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>Total Income</Card.Title>
                            <Card.Text style={{ color: 'lightgreen',fontSize:"25px" }}>
                                ₪10,000
                            </Card.Text>
                            
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>Total Expenses</Card.Title>
                            <Card.Text style={{ color: 'red',fontSize:"25px" }}>
                              ₪4,500
                            </Card.Text>
                            
                        </Card.Body>
                    </Card>
                </Col>
                
                <Col md={4}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>Monthly Savings</Card.Title>
                            <Card.Text style={{ color: 'lightblue',fontSize:"25px" }}>
                                ₪2,000
                            </Card.Text>
                            
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-4">
    <Col md={12}>
        <Card className="shadow-sm">
            <Card.Body>
                <Card.Title>Expense Trend</Card.Title>
                <div style={{ width: '100%', height: '600px' }}> 
                    <Line data={data} options={{ maintainAspectRatio: false }} />
                </div>
            </Card.Body>
        </Card>
    </Col>
</Row>

        </div>
    );
}

export default Content;
