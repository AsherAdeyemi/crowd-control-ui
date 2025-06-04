import React, { useState, useEffect } from 'react';
    import { useParams } from 'react-router-dom';
    import axios from 'axios';
    import CrowdGraph from './CrowdGraph'; // Import the CrowdGraph component
    import { Typography } from '@mui/material';

    const LocationDetails = () => {
        const { locationId } = useParams();
        const [location, setLocation] = useState(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        useEffect(() => {
            const fetchLocationDetails = async () => {
                try {
                    //  For simplicity,  use get_locations.php to get location details
                    const locationsResponse = await axios.get('http://localhost/CrowdControlSystem/get_locations.php');
                    const selectedLocation = locationsResponse.data.find(loc => loc.Location_ID === parseInt(locationId));

                    if (!selectedLocation) {
                        setError(new Error('Location not found'));
                        return;
                    }
                    setLocation(selectedLocation);

                } catch (err) {
                    setError(err);
                } finally {
                    setLoading(false);
                }
            };
            fetchLocationDetails();
        }, [locationId]);

        if (loading) {
            return <div>Loading location details...</div>;
        }

        if (error) {
            return <div>Error: {error.message}</div>;
        }

        if (!location) {
            return <div>Location not found.</div>;
        }

        return (
            <div>
                <h1>{location.Name}</h1>
                <Typography variant="body1">
                    Capacity: {location.Capacity}
                </Typography>

                <CrowdGraph locationId={parseInt(locationId)} />

            </div>
        );
    };

    export default LocationDetails;