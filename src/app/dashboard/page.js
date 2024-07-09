// "use client";
// import { useState, useEffect, useCallback } from 'react';
// import { getFirestore, query, where, getDocs, collection } from 'firebase/firestore';
// import { app } from '../../../firebase/firebase';
// import { Overview } from '../../../components/overview';
// import { useSession } from 'next-auth/react';
// import { Card, CardContent} from '../../../components/ui/card';
// import { ScrollArea } from '../../../components/ui/scroll-area';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
// import Loader from '../../../components/Loader';



// function Page() {


//   const { data: session, status } = useSession();
//   const db = getFirestore(app);
//   const [userData, setUserData] = useState(null);

//   const getUser = useCallback(async () => {
//     console.log("getUser called");
//     console.log("Session data:", session);
//     console.log("Session status:", status);

//     if (status === 'authenticated' && session?.user?.uid) {
//       console.log("Fetching user data for UID:", session.user.uid);
//       try {
//         const q = query(collection(db, "users"), where("uid", "==", session.user.uid));
//         const querySnapshot = await getDocs(q);
//         if (querySnapshot.empty) {
//           console.log("No matching documents.");
//         } else {
//           querySnapshot.forEach((doc) => {
//             console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
//             setUserData(doc.data());
//           });
//         }
//       } catch (error) {
//         console.error("Error getting user data:", error);
//       }
//     } else {
//       console.log("User is not authenticated or UID is missing.");
//     }
//   }, [db, session, status]);

//   useEffect(() => {
//     getUser();
//   }, [getUser]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate a data fetch
//     setTimeout(() => {
//       setLoading(false);
//     }, 1000);
//   }, []);

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <ScrollArea className="h-full">
//       <div className="flex-1 space-y-4 p-4 pt-6 bg-white md:p-8">
//         <div className="flex items-center justify-between space-y-2">
//           <h2 className="text-3xl font-bold tracking-tight">
//             Hi, Welcome back <span className='text-green-600'> {userData && userData.fullName ? userData.fullName : ''}  </span>  !
//           </h2>
//         </div>
//         <Tabs defaultValue="overview" className="space-y-4">
//           <TabsList>
//             <TabsTrigger value="overview">Overview</TabsTrigger>
//             <TabsTrigger value="analytics" disabled>
//               Analytics
//             </TabsTrigger>
//           </TabsList>
//           <TabsContent value="overview" className="space-y-4 grid ">

//             <div className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-6">
//               <Card className="col-span-4">

//                 <CardContent className="pl-2">
//                   <Overview />
//                 </CardContent>

//               </Card>

//             </div>



//           </TabsContent>

//         </Tabs>
//       </div>
//     </ScrollArea>
//   );
// }

// export default Page;

"use client";
import { useState, useEffect, useCallback } from 'react';
import { getFirestore, query, where, getDocs, collection, onSnapshot } from 'firebase/firestore';
import { app } from '../../../firebase/firebase';
import { Overview } from '../../../components/overview';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { ScrollArea } from '../../../components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import Loader from '../../../components/Loader';

function Page() {
  const { data: session, status } = useSession();
  const db = getFirestore(app);
  const [userData, setUserData] = useState(null);
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

  // Fetch PaymentInfo for the logged-in user from Firestore
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


  if (loading) {
    return <Loader />;
  }
  const hasSuccessfulPayment = payInfo.some(payment => payment.status === 'success');
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 bg-white md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-center">
            Hi, Welcome back
            {userData && userData.fullName ? (
              <>
                <span className='text-green-600'> {userData.fullName} </span> !
                {hasSuccessfulPayment && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="#2372af" 
                    stroke="#fafafa"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="inline-block w-6 h-6 ml-2"
                  >
                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                )}
              </>
            ) : ''}


          </h2>
        </div>
        {hasSuccessfulPayment ? (
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
      ): (
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
      <button className="w-full rounded-md bg-gradient-to-r from-green-400 to-blue-500 py-3 px-4 text-center text-base font-semibold text-white font-sm  transition-all duration-200 hover:opacity-80">
        Subscribe Now
      </button>
    </div>
  </Card>
</div>
          )}
      </div>

    </ScrollArea>
  );
}

export default Page;
