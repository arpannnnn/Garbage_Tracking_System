'use client'
import React, { useState, useEffect } from 'react';
const ClientMessaging = () => {
    const [driverLocation, setDriverLocation] = useState(null);
    const [clientLocation, setClientLocation] = useState(null);
    // Fetch driver and client locations
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const driverLocation = await getCurrentLocation();
                const clientLocation = await getCurrentLocation();
                setDriverLocation(driverLocation);
                setClientLocation(clientLocation);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };
        fetchLocations();
    }, []);
    // Fetch current device location using Geolocation API
    const getCurrentLocation = () => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported by your browser.'));
            } else {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        resolve({ latitude, longitude });
                    },
                    error => {
                        reject(error);
                    }
                );
            }
        });
    };
    // sending message to client when driver reaches nearby location
    useEffect(() => {
        if (driverLocation && clientLocation) {
            const distance = calculateDistance(driverLocation, clientLocation);
            // If distance is less than a threshold (100 meters), send message to client
            if (distance < 100) {
                sendMessageToClient();
            }
        }
    }, [driverLocation, clientLocation]);
    // sending message to client
    const sendMessageToClient = async () => {
        try {
            // API endpoint to send messages to the client
            const response = await fetch('https://binaydada', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    recipient: 'clientPhoneNumberOrID',
                    message: 'Driver has reached nearby location.'
                })
            });
    
            if (response.ok) {
                console.log('Message sent successfully');
            } else {
                console.error('Failed to send message:', response.statusText);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    // Function to calculate distance between two coordinates (using Haversine formula)
    const calculateDistance = (location1, location2) => {
        const earthRadius = 6371000; // Radius of the Earth in meters
        const lat1 = toRadians(location1.latitude);
        const lon1 = toRadians(location1.longitude);
        const lat2 = toRadians(location2.latitude);
        const lon2 = toRadians(location2.longitude);

        const deltaLat = lat2 - lat1;
        const deltaLon = lon2 - lon1;

        const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return earthRadius * c;
    };

    // Function to convert degrees to radians
    const toRadians = (degrees) => {
        return degrees * (Math.PI / 180);
    };
    return (
        <div className='mt-2 mx-60 p-6 bg-white rounded-lg mb-2 shadow-lg'>
            <h2 className='font-bold'>Notification sent as per the drivers location near the client, less than 100 meters away.</h2>
            {driverLocation && (
                <p>Driver Location: Latitude {driverLocation.latitude}, Longitude {driverLocation.longitude}</p>
            )}
            {clientLocation && (
                <p>Client Location: Latitude {clientLocation.latitude}, Longitude {clientLocation.longitude}</p>
            )}
        </div>
    );
};

export default ClientMessaging;
