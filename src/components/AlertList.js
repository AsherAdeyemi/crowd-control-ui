import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import { Alert } from '@mui/material';

    const AlertList = () => {
        const [alerts, setAlerts] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        useEffect(() => {
            const fetchAlerts = async () => {
                try {
                    const response = await axios.get('http://localhost/CrowdControlSystem/get_alerts.php');
                    setAlerts(response.data);
                } catch (err) {
                    setError(err);
                } finally {
                    setLoading(false);
                }
            };
            fetchAlerts();
        }, []);

        if (loading) {
            return <div>Loading alerts...</div>;
        }

        if (error) {
            return <div>Error: {error.message}</div>;
        }

        if (alerts.length === 0) {
          return <div>No alerts at this time.</div>
        }

        return (
            <div>
                <h1>Alerts</h1>
                {alerts.map((alert) => (
                    <Alert key={alert.Notification_ID} severity="warning" style={{ marginBottom: '8px' }}>
                        {alert.Message} (Sent: {new Date(alert.Sent_Time).toLocaleString()})
                    </Alert>
                ))}
            </div>
        );
    };

    export default AlertList;