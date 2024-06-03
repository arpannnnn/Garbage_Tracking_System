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
    const [isGoogleLoading, setisGoogleLoading] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        signIn("credentials", { email: emailRef.current.value, password: passRef.current.value, redirect: false }).then(res => {
            if (res.error == null) {
                router.push('/')
            }
            else {
                alert(`${res.error}`)
            }
        }).catch(error => {
            console.log(`${error}`);
        }).finally(() => {
            setisGoogleLoading(false)
        })

    }

    const handleGoogleLogin = async () => {
        try {
            setisGoogleLoading(true);
            await signIn("google", { redirect: true, callbackUrl: 'http://localhost:3000' })
        } catch (error) {
            console.error(error);
        } finally {
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
                            <form className="space-y-4 md:space-y-6" action="#" method="post">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" ref={emailRef} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" ref={passRef} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <button onClick={handleLogin}
                                    type="button" className="w-full text-white bg-red-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"> Sign in</button>
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
                                            <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.23-5.89-2.23-4.788 0-8.672 3.883-8.672 8.672 0 4.788 3.884 8.671 8.672 8.671 4.211 0 8.01-2.889 8.01-8.671 0-.579-.064-1.157-.173-1.728z" />
                                        </svg>
                                    </span>
                                    Sign in with Google
                                    {isGoogleLoading && <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                                        <div className="spinner"></div>
                                    </div>}
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
    )
}
