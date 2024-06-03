"use client"
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { customAuth, db } from '../../../firebaase/firebase'; // Update the path to your Firebase configuration

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '../../../components/ui/card';
import { ScrollArea } from '../../../components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';

export default function Page() {

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(customAuth, async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      }
      setLoading(false);
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
    <ScrollArea className="h-full py-4 ">
      <div className={`flex-1 space-y-4 p-4 pt-6 md:p-8 transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex items-center justify-between space-y-2">
          {profile ? (
            <h2 className="text-3xl font-bold tracking-tight">
              Hi, Welcome back 👋 {profile.fullName}
            </h2>
          ) : null}
          
        </div>
       
      </div>
    </ScrollArea>
  );
}
