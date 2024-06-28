// 'use client';
// import React, { useRef, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useToast } from './ui/use-toast';

// export default function CustomLogin() {
//     const { toast } = useToast();
//     const emailRef = useRef(null);
//     const passRef = useRef(null);
//     const [loading, setLoading] = useState(false);
//     const router = useRouter();

//     const handleLogin = async (event) => {
//         event.preventDefault();
//         setLoading(true);

//         const email = emailRef.current.value;
//         const password = passRef.current.value;

//         try {
//             const response = await fetch('http://127.0.0.1:8000/api/login_user/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     email,
//                     password,
//                 }),
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 const { token } = data;
//                 console.log('Login successful, token:', token);

//                 // Store token securely
//                 localStorage.setItem('User-Token', JSON.stringify(token));

//                 // Redirect to home page
//                 router.push('/');
//             } else {
//                 const errorData = await response.json();
//                 console.error('Error logging in:', errorData);
//                 toast({
//                     title: 'Error',
//                     description: errorData.detail || 'Invalid credentials',
//                     variant: 'destructive',
//                 });
//                 emailRef.current.value = '';
//                 passRef.current.value = '';
//             }
//         } catch (error) {
//             console.error('Login error:', error);
//             toast({
//                 title: 'Error',
//                 description: 'An error occurred during login. Please try again.',
//                 variant: 'destructive',
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     const imageStyle = {
//         borderRadius: '50%',
//         border: '1px solid #fff',
//     };

//     return (
//         <div>
//             <section className="bg-gray-50 dark:bg-gray-900">
//                 <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//                     <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
//                         <Image
//                             src="/GTS.jpg"
//                             width={50}
//                             height={50}
//                             alt="Picture of the author"
//                             style={imageStyle}
//                         />
//                         GTS
//                     </a>
//                     <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//                         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//                             <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                                 Sign in to your account
//                             </h1>
//                             <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
//                                 <div>
//                                     <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
//                                     <input
//                                         type="email"
//                                         ref={emailRef}
//                                         id="email"
//                                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                                         placeholder="name@company.com"
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
//                                     <input
//                                         type="password"
//                                         ref={passRef}
//                                         id="password"
//                                         placeholder="••••••••"
//                                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                                         required
//                                     />
//                                 </div>
//                                 <button
//                                     type="submit"
//                                     className={`w-full text-white ${loading ? 'bg-gray-500' : 'bg-red-800 hover:bg-primary-700'} focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
//                                     disabled={loading}
//                                 >
//                                     {loading ? 'Loading...' : 'Sign in'}
//                                 </button>

//                                 <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                                     Don’t have an account yet? <Link href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
//                                 </p>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// }


'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from './ui/use-toast';

export default function CustomLogin() {
    const { toast } = useToast();
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);

        const email = emailRef.current.value;
        const password = passRef.current.value;

        try {
            const response = await fetch('http://127.0.0.1:8000/api/login_user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const { token } = data;
                console.log('Login successful, token:', token);

                // Store token in localStorage
                localStorage.setItem('User-Token', JSON.stringify(token));

                // Store token in a cookie
                setCookie('User-Token', JSON.stringify(token), 7); // Expires in 7 days

                // Redirect to home page
                router.push('/');
            } else {
                const errorData = await response.json();
                console.error('Error logging in:', errorData);
                toast({
                    title: 'Error',
                    description: errorData.detail || 'Invalid credentials',
                    variant: 'destructive',
                });
                emailRef.current.value = '';
                passRef.current.value = '';
            }
        } catch (error) {
            console.error('Login error:', error);
            toast({
                title: 'Error',
                description: 'An error occurred during login. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const setCookie = (name, value, days) => {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value}; ${expires}; path=/`;
    };

    const imageStyle = {
        borderRadius: '50%',
        border: '1px solid #fff',
    };

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <Image
                            src="/GTS.jpg"
                            width={50}
                            height={50}
                            alt="Picture of the author"
                            style={imageStyle}
                        />
                        GTS
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input
                                        type="email"
                                        ref={emailRef}
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input
                                        type="password"
                                        ref={passRef}
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className={`w-full text-white ${loading ? 'bg-gray-500' : 'bg-red-800 hover:bg-primary-700'} focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                                    disabled={loading}
                                >
                                    {loading ? 'Loading...' : 'Sign in'}
                                </button>

                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? <Link href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

