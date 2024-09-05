// 'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
// import { app } from '../../../../firebase/firebase';
// import { useSession } from 'next-auth/react';
// import axios from 'axios';
// import L from 'leaflet';

// const NotificationPage = () => {
//   const { data: session, status } = useSession();
//   const db = getFirestore(app);
//   const [userData, setUserData] = useState(null);
//   const [driverPosition, setDriverPosition] = useState(null);
//   const [userPosition, setUserPosition] = useState(null);
//   const [notifications, setNotifications] = useState([]);
//   const [hasNotifiedStart, setHasNotifiedStart] = useState(false);
//   const [notificationsLoaded, setNotificationsLoaded] = useState(false);
//   const timersRef = useRef([]);

//   // Fetch user's data including role from Firestore
//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (status === 'authenticated' && session?.user?.uid) {
//         try {
//           const userDoc = await getDoc(doc(collection(db, 'users'), session.user.uid));
//           if (userDoc.exists()) {
//             setUserData(userDoc.data());
//             const { latitude, longitude } = userDoc.data();
//             setUserPosition([latitude, longitude]);
//           } else {
//             console.log('No such document!');
//           }
//         } catch (error) {
//           console.error('Error getting user data:', error);
//         }
//       }
//     };

//     fetchUserData();
//   }, [db, session, status]);

//   // Track the driver's position
//   useEffect(() => {
//     if (navigator.geolocation) {
//       const watchId = navigator.geolocation.watchPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setDriverPosition([latitude, longitude]);
//         },
//         (error) => {
//           console.error('Error getting driver geolocation', error);
//         },
//         { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
//       );

//       return () => {
//         navigator.geolocation.clearWatch(watchId); // Cleanup on unmount
//       };
//     }
//   }, []);

//   // Send notification function for email
//   const sendNotification = async (message) => {
//     try {
//       await axios.post('/api/sendEmail', { message, userId: session.user.uid });
//       const timestamp = new Date().toLocaleTimeString();
//       setNotifications(prevNotifications => [...prevNotifications, { message, timestamp }]);
//       // Set timer to remove notification after 10 seconds
//       const timerId = setTimeout(() => {
//         setNotifications(prevNotifications => prevNotifications.slice(1));
//       }, 60000); // 10 seconds
//       timersRef.current.push(timerId);

//       // Mark notifications as loaded once the first notification is received
//       if (!notificationsLoaded) {
//         setNotificationsLoaded(true);
//       }
//     } catch (error) {
//       console.error('Error sending email message:', error);
//     }
//   };





//   // Notify the user when the driver starts the garbage collection round
//   const notifyStartRound = () => {
//     if (driverPosition && !hasNotifiedStart) {
//       sendNotification('The driver has started the garbage collection round.');
//       setHasNotifiedStart(true);
//     }
//   };

//   // Notify the user when the driver is within 200 meters
//   // useEffect(() => {
//   //   const interval = setInterval(() => {
//   //     if (driverPosition && userPosition) {
//   //       const [driverLat, driverLng] = driverPosition;
//   //       const [userLat, userLng] = userPosition;
//   //       const distance = L.latLng(driverLat, driverLng).distanceTo(L.latLng(userLat, userLng));

//   //       if (distance <= 200) {
//   //         sendNotification('The driver is within 200 meters of your location.');
//   //       }
//   //     }
//   //   }, 480000 ); // Check every 8 minutes   

//   //   return () => clearInterval(interval);
//   // }, [driverPosition, userPosition]);

//   // Clear all timers on component unmount
//   useEffect(() => {
//     return () => {
//       timersRef.current.forEach(timerId => clearTimeout(timerId));
//     };
//   }, []);

//   // Show "No notifications yet" if user data is not fetched or if notifications are not loaded
//   if (!userData || !notificationsLoaded && userData?.role !== 'staff') {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-center">
//           <p className="text-lg font-bold ">No notifications yet</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="text-center">
//         {userData.role === 'staff' && (
//           <>
//             <h1 className="text-2xl font-bold mb-4">Driver Notification System</h1>
//             <p className="text-lg">Users will be notified when the driver starts the garbage collection round and when the driver is within 200 meters of the user.</p>

//             {/* Button to start the round */}
//             <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
//               onClick={notifyStartRound}
//               disabled={hasNotifiedStart}

//             >
//               Start Round
//             </button>
//           </>
//         )}
//         {hasNotifiedStart && (
//           <p className="text-green-500 mt-2">Round has started. Notification sent.</p>

