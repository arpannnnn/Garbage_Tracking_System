
"use client"
import { useEffect, useState } from 'react';
import { customAuth, db } from '../../../firebaase/firebase';
import { signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { MailIcon, PhoneIcon, MapIcon, UserIcon } from 'lucide-react';

const ProfileComponent = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(customAuth, (user) => {
      if (user) {
        const { email, displayName, phoneNumber, photoURL } = user;
        const userDocRef = doc(db, 'users', user.uid);
        getDoc(userDocRef)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              const userData = docSnapshot.data();
              setUserProfile({
                email,
                fullName: userData.fullName,
                mobileNumber: userData.mobileNumber,
                latitude: userData.latitude,
                longitude: userData.longitude,
                citizenship: userData.citizenship,
                role: userData.role,
              });
            } else {
              console.error('No such document!');
            }
          })
          .catch((error) => {
            console.error('Error getting document:', error);
          });
      } else {
        setUserProfile(null);
      }
    });
    return () => unsubscribe();
  }, []);

  if (!userProfile) {
    return <div className="text-center text-gray-500 py-8">No User</div>;
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
      <div className="flex items-center space-x-4 mb-6">
        <UserIcon className="h-16 w-16 text-blue-500" />
        <h2 className="text-3xl font-bold text-gray-800">{userProfile.fullName}</h2>
      </div>
      <div className="space-y-4 text-gray-600">
        <div className="flex items-center space-x-2">
          <MailIcon className="h-6 w-6 text-blue-500" />
          <p>{userProfile.email}</p>
        </div>
        <div className="flex items-center space-x-2">
          <PhoneIcon className="h-6 w-6 text-blue-500" />
          <p>{userProfile.mobileNumber}</p>
        </div>
        <div className="flex items-center space-x-2">
          <MapIcon className="h-6 w-6 text-blue-500" />
          <p>Latitude: {userProfile.latitude}, Longitude: {userProfile.longitude}</p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="font-semibold">Role:</p>
          <p>{userProfile.role}</p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="font-semibold">Citizenship Number:</p>
          <p>{userProfile.citizenship}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;