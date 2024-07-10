"use client"
import React, { useEffect, useState ,useCallback} from 'react'
import { useSession } from 'next-auth/react';
import { getFirestore, query, where, getDocs, collection, onSnapshot } from 'firebase/firestore';
import { app } from '../../../../firebase/firebase';
import Map from '../../../../components/map'
import Loader from '../../../../components/Loader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import Link from 'next/link';


function Page() {
  const { data: session, status } = useSession();
  const db = getFirestore(app);
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true);
  const [payInfo, setPayInfo] = useState([]);
  const getUser = useCallback(async () => {

    if (status === 'authenticated' && session?.user?.uid) {

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
    // Simulate a data fetch
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [getUser]);

 
  useEffect(() => {
    if (session?.user?.uid) {
      const unsubscribe = onSnapshot(
        query(collection(db, 'PaymentInfo'), where('userId', '==', session.user.uid)),
        (snapshot) => {
          const fetchedpayInfo = snapshot.docs.map((doc) => doc.data());
          setPayInfo(fetchedpayInfo);
        }
      );

      return () => unsubscribe();
    }
  }, [db, session]);
  useEffect(() => {

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <Loader />;
  }
  const hasSuccessfulPayment = payInfo.some(payment => payment.status === 'success');
  const isStaff = userData && userData.role === 'staff';
  const isadmin= userData && userData.role === 'admin';
  return (



    <div>
      {(hasSuccessfulPayment  || isStaff || isadmin) ? (
          <Map />


        ) : (
          <div className="flex justify-center items-center py-12 bg-gray-100 ">
            <Card className="max-w-sm w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <CardHeader className="bg-green-500 p-6">
                <CardTitle className="text-white text-2xl font-bold text-center">
                  Subscription Required
                </CardTitle>
              </CardHeader>
              <div className="p-8">
                <CardDescription className="text-gray-600 mb-6 text-center">
                  You need a subscription to access this premium content. Unlock exclusive features today!
                </CardDescription>
                <div>
                  <Link href="/Plan" >
                    <button className="w-full rounded-md bg-gradient-to-r from-green-400 to-blue-500 py-3 px-4 text-center text-base font-semibold text-white font-sm  transition-all duration-200 hover:opacity-80">
                      Subscribe Now
                    </button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        )}
    </div >
  )
}
      
  

export default Page