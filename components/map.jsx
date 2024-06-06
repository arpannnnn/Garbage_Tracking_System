"use client";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix  broken icon images on Leaflet maps
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Custom SVG for driver marker icon
const driverIconSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" ="round" strokelinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M16 16l-4-4-4 4m4-4v-6" />
  </svg>
`;

// Create a custom icon for the driver marker
const driverMarkerIcon = L.divIcon({
  html: driverIconSvg,
  iconSize: [32, 32], // 
  className: "driver-marker-icon", 
});

const MapComponent = () => {
  const [position, setPosition] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null); 
  const [showNotification, setShowNotification] = useState(false); 
  const [driverETA, setDriverETA] = useState(null);
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting geolocation", error);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId); // Cleanup on unmount
      };
    }
  }, []);

  // Simulate fetching driver location within 200 meters (for demo purposes)
  useEffect(() => {
    if (position) {
      const [userLatitude, userLongitude] = position;

      // Simulate fetching driver location within a radius of 200 meters
      const driverLatitude = userLatitude + (Math.random() * 0.002 - 0.001);
      const driverLongitude = userLongitude + (Math.random() * 0.002 - 0.001);

      setDriverLocation([driverLatitude, driverLongitude]);
    }
  }, [position]);

  // Calculate driver ETA
  useEffect(() => {
    if (position && driverLocation) {
      const [userLatitude, userLongitude] = position;
      const [driverLatitude, driverLongitude] = driverLocation;

      const distance = L.latLng(userLatitude, userLongitude).distanceTo(
        L.latLng(driverLatitude, driverLongitude)
      );

      // Assuming the driver's speed is 30 km/h (8.33 m/s)
      const driverSpeed = 8.33;
      const eta = distance / driverSpeed;

      setDriverETA(eta);
    }
  }, [position, driverLocation]);

  // Send notification API call
  const sendNotification = async () => {
    try {
      const response = await fetch('https://api-endpoint.com/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Driver is within 100 meters',
          position,
          driverLocation,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Notification sent!');
    } catch (error) {
      console.error('Failed to send notification:', error);
    }
  };

  // Check if driver is within 100 meters of user
  useEffect(() => {
    if (position && driverLocation) {
      const [userLatitude, userLongitude] = position;
      const [driverLatitude, driverLongitude] = driverLocation;

      const distance = L.latLng(userLatitude, userLongitude).distanceTo(
        L.latLng(driverLatitude, driverLongitude)
      );

      if (distance <= 100) {
        setShowNotification(true);
        sendNotification(); // Call the function to send the notification
      } else {
        setShowNotification(false);
      }
    }
  }, [position, driverLocation]);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {position ? (
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>You are here.</Popup>
          </Marker>
          <Circle
            center={position}
            radius={200}
            pathOptions={{ fillColor: "blue", color: "blue" }}
          />
          {driverLocation && (
            <Marker position={driverLocation} icon={driverMarkerIcon}>
              <Popup>
                Driver location
                {driverETA && (
                  <div>
                    Estimated Time of Arrival: {driverETA.toFixed(2)} seconds
                  </div>
                )}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      ) : (
        <p>Loading...</p>
      )}
      {showNotification && <p>Driver is approaching! Please be ready.</p>}
    </div>
  );
};

export default MapComponent;
