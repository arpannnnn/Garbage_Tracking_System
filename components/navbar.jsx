'use client'
import Link from 'next/link'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function CustomNavbar() {
    const pathname = usePathname()
    const { data: session } = useSession()
    const [isNavbarOpen, setIsNavbarOpen] = useState(false)
    const [isSessionLoading, setIsSessionLoading] = useState(false)

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen)
    }
    const imageStyle = {
        borderRadius: '50%',
        border: '1px solid #fff',
    }
    useEffect(() => {
        const handleSessionUpdate = () => {
            setIsSessionLoading(false);
        };
        if (session) {
            handleSessionUpdate();
        } else {
            const cleanupSessionObserver = () => {
                const unsubscribe = () => {
                };
                return unsubscribe;
            };
            const cleanup = cleanupSessionObserver();
            return cleanup;
        }
    }, [session]);
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
                            style={imageStyle}
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
                                <Link href="/" className={`${pathname === '/' ? 'text-blue-700' : ''}block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`} aria-current="page">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/features" className={`${pathname === '/features' ? 'text-blue-700' : ''} block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className={`${pathname === '/about' ? 'text-blue-700' : ''}block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>About</Link>
                            </li>
                            <li>
                                <Link href="/team" className={`${pathname === '/team' ? 'text-blue-700' : ''} block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>Our Team</Link>
                            </li>


                            {!session?.user && !isSessionLoading && (
                                <>
                                    <li>
                                        <Link href="/register" className={`${pathname === '/register' ? 'text-blue-700' : ''} block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>Register</Link>
                                    </li>
                                    <li>
                                        <Link href="/login" className={`${pathname === '/login' ? 'text-blue-700' : ''} block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>Login</Link>
                                    </li>
                                </>
                            )}


                            {session?.user && (
                                <li>
                                    <Link href="/api/auth/signout" className={`${pathname === '/logout' ? 'text-blue-700' : ''} block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>Logout</Link>
                                </li>
                            )}


                            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-2 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <svg className="block rounded hover:bg-orange-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 text-orange-500 " xmlns="http://www.w3.org/2000/svg" width="1em" height="1.5em" viewBox="0 0 10 12"><path fill="currentColor" d="m5.966 4.49l-.827.742a5 5 0 0 0 .455 1.073a4.7 4.7 0 0 0 .722.922l1.071-.33c.6-.185 1.255.005 1.654.48l.61.726a1.47 1.47 0 0 1-.137 2.042c-.995.908-2.527 1.215-3.674.314a10.4 10.4 0 0 1-2.516-2.87A10 10 0 0 1 2.03 4.013c-.22-1.422.821-2.56 2.119-2.948c.774-.232 1.6.166 1.884.908l.335.875c.22.576.062 1.225-.402 1.641" /></svg>
                                <Link href="tel:+9779856987452" className='block rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 text-orange-500'>+9779856987452</Link>
                            </ul>
                        </ul>
                    </div>

                </div>
            </nav>

        </div>
    )
}
