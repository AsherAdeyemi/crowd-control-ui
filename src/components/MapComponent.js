// components/MapComponent.js
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

// Updated MapComponent to receive and render dynamic data from props
const MapComponent = ({ markers = [] }) => {
  const center = markers.length > 0
    ? [parseFloat(markers[0].Latitude), parseFloat(markers[0].Longitude)]
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
            key={marker.ID || marker.id}
            position={[parseFloat(marker.Latitude), parseFloat(marker.Longitude)]}
          >
            <Popup>
              Crowd Count: <strong>{marker.Crowd_Count || marker.crowd}</strong>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
