"use client";

import React, { useState, useEffect } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { database } from '../firebase/firebase';
import { ref, onValue, off } from "firebase/database";


const transformDataForChart = (notifications) => {
    return notifications.map(notification => {
        const date = new Date(notification.timestamp);
        const formattedDate = date.toLocaleDateString("en-US", {
            day: '2-digit',
            month: 'short'
        });
        const formattedTime = date.toLocaleTimeString("en-US", {
            hour: '2-digit',
            minute: '2-digit'
        });
        return {
            dateTime: `${formattedDate}\n${formattedTime}`,
            percentage: Math.round(notification.percentage)
        };
    });
};


const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-2 shadow-lg rounded">
                <p className="label">{`Date & Time: ${label.replace('\n', ' ')}`}</p>
                <p className="intro">{`Percentage : ${payload[0].value}%`}</p>
            </div>
        );
    }
    return null;
};


const CustomTick = ({ x, y, payload }) => {
    const lines = payload.value.split('\n');
    return (
        <g transform={`translate(${x},${y + 10})`}>
            <text x={0} y={0} dy={16} textAnchor="middle" fill="#888888">
                {lines.map((line, index) => (
                    <tspan key={index} x={0} dy={index === 0 ? 0 : 12} fontSize={index === 0 ? 12 : 10}>
                        {line}
                    </tspan>
                ))}
            </text>
        </g>
    );
};


export function Overview() {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const notificationRef = ref(database, "/notifications"); 

        // Function to handle data change
        const handleDataChange = (snapshot) => {  
            const data = snapshot.val();
            if (data) {
                const notifications = Object.values(data);
                const chartData = transformDataForChart(notifications);
                setChartData(chartData);
            } else {
                setChartData([]);
            }
        };

        // Listen for data changes
        onValue(notificationRef, handleDataChange, (error) => {
            console.error("Failed to read data from Firebase: ", error);
        });

        return () => {
            off(notificationRef, "value", handleDataChange);
        };
    }, []);

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <XAxis
                    dataKey="dateTime"
                    stroke="#888888"
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                    tick={<CustomTick x={undefined} y={undefined} payload={undefined} />}
                />
                <YAxis
                    className="text-gray-500 font-weight-500"
                    stroke="#888888"
                    fontSize={9}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}%`}
                />
                <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />} />
                <Bar dataKey="percentage" fill="green" radius={[4, 4, 0, 0]} />      
            </BarChart>
        </ResponsiveContainer>
    );
}
