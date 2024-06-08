"use client"
import { useState, useEffect, useCallback } from 'react';
import { getFirestore, query, where, getDocs, collection } from 'firebase/firestore';
import { app } from '../../../../firebase/firebase'
import { useSession } from 'next-auth/react';

function ProfileSection() {
  const { data: session, status } = useSession();
  const db = getFirestore(app);
  const [userData, setUserData] = useState(null);

  const getUser = useCallback(async () => {
    if (status === 'authenticated' && session?.user?.uid) {
      try {
        const q = query(collection(db, "users"), where("uid", "==", session.user.uid));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          console.log("No matching documents.");
        } else {
          querySnapshot.forEach((doc) => {
            setUserData(doc.data());
          });
        }
      } catch (error) {
        console.error("Error getting user data:", error);
      }
    } else {
      console.log("User is not authenticated or UID is missing.");
    }
  }, [db, session, status]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <div className="flex justify-center items-center h-screen">
      {userData && (
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <h2 className="text-3xl font-bold mb-4 text-blue-600">Hi, {userData.fullName}!</h2>
          <div className="profile-details">
            <p className="mb-2"><strong className="text-gray-600">Email:</strong> {userData.email}</p>
            <p className="mb-2"><strong className="text-gray-600">Citizenship:</strong> {userData.citizenship}</p>
            <p className="mb-2"><strong className="text-gray-600">Mobile Number:</strong> {userData.mobileNumber}</p>
            <p className="mb-2"><strong className="text-gray-600">Location:</strong> {userData.latitude}, {userData.longitude}</p>
            <p className="mb-2"><strong className="text-gray-600">Role:</strong> {userData.role}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileSection;