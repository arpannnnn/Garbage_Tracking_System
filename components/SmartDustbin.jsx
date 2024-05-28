"use client"
import React, { useState, useEffect } from 'react';

const SmartDustbin = () => {
    const [dustbinLevel, setDustbinLevel] = useState(20); // Hardcoded dustbin level
    const [lastUpdated, setLastUpdated] = useState(null); // Initialize with null

    useEffect(() => {
        // Set the initial lastUpdated value on the client-side
        setLastUpdated(new Date());

        const interval = setInterval(() => {
            fetchDustbinData();
        }, 3000); // Fetch new data every 3 seconds

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, []);

    const fetchDustbinData = async () => {
        try {
            // Hardcoded dustbin level for testing purposes
            const randomLevel = Math.floor(Math.random() * 101);
            setDustbinLevel(randomLevel);
            setLastUpdated(new Date());
        } catch (error) {
            console.error('Error fetching dustbin data:', error);
        }
    };

    return (
        <div className="mt-2 mx-60 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 6h18M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2m-6 0h6m2 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h12z"
                    />
                </svg>
                Dustbin Level Monitoring
            </h2>
            <div className="relative w-24 h-48 mx-auto border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-100">
                <div
                    className={`absolute bottom-0 w-full transition-all duration-500 ease-in-out ${dustbinLevel > 75 ? 'bg-red-500' : dustbinLevel > 50 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                    style={{ height: `${dustbinLevel}%` }}
                ></div>
            </div>
            <p className="mt-4 text-lg font-semibold">Dustbin Level: {dustbinLevel}%</p>
            {lastUpdated && <p className="text-gray-500">Last Updated: {lastUpdated.toLocaleTimeString()}</p>}
        </div>
    );
};

export default SmartDustbin;