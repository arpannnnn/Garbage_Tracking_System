// // "use client";
// // import React, { useState, useEffect } from 'react';
// // import { database } from '../firebase/firebase'; // Ensure the path is correct
// // import { ref, onValue } from "firebase/database";

// // const SmartDustbin = () => {
// //     const [dustbinLevel, setDustbinLevel] = useState(null);
// //     const [dustbinPercentage, setDustbinPercentage] = useState(null);
// //     const [lastUpdated, setLastUpdated] = useState(null);

// //     useEffect(() => {
// //         const dustbinRef = ref(database, "/sensor/distance");

// //         const fetchDustbinData = () => {
// //             onValue(dustbinRef, (snapshot) => {
// //                 const data = snapshot.val();
// //                 if (data !== null) {
// //                     setDustbinLevel(data);
// //                     const percentage = (data / 194) * 100; // Convert to percentage with max value 194
// //                     setDustbinPercentage(percentage > 100 ? 100 : percentage); // Cap at 100%
// //                     setLastUpdated(new Date());
// //                 }
// //             });
// //         };
// //         fetchDustbinData();

// //         // Optionally, you can clear the listener if needed in future
// //         // return () => off(dustbinRef);

// //     }, []);

// //     return (
// //         <div className="mt-2 mx-60 p-6 bg-white rounded-lg shadow-lg">
// //             <h2 className="text-2xl font-bold mb-4 flex items-center">
// //                 <svg
// //                     xmlns="http://www.w3.org/2000/svg"
// //                     className="h-6 w-6 mr-2 text-green-500"
// //                     fill="none"
// //                     viewBox="0 0 24 24"
// //                     stroke="currentColor"
// //                     strokeWidth="2"
// //                 >
// //                     <path
// //                         strokeLinecap="round"
// //                         strokeLinejoin="round"
// //                         d="M3 6h18M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2m-6 0h6m2 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h12z"
// //                     />
// //                 </svg>
// //                 Dustbin Level Monitoring
// //             </h2>
// //             <div className="relative w-24 h-48 mx-auto border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-100">
// //                 {dustbinPercentage !== null ? (
// //                     <div
// //                         className={`absolute bottom-0 w-full transition-all duration-500 ease-in-out ${dustbinPercentage > 75 ? 'bg-red-500' : dustbinPercentage > 50 ? 'bg-yellow-500' : 'bg-green-500'
// //                             }`}
// //                         style={{ height: `${dustbinPercentage}%` }}
// //                     ></div>
// //                 ) : (
// //                     <div className="flex items-center justify-center h-full">
// //                         <p>Loading...</p>
// //                     </div>
// //                 )}
// //             </div>
// //             {dustbinLevel !== null && (
// //                 <p className="mt-4 text-lg font-semibold">Dustbin Level: {dustbinLevel}</p>
// //             )}
// //             {dustbinPercentage !== null && (
// //                 <p className="mt-4 text-lg font-semibold">In (Percentage): {Math.round(dustbinPercentage)}%</p>
// //             )}
// //             {lastUpdated && (
// //                 <p className="text-gray-500 mt-4">Last Updated: {lastUpdated.toLocaleTimeString()}</p>
// //             )}
// //         </div>
// //     );
// // };

// // export default SmartDustbin;


// "use client";
// import React, { useState, useEffect } from 'react';
// import { database } from '../firebase/firebase';
// import { ref, onValue, set, push, off } from "firebase/database";

// const SmartDustbin = () => {
//     const [dustbinLevel, setDustbinLevel] = useState(null);
//     const [dustbinPercentage, setDustbinPercentage] = useState(null);
//     const [lastUpdated, setLastUpdated] = useState(null);

//     useEffect(() => {
//         const dustbinRef = ref(database, "/sensor/distance");

//         const fetchDustbinData = () => { // Fetch data from Firebase
//             onValue(dustbinRef, (snapshot) => {
//                 const data = snapshot.val();
//                 if (data !== null) {
//                     setDustbinLevel(data);
//                     const percentage = (data / 194) * 100; // Convert to percentage with max value 194
//                     setDustbinPercentage(percentage > 100 ? 100 : percentage);
//                     setLastUpdated(new Date());

//                     if (percentage >= 90) {
//                         sendNotificationRecord(data, percentage);
//                     }
//                 }
//             }, (error) => {
//                 console.error("Failed to read data from Firebase: ", error);
//             });
//         };

//         fetchDustbinData();

//         return () => {
//             off(dustbinRef);
//         };

//     }, []);

//     const sendNotificationRecord = (level, percentage) => {
//         const notificationRef = ref(database, "/notifications");
//         const newNotificationRef = push(notificationRef); // to create a new record
//         const nepalTime = new Date().toLocaleString("en-US", {
//             timeZone: "Asia/Kathmandu"
//         });

