'use client'
import Link from 'next/link'
import Image from 'next/image'
import React, { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { getFirestore } from 'firebase/firestore'
import { app } from '../firebase/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { ref, onValue } from 'firebase/database'
import { database } from '../firebase/firebase'

export default function CustomNavbar() {
    const pathname = usePathname()
    const [userData, setUserData] = useState(null)
        const { data: session, status } = useSession()
    const [isNavbarOpen, setIsNavbarOpen] = useState(false)
    const [isSessionLoading, setIsSessionLoading] = useState(false)
    const [binStatus, setBinStatus] = useState(null)

    const db = getFirestore(app);

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen)
    }



    useEffect(() => {
        const handleSessionUpdate = () => {
            setIsSessionLoading(false);
        };
        if (session) {
            handleSessionUpdate();
        } else {
            const cleanupSessionObserver = () => {
                // Implement any cleanup logic here
                const unsubscribe = () => { };
                return unsubscribe;
            };
            const cleanup = cleanupSessionObserver();
            return cleanup;
        }
    }, [session]);

    useEffect(() => {
        const binStatusRef = ref(database, '/sensor/distance');
        const fetchBinStatus = () => {
            onValue(binStatusRef, (snapshot) => {
                const status = snapshot.val();
                console.log('Fetched bin status:', status);
                const percentage = (status / 194) * 100; // Assuming 194 is the maximum capacity
                setBinStatus(percentage);
            });
        };

        fetchBinStatus();
    }, []);
    
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

            }
        } else {

        }
    }, [db, session, status]);

    useEffect(() => {
        getUser();
    }, [getUser]);

    return (
        <div>
            <nav className="bg-white border-gray-200 dark:bg-gray-800">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Image className=''
                            src="/GTS.jpg"
                            width={50}
                            height={50}
                            alt="Picture of the author"
                            style={{ borderRadius: '50%', border: '1px solid #fff' }}
                        />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">GTS</span>
                    </Link>

                    <button
                        data-collapse-toggle="navbar-default"
                        type="button"
                        className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-default"
                        aria-expanded="false"
                        onClick={toggleNavbar}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                        </svg>
                    </button>
                    <div className={`${isNavbarOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-4 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

                            <li>

                                <Link href="/" className={`${pathname === '' ? 'text-green-700' : ''}block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`} aria-current="page">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/features" className={`${pathname === '/features' ? 'text-green-700' : ''} block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className={`${pathname === '/about' ? 'text-green-700' : ''} block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>About</Link>
                            </li>
                            <li>
                                <Link href="/team" className={`${pathname === '/team' ? 'text-green-700' : ''} block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>Our Team</Link>
                            </li>


                            {!session?.user && !isSessionLoading && (
                                <>
                                    <li>
                                        <Link href="/register" className={`${pathname === '/register' ? 'text-green-700' : ''} block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>Register</Link>
                                    </li>
                                    <li>
                                        <Link href="/login" className={`${pathname === '/login' ? 'text-green-700' : ''} block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>Login</Link>
                                    </li>
                                </>
                            )}


                            {session?.user && (
                                <>
                                    <li>
                                        <Link href="/api/auth/signout" className={`${pathname === '/logout' ? 'text-green-700' : ''} block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>Logout</Link>
                                    </li>
                                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-2 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                        <li>
                                            <Link
                                                href="/dashboard" className={`${pathname === '/dashboard' ? 'text-green-700' : ''} block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-dashboard"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>
                                            </Link>
                                        </li>
                                    </ul>
                                </>
                            )}
                            {session?.user && userData?.role === 'admin' && (

                            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-2 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <li>
                                    <Link
                                        href="/admin" className={`${pathname === '/admin' ? 'text-green-700' : ''} block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                                        <svg  width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <g>
                                                <path fill="none" d="M0 0h24v24H0z" />
                                                <path d="M12 14v8H4a8 8 0 0 1 8-8zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm9 4h1v5h-8v-5h1v-1a3 3 0 0 1 6 0v1zm-2 0v-1a1 1 0 0 0-2 0v1h2z" />
                                            </g>
                                        </svg>
                                    </Link>
                                </li>
                            </ul>
                            )}


                            {session?.user && (

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-12 mr-2"
                                    aria-labelledby="binIconTitle" strokeLinecap="round" strokeLinejoin="round"
                                    fill={binStatus < 50 ? "green" : binStatus < 80 ? "yellow" : "red"}
                                    viewBox="0 0 24 24"
                                    color="#000000"
                                >
                                    <path
                                        stroke="#000000" strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19 6L5 6M14 5L10 5M6 10L6 20C6 20.6666667 6.33333333 21 7 21 7.66666667 21 11 21 17 21 17.6666667 21 18 20.6666667 18 20 18 19.3333333 18 16 18 10"
                                    />
                                    <title>Bin level: {binStatus && Math.round(binStatus)}%</title>

                                </svg>
                            )}

                            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-2 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <svg className="block rounded hover:bg-orange-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 text-gree
                                -500 " xmlns="http://www.w3.org/2000/svg" width="1em" height="1.5em" viewBox="0 0 10 12"><path fill="currentColor" d="m5.966 4.49l-.827.742a5 5 0 0 0 .455 1.073a4.7 4.7 0 0 0 .722.922l1.071-.33c.6-.185 1.255.005 1.654.48l.61.726a1.47 1.47 0 0 1-.137 2.042c-.995.908-2.527 1.215-3.674.314a10.4 10.4 0 0 1-2.516-2.87A10 10 0 0 1 2.03 4.013c-.22-1.422.821-2.56 2.119-2.948c.774-.232 1.6.166 1.884.908l.335.875c.22.576.062 1.225-.402 1.641" /></svg>
                                <Link href="tel:+9779856987452" className='block rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 text-green-500'>+9779856987452</Link>
                            </ul>

                        </ul>
                    </div>

                </div>
            </nav>

        </div>

    )
}