//         )}

//         {/* Display notifications */}
//         <div className="mt-4">
//           {notifications.map((notification, index) => (
//             <div key={index} className="bg-gray-100 p-2 rounded mb-2">
//               <p>{notification.message}</p>
//               <small className="text-gray-500">{notification.timestamp}</small>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotificationPage;



'use client';
import React, { useState, useEffect, useRef } from 'react';
import { getFirestore, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { app } from '../../../../firebase/firebase';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import L from 'leaflet';

const NotificationPage = () => {
  const { data: session, status } = useSession();
  const db = getFirestore(app);
  const [userData, setUserData] = useState(null);
  const [driverPosition, setDriverPosition] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [hasNotifiedStart, setHasNotifiedStart] = useState(false);
  const [notificationsLoaded, setNotificationsLoaded] = useState(false);
  const [isStartingRound, setIsStartingRound] = useState(false);
  const timersRef = useRef([]);

  // Fetch user's data including role from Firestore
  //after session?.user?.uid? is available, get user data( as of now i remove it from useEffect)
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     if (status === 'authenticated' && session?.user) {
  //       try {
  //         const userDoc = await getDoc(doc(collection(db, 'users'), session.user.uid));
  //         if (userDoc.exists()) {
  //           setUserData(userDoc.data());
  //           const { latitude, longitude } = userDoc.data();
  //           setUserPosition([latitude, longitude]);
  //         } else {
  //           console.log('No such document!');
  //         }
  //       } catch (error) {
  //         console.error('Error getting user data:', error);
  //       }
  //     }
  //   };

  //   fetchUserData();
  // }, [db, session, status]);

  // Track the driver's position
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setDriverPosition([latitude, longitude]);
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
  }, []);

  // Send notification function for email
  //after session?.user?.uid? is available, get user data( as of now i remove it from useEffect)
  const sendNotification = async (message) => {
    try {
      await axios.post('/api/sendEmail', { message, userId: session.user });
      const timestamp = new Date().toLocaleTimeString();
      setNotifications(prevNotifications => [...prevNotifications, { message, timestamp }]);
      // Set timer to remove notification after 60 seconds
      const timerId = setTimeout(() => {
        setNotifications(prevNotifications => prevNotifications.slice(1));
      }, 60000);
      timersRef.current.push(timerId);

      // Mark notifications as loaded once the first notification is received
      if (!notificationsLoaded) {
        setNotificationsLoaded(true);
      }
    } catch (error) {
      console.error('Error sending email message:', error);
    }
  };

  // Fetch all users function
  const fetchAllUsers = async () => {
    try {
      const usersRef = collection(db, 'users');
      const usersSnapshot = await getDocs(usersRef);
      return usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching all users:', error);
      return [];
    }
  };

  // Notify all users when the driver starts the garbage collection round
  const notifyStartRound = async () => {
    if (driverPosition && !hasNotifiedStart) {
      try {
        const allUsers = await fetchAllUsers();
        const message = 'The driver has started the garbage collection round.';

        for (const user of allUsers) {
          await axios.post('/api/sendEmail', { message, userId: user.id });
        }

        setHasNotifiedStart(true);
        sendNotification(message); // This will add the notification to the current user's view
      } catch (error) {
        console.error('Error notifying all users:', error);
      }
    }
  };

  // Clear all timers on component unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach(timerId => clearTimeout(timerId));
    };
  }, []);

  if (userData && userData.role !== 'staff') {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-lg font-bold text-red-600">
            Access Denied: Your role does not permit access to this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        {userData && userData.role === 'staff' && (
          <>
            <h1 className="text-2xl font-bold mb-4">Driver Notification System</h1>
            <p className="text-lg">Users will be notified when the driver starts the garbage collection round and when the driver is within 200 meters of the user.</p>

            {/* Button to start the round */}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={async () => {
                setIsStartingRound(true);
                await notifyStartRound();
                setIsStartingRound(false);
              }}
              disabled={hasNotifiedStart || isStartingRound}
            >
              {isStartingRound ? 'Starting...' : 'Start Round'}
            </button>
            {hasNotifiedStart && (
              <p className="text-green-500 mt-2">Round has started. Notification sent to all users.</p>
            )}
          </>
        )}
        {/* Display notifications */}
        <div className="mt-4">
          {notifications.map((notification, index) => (
            <div key={index} className="bg-gray-100 p-2 rounded mb-2">
              <p>{notification.message}</p>
              <small className="text-gray-500">{notification.timestamp}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
