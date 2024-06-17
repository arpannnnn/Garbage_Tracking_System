
"use client"
import { useEffect, useState } from 'react';
import { customAuth, db } from '../../../firebase/firebase';
import { signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { MailIcon, PhoneIcon, MapIcon, UserIcon } from 'lucide-react';


const ProfileComponent = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const Token = JSON.parse(localStorage.getItem("User-Token"));
        if (!Token){
          console.error('Token not found in localStorage.');
          return;
        }
        if (!Token.access) {
          console.error('Access token not found in localStorage.');
          return;
        }

        const response = await fetch('http://127.0.0.1:8000/api/profile/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Token.access}`,
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
     
          setUserProfile(data); // Assuming the API response matches the structure of userProfile state
        } else {
          console.error('Failed to fetch user profile:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!userProfile) {
    return <div className="text-center text-gray-500 py-8">No User</div>;
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
      <div className="flex items-center space-x-4 mb-6">
        <UserIcon className="h-16 w-16 text-blue-500" />
        <h2 className="text-3xl font-bold text-gray-800">{userProfile?.full_name}</h2>
      </div>
      <div className="space-y-4 text-gray-600">
        <div className="flex items-center space-x-2">
          <MailIcon className="h-6 w-6 text-blue-500" />
          <p>{userProfile?.email}</p>
        </div>
        <div className="flex items-center space-x-2">
          <PhoneIcon className="h-6 w-6 text-blue-500" />
          <p>{userProfile?.mobile_number}</p>
        </div>
        <div className="flex items-center space-x-2">
          <MapIcon className="h-6 w-6 text-blue-500" />
          <p>Latitude: {userProfile?.latitude}, Longitude: {userProfile?.longitude}</p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="font-semibold">Role:</p>
          <p>{userProfile?.role}</p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="font-semibold">Citizenship Number:</p>
          <p>{userProfile?.citizenship}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;