//         set(newNotificationRef, {
//             level: level,
//             percentage: percentage,
//             timestamp: nepalTime
//         })

//     };

//     return (
//         <div className="mt-2 mx-60 p-6 bg-white rounded-lg shadow-lg">
//             <h2 className="text-2xl font-bold mb-4 flex items-center">
//                 <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6 mr-2 text-green-500"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                 >
//                     <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M3 6h18M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2m-6 0h6m2 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h12z"
//                     />
//                 </svg>
//                 Dustbin Level Monitoring
//             </h2>
//             <div className="relative w-24 h-48 mx-auto border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-100">
//                 {dustbinPercentage !== null ? (
//                     <div
//                         className={`absolute bottom-0 w-full transition-all duration-500 ease-in-out ${dustbinPercentage > 75 ? 'bg-red-500' : dustbinPercentage > 50 ? 'bg-yellow-500' : 'bg-green-500'
//                             }`}
//                         style={{ height: `${dustbinPercentage}%` }}
//                     ></div>
//                 ) : (
//                     <div className="flex items-center justify-center h-full">
//                         <p>Loading...</p>
//                     </div>
//                 )}
//             </div>
//             {dustbinLevel !== null && (
//                 <p className="mt-4 text-lg font-semibold">Dustbin Level: {dustbinLevel}</p>
//             )}
//             {dustbinPercentage !== null && (
//                 <p className="mt-4 text-lg font-semibold">In (Percentage): {Math.round(dustbinPercentage)}%</p>
//             )}
//             {lastUpdated && (
//                 <p className="text-gray-500 mt-4">Last Updated: {lastUpdated.toLocaleTimeString()}</p>
//             )}
//         </div>
//     );
// };

// export default SmartDustbin;


"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { database } from '../firebase/firebase';
import { ref, onValue, set, push, off } from "firebase/database";

const SmartDustbin = () => {
    const [dustbinLevel, setDustbinLevel] = useState(null);
    const [dustbinPercentage, setDustbinPercentage] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);

    const sendNotificationRecord = useCallback(() => {
        const notificationRef = ref(database, "/notifications");
        const newNotificationRef = push(notificationRef);
        const nepalTime = new Date().toLocaleString("en-US", {
            timeZone: "Asia/Kathmandu"
        });

        set(newNotificationRef, {
            level: dustbinLevel,
            percentage: dustbinPercentage,
            timestamp: nepalTime
        });



    }, [dustbinLevel, dustbinPercentage]);

    useEffect(() => {
        const dustbinRef = ref(database, "/sensor/distance");

        const fetchDustbinData = () => {
            onValue(dustbinRef, (snapshot) => {
                const data = snapshot.val();
                if (data !== null) {
                    setDustbinLevel(data);
                    const percentage = (data / 194) * 100;
                    setDustbinPercentage(percentage > 100 ? 100 : percentage);
                    setLastUpdated(new Date());
                }
            }, (error) => {
                console.error("Failed to read data from Firebase: ", error);
            });
        };

        fetchDustbinData();


        const setDailyNotification = () => {
            const now = new Date();
            const notificationTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 42, 0);

            if (now > notificationTime) {
                notificationTime.setDate(notificationTime.getDate() + 1);
            }

            const timeUntilNotification = notificationTime.getTime() - now.getTime();

            const timer = setTimeout(() => {
                sendNotificationRecord();
                setDailyNotification(); // Set up the next day's notification
            }, timeUntilNotification);

            return () => clearTimeout(timer);
        };

        const cleanupTimer = setDailyNotification();

        return () => {
            off(dustbinRef);
            cleanupTimer();
        };

    }, [sendNotificationRecord]);

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
                {dustbinPercentage !== null ? (
                    <div
                        className={`absolute bottom-0 w-full transition-all duration-500 ease-in-out ${dustbinPercentage > 75 ? 'bg-red-500' : dustbinPercentage > 50 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                        style={{ height: `${dustbinPercentage}%` }}
                    ></div>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p>Loading...</p>
                    </div>
                )}
            </div>
            {dustbinLevel !== null && (
                <p className="mt-4 text-lg font-semibold">Dustbin Level: {dustbinLevel}</p>
            )}
            {dustbinPercentage !== null && (
                <p className="mt-4 text-lg font-semibold">In (Percentage): {Math.round(dustbinPercentage)}%</p>
            )}
            {lastUpdated && (
                <p className="text-gray-500 mt-4">Last Updated: {lastUpdated.toLocaleTimeString()}</p>
            )}
        </div>
    );
};

export default SmartDustbin;