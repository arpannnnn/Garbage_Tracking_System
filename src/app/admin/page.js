"use client";
import { useState, useEffect, useCallback } from 'react';
import { getFirestore, query, where, getDocs, collection } from 'firebase/firestore';
import { app } from '../../../firebase/firebase';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Loader from '../../../components/Loader';
import { ScrollArea } from '../../../components/ui/scroll-area';
import { Overview } from '../../../components/overview';

function Page() {
  const { data: session, status } = useSession();
  const db = getFirestore(app);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getUser = useCallback(async () => {
    if (status === 'authenticated' && session?.user?.uid) {
      try {
        const q = query(collection(db, "users"), where("uid", "==", session.user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            setUserData(doc.data());
          });
        }
      } catch (error) {
        console.error("Error getting user data:", error);
      }
    }
  }, [db, session, status]);

  useEffect(() => {
    if (status === 'authenticated') {
      getUser();
    } else if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, getUser, router]);

  useEffect(() => {
    if (userData && userData.role !== 'admin') {
      router.push('/');
    } else {
      
    }
  }, [userData, router]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);

  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollArea className="h-full">
      {userData && (
      <div className="flex-1 space-y-4 p-4 pt-6 bg-white md:p-8">
        <div className="flex items-center justify-between space-y-2">
        {userData.role === 'admin' && (
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, Welcome back {userData && userData.fullName ? userData.fullName : ''} 🫡

            <Overview />

          </h2>
        )}
        </div>
      </div>
      )}
    </ScrollArea>
  );
}

export default Page;
