"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getFirestore, collection, query, where, getDocs , onSnapshot} from 'firebase/firestore';
import { app } from '../firebase/firebase';

export default function PaymentPlan() {
    const { data: session, status } = useSession();
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [email, setEmail] = useState('');
    const [payInfo, setPayInfo] = useState([]);

    const route = useRouter();
    const [userData, setUserData] = useState(null);
    const db = getFirestore(app);
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setIsValidEmail(validateEmail(newEmail));
    };

    const handleSubscribeClick = () => {
        if (isValidEmail) {
            const mailtoLink = `mailto:${email}?subject=${encodeURIComponent('Subscribe Request')}&body=${encodeURIComponent('Please subscribe me to your newsletter.')}`;
            window.location.href = mailtoLink;
        } else {
            alert('Please enter a valid email address.');
        }
    };
    const handlePayment = useCallback((amount, type) => {
        if (!session?.user?.uid) {
            route.push('/login')
            return;
        }

        const taxAmount = amount * 0.13;
        const serviceCharge = 0;
        const deliveryCharge = 0;
        const totalAmount = amount + taxAmount + serviceCharge + deliveryCharge;
        const oid = `ee2l3ca1-696b-4cc5-a6be-2c40d929d5-${Date.now()}`;
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://uat.esewa.com.np/epay/main';
        const appendInput = (name, value) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = name;
            input.value = value;
            form.appendChild(input);
        };

        appendInput('tAmt', totalAmount.toFixed(2));
        appendInput('amt', amount.toFixed(2));
        appendInput('txAmt', taxAmount.toFixed(2));
        appendInput('psc', serviceCharge.toFixed(2));
        appendInput('pdc', deliveryCharge.toFixed(2));
        appendInput('scd', 'EPAYTEST');
        appendInput('pid', oid);
        appendInput('su', `http://localhost:3000/success?oid=${oid}&planType=${type}&amount=${amount}&userId=${session.user.uid}`);
        appendInput('fu', 'http://localhost:3000/failure');

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);

    }, [session]);

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
    const hasSuccessfulPayment = payInfo.some(payment => payment.status === 'success');





    return (
        <div className="mx-auto px-4 bg-gradient-to-r from-green-400 to-blue-500  max-w-7xl md:my-24 lg:my-24">
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-6">
                <div className="px-4 py-10 lg:col-span-5 lg:px-0">
                    <span className="mb-8 inline-block rounded-full border p-1 px-3 text-xs font-semibold bg-gradient-to-r from-green-400 to-blue-500 text-white">
                        Simplify Waste Management
                    </span>
                    <h1 className="text-3xl font-bold md:text-5xl text-gray-800">
                        Get Started with Garbage Tracking
                    </h1>
                    <p className="mt-8 font-medium text-gray-700">
                        Take control of your waste management process and live in a cleaner, healthier environment.
                    </p>
                    <div className="flex pt-1` items-center">
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Enter your email"
                            className="rounded-md bg-white px-3 py-2 mr-4 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                            type="button"
                            onClick={handleSubscribeClick}
                            disabled={!isValidEmail}
                            className={`rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 ${!isValidEmail ? 'cursor-not-allowed' : ''}`}
                        >
                            Subscribe
                        </button>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center md:flex-row lg:col-span-7">

                    <><div className="w-full p-5 md:w-1/2">
                        <div className="rounded-md border bg-white">
                            <div className="border-b">
                                <div className="px-9 py-7">
                                    <h3 className="mb-3 text-xl font-bold leading-snug text-gray-900">Basic Plan</h3>
                                    <p className="font-medium leading-relaxed text-gray-500">
                                        Perfect for individuals or small households to manage waste efficiently.
                                    </p>
                                </div>
                            </div>
                            <div className="px-9 pb-9 pt-8">
                                <p className="mb-6 font-medium leading-relaxed text-gray-600">Features included:</p>
                                <ul className="mb-11">
                                    <li className="mb-4 flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="mr-2"
                                        >
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                        </svg>
                                        <p className="font-semibold leading-normal">Basic Waste Tracking</p>
                                    </li>
                                    <li className="mb-4 flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="mr-2"
                                        >
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                        </svg>
                                        <p className="font-semibold leading-normal">Weekly Pickup Reminders</p>
                                    </li>
                                    <li className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="mr-2"
                                        >
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                        </svg>
                                        <p className="font-semibold leading-normal">Access to Recycling Tips</p>
                                    </li>
                                </ul>

                                <div>
                                    {(!userData || userData.role === 'user' && !hasSuccessfulPayment ) && (
                                        <button
                                            className="w-full rounded-md bg-gradient-to-r from-green-400 to-blue-500 py-3 px-4 text-center text-base font-semibold text-white font-sm  transition-all duration-200 hover:opacity-80"
                                            onClick={() => handlePayment(25, 'Basic Plan')}
                                        >
                                            Purchase Plan for NPR 25
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div><div className="w-full p-5 md:w-1/2">
                            <div className="rounded-md border bg-white">
                                <div className="border-b">
                                    <div className="px-9 py-7">
                                        <h3 className="mb-3 text-xl font-bold leading-snug text-gray-900">Premium Plan</h3>
                                        <p className="font-medium leading-relaxed text-gray-500">
                                            Ideal for families and larger households looking for enhanced waste management solutions.
                                        </p>
                                    </div>
                                </div>
                                <div className="px-9 pb-9 pt-8">
                                    <p className="mb-6 font-medium leading-relaxed text-gray-600">Features included:</p>
                                    <ul className="mb-11">
                                        <li className="mb-4 flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="mr-2"
                                            >
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                            </svg>
                                            <p className="font-semibold leading-normal">Advanced Waste Tracking</p>
                                        </li>
                                        <li className="mb-4 flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="mr-2"
                                            >
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                            </svg>
                                            <p className="font-semibold leading-normal">Daily Pickup Reminders</p>
                                        </li>
                                        <li className="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="mr-2"
                                            >
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                            </svg>
                                            <p className="font-semibold leading-normal">Exclusive Recycling Workshops</p>
                                        </li>
                                    </ul>
                                    <div>

                                        {(!userData || userData.role === 'user' && !hasSuccessfulPayment ) && (
                                            <button
                                                className="w-full rounded-md bg-gradient-to-r from-green-400 to-blue-500 py-3 px-4 text-center text-base font-semibold text-white transition-all duration-200 hover:opacity-80"
                                                onClick={() => handlePayment(50, 'Premium Plan')}
                                            >
                                                Purchase Plan for NPR 50
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div></>

                </div>
            </div>

        </div>
    )
}

