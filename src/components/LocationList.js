import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const LocationList = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get('http://localhost/CrowdControlSystem/get_locations.php');
                setLocations(Array.isArray(response.data) ? response.data : []);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchLocations();
    }, []);

    if (loading) return <div>Loading locations...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Locations</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                {locations.map((location) => (
                    <Card key={location.Location_ID}>
                        <CardContent>
                            <Typography variant="h5">{location.Name}</Typography>
                            <Typography color="textSecondary">
                                Latitude: {location.Latitude}, Longitude: {location.Longitude}
                            </Typography>
                            <Typography color="textSecondary">
    Capacity: {location.Capacity}
</Typography>

                            <Link to={`/location/${location.Location_ID}`}>View Details</Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default LocationList;
