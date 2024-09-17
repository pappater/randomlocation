import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

interface MapProps {
  lat: number;
  lng: number;
  isDarkMode: boolean; // Add isDarkMode prop
}

const Map: React.FC<MapProps> = ({ lat, lng, isDarkMode }) => {
  const markerIcon = new L.Icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
  });

  return (
    <MapContainer
      key={`${lat}-${lng}`}
      center={[lat, lng]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
    >
      <TileLayer
        url={
          isDarkMode
            ? "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" // Dark mode tile layer URL
            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        } // Light mode tile layer URL
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, lng]} icon={markerIcon}>
        <Popup>
          <div className="text-center">
            <strong>Random Location</strong>
            <br />
            Lat: {lat.toFixed(6)}
            <br />
            Lng: {lng.toFixed(6)}
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
