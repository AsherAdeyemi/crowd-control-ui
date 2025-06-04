import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import { Typography } from '@mui/material';

    const CrowdCountDisplay = ({ locationId }) => {
        const [crowdCount, setCrowdCount] = useState(0);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost/CrowdControlSystem/get_crowd_data.php`);
                    // Find the latest crowd count for the specified location
                    const latestData = response.data.filter(item => item.Location_ID === locationId).sort((a,b) => new Date(b.Timestamp) - new Date(a.Timestamp))[0];
                    setCrowdCount(latestData ? latestData.Crowd_Count : 0);
                } catch (err) {
                    setError(err);
                } finally {
                    setLoading(false);
                }
            };

            fetchData(); // Initial fetch

            const intervalId = setInterval(fetchData, 5000); // Poll every 5 seconds (adjust as needed)

            return () => clearInterval(intervalId); // Cleanup on unmount
        }, [locationId]);

        if (loading) {
            return <Typography>Loading count...</Typography>;
        }

        if (error) {
            return <Typography color="error">Error: {error.message}</Typography>;
        }

        return (
            <Typography variant="body1">
                Current Crowd: {crowdCount}
            </Typography>
        );
    };

    export default CrowdCountDisplay;