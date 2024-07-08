"use client";

import React, { useRef, useState } from 'react';
import { useToast } from '../../../components/ui/use-toast';
import { sendPasswordResetEmail } from 'firebase/auth';
import { customAuth } from '../../../firebase/firebase';
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
    const { toast } = useToast();
    const emailRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const route = useRouter();

    const handleResetPassword = async (event) => {
        event.preventDefault();
        setLoading(true);

        sendPasswordResetEmail(customAuth, emailRef.current.value)
            .then(() => {
                setLoading(false);
                toast({
                    title: 'Success',
                    description: 'Password reset link sent to your email',
                    variant: 'default',
                });
                setTimeout(() => {
                    route.push('/login');
                }, 5000);
            })
            .catch((error) => {
                setLoading(false);
                toast({
                    title: 'Error',
                    description: error.message,
                    variant: 'destructive',
                });
            });
    };

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Reset your password
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleResetPassword}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input
                                        type="email"
                                        ref={emailRef}
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@email.com"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className={`w-full text-white ${loading ? 'bg-gray-500' : 'bg-red-800 hover:bg-primary-700'} focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                                    disabled={loading}
                                >
                                    {loading ? 'Loading...' : 'Reset Password'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}