'use client'
import { useEffect, useState } from 'react';
import { CalendarDateRangePicker } from '../../../components/date-range-picker';
import { Overview } from '../../../components/overview';

import { signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { customAuth, db } from '../../../firebaase/firebase';

import {
  Card,
  CardContent,
  CardDescription,
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
      <div className={`flex-1 space-y-4 p-4 pt-6 md:p-8 transition-opacity duration-500 ${profile ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center justify-between space-y-2">
          {profile ? (
            <h2 className="text-3xl font-bold tracking-tight">
              Hi, Welcome back 👋 {profile.fullName}
            </h2>
          ) : null}
          <div className="hidden items-center space-x-2 md:flex">
            {/* <CalendarDateRangePicker /> */}
            {/* <Button>Download</Button> */}
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analytics
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 ">

            </div>
            <div className="  grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-5">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>

            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
