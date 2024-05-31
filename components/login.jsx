'use client'
import React, { useRef, useState } from 'react'
import Image from 'next/image';
import { signIn } from "next-auth/react"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
export default function CustomLogin() {
    const emailRef = useRef("");
    const passRef = useRef("");
    const router = useRouter();
    // const [isLoading, setisLoading] = useState(false);
    const [isGoogleLoading, setisGoogleLoading] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        // signIn("credentials", { email: emailRef.current.value, password: passRef.current.value, redirect: false }).then(res => {
        //     if (res.error == null) {
        //         router.push('/')
        //     }
        //     else {
        //         alert(`${res.error}`)
        //     }
        // }).catch(error => {
        //     console.log(`${error}`);
        // }).finally(() => {
        //     setisGoogleLoading(false)
        // })
        const payload = {
            email: emailRef.current.value,
            password: passRef.current.value
        };
        try {
            const response = await fetch("http://127.0.0.1:8000/api/login_user/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                const data = await response.json();
                // Assuming your backend returns a token upon successful login
                const token = data.token;
                // Store the token in local storage
                localStorage.setItem('user_token', JSON.stringify(token));
                // Redirect to the homepage
                router.push('/');
                alert('Login successfully!!')
            } else {
                // Handle invalid credentials or other errors
                alert('Invalid credentials. Please try again.');
            }
         } catch (error) {
            console.error('Error logging in:', error);
            alert('An error occurred during login. Please try again.');
         } finally {
            setisGoogleLoading(false);
         }

    }
    const handleGoogleLogin = async () => {
        try {

            setisGoogleLoading(true);
            await signIn("google", { redirect: true, callbackUrl: 'http://localhost:3000' })
        }
        catch (error) {
            console.error(error);

        }
        finally {
            setisGoogleLoading(false)
        }

    }
    const imageStyle = {
        borderRadius: '50%',
        border: '1px solid #fff',
      }
       


    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <Image className=''
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
                            <form className="space-y-4 md:space-y-6" action="#" method="post">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" ref={emailRef} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" ref={passRef} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">

                                    </div>
                                </div>


                                <button onClick={handleLogin} className="w-full text-white bg-red-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"> Sign in</button>

                                <button onClick={handleGoogleLogin}
                                    type="button"
                                    className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                                >
                                    <span className="mr-2 inline-block">
                                        <svg
                                            className="h-6 w-6 text-rose-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                                        </svg>
                                    </span>
                                    {isGoogleLoading ? <span className='pulse'>Loading...</span> : 'Sign in with Google'}
                                </button>

                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">

                                    Dont have an account yet? <Link href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
