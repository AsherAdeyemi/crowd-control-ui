import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapComponent = ({ markers = [] }) => {
    const center = markers.length > 0
        ? [parseFloat(markers[0].lat), parseFloat(markers[0].lng)]
        : [8.9581, 7.7004];

    return (
        <div style={{ height: '400px', width: '100%', marginTop: '20px' }}>
            <MapContainer center={center} zoom={15} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        position={[parseFloat(marker.lat), parseFloat(marker.lng)]}
                    >
                        <Popup>
                            <div>
                                <p>Location: <strong>{marker.name}</strong></p>
                                <p>Crowd Count: <strong>{marker.crowdCount}</strong></p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapComponent;