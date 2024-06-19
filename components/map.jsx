'use client';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import { app } from '../firebase/firebase';
import { useSession } from 'next-auth/react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase/firebase';

// Fix broken icon images on Leaflet maps
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom SVG for driver marker icon
const driverIconSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/><path d="M11 9v3m-4-2v2m10-8h-2m0 0H9.485c-1.226 0-1.84 0-2.39.228c-.552.229-.985.662-1.852 1.53L3.464 7.535c-.722.722-1.083 1.083-1.274 1.543c-.19.46-.19.97-.19 1.992V13c0 2.357 0 3.535.732 4.268c.487.487 1.171.65 2.268.704M15 4v4c0 1.886 0 2.828.586 3.414S17.114 12 19 12h3v1c0 2.357 0 3.535-.732 4.268c-.487.487-1.171.65-2.268.704M9 18h6"/><path d="M15 7h1.7c1.358 0 2.037 0 2.59.354c.553.353.875.994 1.519 2.276L22 12"/></g></svg>
`;

// Create a custom icon for the driver marker
const driverMarkerIcon = L.divIcon({
  html: driverIconSvg,
  iconSize: [32, 32],
  className: 'driver-marker-icon',
});

const MapComponent = () => {
  const { data: session, status } = useSession();
  const db = getFirestore(app);
  const [position, setPosition] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const [driverETA, setDriverETA] = useState(null);
  const [binLocation, setBinLocation] = useState(null);
  const [binStatus, setBinStatus] = useState(null);
  const [userData, setUserData] = useState(null);

  // Fetch user data (simulating the user data fetching logic)
  useEffect(() => {
    // Simulated user data fetching
    const fetchUserData = async () => {
      // Replace this with actual fetching logic
      const user = { role: 'Staff' }; // Example user data
      setUserData(user);
    };

    fetchUserData();
  }, []);

  // Fetch user's position from Firestore
  useEffect(() => {
    const fetchUserLocation = async () => {
      if (status === 'authenticated' && session?.user?.uid) {
        try {
          const userDoc = await getDoc(doc(collection(db, 'users'), session.user.uid));
          if (userDoc.exists()) {
            const { latitude, longitude } = userDoc.data();
            setPosition([latitude, longitude]);
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error getting user location:', error);
        }
      }
    };

    fetchUserLocation();
  }, [db, session, status]);

   // Track the driver's position if the user is a staff member
  useEffect(() => {
    if (userData?.role === 'Staff' && navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setDriverLocation([latitude, longitude]);
        },
        (error) => {
          console.error('Error getting driver geolocation', error);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId); // Cleanup on unmount
      };
    }
  }, [userData]);

  // Simulate fetching bin location within 100 meters
  useEffect(() => {
    if (position) {
      const [userLatitude, userLongitude] = position;

      // Simulate bin location within a radius of 100 meters
      const binLatitude = userLatitude + (1 * 0.0001 - 0.0005);
      const binLongitude = userLongitude + (1 * 0.0001 - 0.0005);

      setBinLocation([binLatitude, binLongitude]);
    }
  }, [position]);

  // Fetch bin status from Firebase
  useEffect(() => {
    const binStatusRef = ref(database, '/sensor/distance');
    const fetchBinStatus = () => {
      onValue(binStatusRef, (snapshot) => {
        const status = snapshot.val();
        setBinStatus(status);
      });
    };

    fetchBinStatus();
  }, []);


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

  // Get bin marker color based on status
  const getBinMarkerColor = (percentage) => {
    if (percentage >= 75) {
      return 'red';
    } else if (percentage >= 50) {
      return 'orange';
    } else if (percentage >= 25) {
      return 'yellow';
    } else {
      return 'green';
    }
  };
  const binMarkerColor = getBinMarkerColor(binStatus);

  const binIconSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="${binMarkerColor}" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 2L3 6v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V6l-3-4H6z" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  `;

  // Create a custom icon for the bin marker
  const binMarkerIcon = L.divIcon({
    html: binIconSvg,
    iconSize: [32, 32],
    className: 'bin-marker-icon',
  });

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {position ? (
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
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
            radius={300}
            pathOptions={{ fillColor: 'blue', color: 'blue' }}
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
          {binLocation && (
            <Marker position={binLocation} icon={binMarkerIcon}>
              <Popup>
                Bin location
                {binStatus && (
                  <div>
                    Status: {binStatus}%
                  </div>
                )}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      ) : (
        <p className='flex justify-center font-semibold'>Loading...</p>
      )}
    </div>
  );
};

export default MapComponent;
