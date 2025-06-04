import React, { useState, useEffect, useRef } from 'react';
    import axios from 'axios';
    import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
    import { Typography } from '@mui/material';

    const CrowdGraph = ({ locationId }) => {
        const [crowdData, setCrowdData] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        const chartContainerRef = useRef(null);
        const [chartWidth, setChartWidth] = useState(0);

         useEffect(() => {
            const updateDimensions = () => {
              if (chartContainerRef.current) {
                setChartWidth(chartContainerRef.current.offsetWidth);
              }
            };

            updateDimensions();
            window.addEventListener('resize', updateDimensions);

            return () => {
              window.removeEventListener('resize', updateDimensions);
            };
          }, []);


        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost/CrowdControlSystem/get_crowd_data.php?location_id=${locationId}`);
                    //  Filter data for the specific location
                    const locationData = response.data.filter(item => item.Location_ID === locationId);

                    // Transform the data into a format suitable for Recharts
                    const formattedData = locationData.map(item => ({
                        timestamp: new Date(item.Timestamp).toLocaleTimeString(), // Format the timestamp
                        crowdCount: item.Crowd_Count,
                    }));
                    setCrowdData(formattedData);
                } catch (err) {
                    setError(err);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }, [locationId]);

        if (loading) {
            return <Typography>Loading graph...</Typography>;
        }

        if (error) {
            return <Typography color="error">Error: {error.message}</Typography>;
        }

        return (
          <div ref={chartContainerRef} style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={crowdData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="crowdCount" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
            </div>
        );
    };

    export default CrowdGraph;