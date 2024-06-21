"use client";
import { useState, useEffect, useCallback } from 'react';
import { getFirestore, query, where, getDocs, collection } from 'firebase/firestore';
import { app } from '../../../firebase/firebase';
import { Overview } from '../../../components/overview';
import { useSession } from 'next-auth/react';
import { Card, CardContent} from '../../../components/ui/card';
import { ScrollArea } from '../../../components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import Loader from '../../../components/Loader';



function Page() {


  const { data: session, status } = useSession();
  const db = getFirestore(app);
  const [userData, setUserData] = useState(null);

  const getUser = useCallback(async () => {
    console.log("getUser called");
    console.log("Session data:", session);
    console.log("Session status:", status);

    if (status === 'authenticated' && session?.user?.uid) {
      console.log("Fetching user data for UID:", session.user.uid);
      try {
        const q = query(collection(db, "users"), where("uid", "==", session.user.uid));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          console.log("No matching documents.");
        } else {
          querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a data fetch
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 bg-white md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, Welcome back  {userData && userData.fullName ? userData.fullName : ''}  🫡
          </h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analytics
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4 grid ">

            <div className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-6">
              <Card className="col-span-4">

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

export default Page;
