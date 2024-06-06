"use client"
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { customAuth, db } from '../../../firebase/firebase';
import { ScrollArea } from '../../../components/ui/scroll-area';

export default function Page() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(customAuth, async (user) => {
      console.log('User:', user); // Log the user object
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            const userProfile = docSnap.data();
            console.log('User Profile:', userProfile);
            setProfile(userProfile);
          } else {
            setError('User profile not found');
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setError('Error fetching user profile');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    firebaseSignOut(customAuth).then(() => {
      window.location.href = '/login';
    }).catch((error) => {
      console.error('Failed to sign out:', error);
    });
  };

  return (
    <ScrollArea className="h-full py-4">
      <div className={`flex-1 space-y-4 p-4 pt-6 md:p-8 transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {error && <div className="text-red-500">{error}</div>}
        <div className="flex items-center justify-between space-y-2">
          {profile ? (
            <h2 className="text-3xl font-bold tracking-tight">
              Hi, Welcome back 👋 {profile.fullName}
            </h2>
          ) : null}
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </ScrollArea>
  );
}
