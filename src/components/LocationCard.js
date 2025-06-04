import React from 'react';
    import { Card, CardContent, Typography } from '@mui/material';
    import CrowdCountDisplay from './CrowdCountDisplay';

    const LocationCard = ({ location }) => {
        return (
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {location.Name}
                    </Typography>
                    <Typography color="textSecondary">
                        Capacity: {location.Capacity}
                    </Typography>
                     <CrowdCountDisplay locationId={location.Location_ID} />
                    {/* You might also want to include a link to a details page */}
                    {/* <Link to={`/location/${location.Location_ID}`}>View Details</Link> */}
                </CardContent>
            </Card>
        );
    };

    export default LocationCard;