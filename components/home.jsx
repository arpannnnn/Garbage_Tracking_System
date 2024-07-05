'use client'
import React, { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Home() {
    const { data: session, status } = useSession();
    const [showScrollBtn, setShowScrollBtn] = useState(false);
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollBtn(window.pageYOffset > 200);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
            alert('Please log in to make a purchase.');
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

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const imageStyle = {
        borderRadius: '5%',
        border: '1px solid #fff',
    }
    return (
        <div className="w-full">
            <button
                id="scrollToTopBtn"
                className={`fixed bottom-4 right-4 z-50 ${showScrollBtn ? 'block' : 'hidden'} h-12 w-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500`}
                onClick={scrollToTop}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </button>
            <header className="relative w-full border-b bg-white pb-1">

            </header>
            <div className="relative w-full bg-white">
                <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
                    <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
                        <div className="mt-8 flex max-w-max items-center space-x-2 rounded-full bg-black p-1">
                            <div className="rounded-full bg-white p-1 px-2">
                                <p className="text-sm font-medium">GTS</p>
                            </div>
                            <p className="text-sm font-medium text-white"> ♻️Nepal </p>
                        </div>
                        <h1 className="mt-8 text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-6xl">
                            Welcome to the <span className='text-green-400'>Garbage Tracking System ! </span>
                        </h1>
                        <p className="mt-8 text-lg text-gray-700">
                            Revolutionize waste management with our innovative web app. Track, manage, and optimize waste collection for municipalities, waste companies, and homeowners.
                        </p>
                        <form action="" className="mt-8 flex items-start space-x-2">

                            <div>
                                <a href="/register">
                                    <button

                                        type="button"
                                        className="rounded-md bg-black px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                    >
                                        Join Us

                                    </button>
                                </a>
                            </div>
                        </form>
                    </div>
                    <div className="relative lg:col-span-5 lg:-mr-8 ml-20 xl:col-span-6">
                        <Image
                            className="aspect-[3/2] bg-gray-50 object-cover lg:aspect-[4/3] lg:h-[700px] xl:aspect-[16/9] py-2"
                            src="/homegts.jpg"
                            style={imageStyle}
                            alt=""
                            width={500} height={500}
                        />
                    </div>
                </div>
            </div>


            <div className="mx-auto my-32 max-w-7xl px-2 lg:px-8">
                <div className="grid grid-cols-1 gap-y-8 text-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
                    <div>
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#000000" strokeWidth="2" stroke-linecap="round" strokelinejoin="round" />
                                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#000000" strokeWidth="2" strokelinecap="round" strokelinejoin="round" />
                            </svg>
                        </div>
                        <h3 className="mt-8 text-lg font-semibold text-black">Real-time Tracking</h3>
                        <p className="mt-4 text-sm text-gray-600">
                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
                            sint. Velit officia consequat duis enim velit mollit.
                        </p>
                    </div>
                    <div>
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
                            <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 64 64"><path fill="#b1bcc4" d="m4.9 24.5l3.2 25.7C8.2 57.8 18.3 64 30.7 64c12.5 0 22.6-6.2 22.6-13.8l3.2-25.7z" /><g fill="#cad5dd"><path d="m9.1 24.5l2.7 25.7c0 7.6 8.5 13.8 18.9 13.8c10.5 0 18.9-6.2 18.9-13.8l2.7-25.7z" /><ellipse cx="30.7" cy="25.2" rx="25.8" ry="11.7" /></g><ellipse cx="30.7" cy="24.5" fill="#333" rx="21.1" ry="9.6" /><path fill="#efd57f" d="M17.3 26.4c.4 3.3-4.9-3.7-6.5-1.6c-.8 1.1 3.6 6.5 3.6 6.5l11-4.9s1-8.6-.5-7c-3.6 3.8-8.3 1.4-7.6 7" /><path fill="#fee790" d="M22.8 26.4c-3.4-.5-2.4-6.2-5-5.5c-3.5.9-.9 5.3-7.2 8.1c0 0 18.1 12.4 19.6-.1c0 .1-3-6.8-4.9-6.2c-1.1.3-.2 4-2.5 3.7" /><path fill="#efd57f" d="M33.3 25.7c-.3 3.3 8.5 9.5 8.5 9.5l11.8-9.6s-3.8-1.1-5-2.6c-.8-1.1-2-4.2-4.4-3.8c-2.6.5-1.8 4.8-3.1 5.8c-1.4 1.1-7.6-1.6-7.8.7" /><path fill="#fee790" d="M48.9 20.4c-1.1-.9-14.1 8.3-14.2 8.6c-.4 2.2 5.1 2 5.8 2c-.8 4.2 13.5.1 13.8-2.2c-1.1-2.5-3-3.6-5.8-3.4c-.2 0 2.4-3.3.4-5" /><path fill="#428bc1" d="M23.6 35.5c-.8 1.1 17.2-.6 17.4-.9c1.4-1.7-3.4-4.1-4-4.5c2.9-3.3.8-4.4-3.2-3.3c.4-6.8-1.2-8.5-4.5 0c-1.2-.6-5.4-.1-6.3 2.1c-1.1 2.4 4.8 1 .6 6.6" /><path fill="#42ade2" d="M27.3 21.8c-1.8.5-1.1 12.6 1.3 13.2c-.2.3-2.5 2.8-1.5 3.6c1.6 1.4 8.9-4.7 8.6-6.5c6.8.8 9-.7.3-4.3c.7-1 3.9-4.1 1.8-5.1c-2.4-1.2-4.4 3.1-6.1 2.8c-1.5-.3-1.9-4.4-4.4-3.7" /><path fill="#b1bcc4" d="m51.7 32l-2 18.2c0 7.6-8.5 13.8-18.9 13.8c12.5 0 22.6-6.2 22.6-13.8l3-23.5c-.7 2-2.3 3.8-4.7 5.3M11.8 50.2L9.8 32c-2.4-1.5-4-3.3-4.6-5.2l3 23.5C8.2 57.8 18.3 64 30.7 64c-10.4 0-18.9-6.2-18.9-13.8" /><path fill="#cad5dd" d="M56.6 24.5c-.7-6.2-12-11.1-25.8-11.1c-13.9 0-25.1 4.9-25.8 11.1v.6c0 .5.1 1.1.2 1.6c.6 1.9 2.2 3.7 4.6 5.3l2 18.2c0 7.6 8.5 13.8 18.9 13.8c10.5 0 18.9-6.2 18.9-13.8l2-18.2c2.4-1.5 4-3.3 4.6-5.2c.2-.5.2-1.1.2-1.6v-.4zm-25.9 9.6c-11.6 0-21.1-4.3-21.1-9.6S19.1 15 30.7 15c11.6 0 21.1 4.3 21.1 9.6s-9.4 9.5-21.1 9.5" /><g fill="#7d8b91"><path d="m9.268 56.109l2.063-.392l.299 1.571l-2.063.392zm13.297-.001l2.064-.391l.298 1.572l-2.063.39z" /><path d="M13.7 52.6s4.1 3.8 11.2 4.7c0 0-.8 5.6-2.7 6.4c-3.2 1.4-12-2.7-12.6-6c-.4-1.7 4.1-5.1 4.1-5.1" /></g><path fill="#dfe9ef" d="M13.4 51s4.1 3.8 11.2 4.7c0 0-.8 5.6-2.7 6.4c-3.2 1.4-12-2.7-12.6-6c-.4-1.7 4.1-5.1 4.1-5.1" /><path fill="#fff" d="M54.4 29.9c-1.3 1.7-3.1 3-4.9 4.2c-1.9 1.1-3.9 2-5.9 2.6c-4.1 1.3-8.5 1.8-12.8 1.8c-4.3 0-8.6-.5-12.8-1.7c-2.1-.6-4.1-1.5-6-2.6c-1.8-1.1-3.6-2.5-4.8-4.3c1.5 1.5 3.4 2.6 5.2 3.4c1.9.9 3.9 1.5 5.9 1.9c4.1.9 8.2 1.2 12.4 1.2c4.2 0 8.3-.4 12.4-1.3c2-.5 4-1.1 5.9-2c1.9-.7 3.8-1.8 5.4-3.2" /><path fill="#b1bcc4" d="m58.4 14.7l.6-3.6c.6-2.9-10.8-7.4-22.1-9.6c-11.3-2.1-23.8-2.1-24.4.8l-1 3.5z" /><path fill="#cad5dd" d="m55.4 14.1l.6-3.6c.6-2.9-9.2-7.2-19.1-9C27.1-.4 16.2 0 15.5 2.9l-.9 3.5z" /><path fill="#7d8b91" d="M11.6 5.6c.5-2.4 11.4-2.4 24.4 0s23 6.4 22.5 8.8c-.5 2.4-11.5 2.4-24.4 0C21.1 12 11 8 11.6 5.6" /><path fill="#333" d="M15.8 6.6c.4-2 9.4-2 20 0s18.8 5.2 18.4 7.2c-.4 2-9.4 2-20 0c-10.6-1.9-18.8-5.2-18.4-7.2" /></svg>
                        </div>
                        <h3 className="mt-8 text-lg font-semibold text-black">
                            Bin Management
                        </h3>
                        <p className="mt-4 text-sm text-gray-600">
                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
                            sint. Velit officia consequat duis enim velit mollit.
                        </p>
                    </div>
                    <div>
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                            <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 32 32"><path fill="currentColor" d="M4 2H2v26a2 2 0 0 0 2 2h26v-2H4Z" /><path fill="currentColor" d="M30 9h-7v2h3.59L19 18.59l-4.29-4.3a1 1 0 0 0-1.42 0L6 21.59L7.41 23L14 16.41l4.29 4.3a1 1 0 0 0 1.42 0l8.29-8.3V16h2Z" /></svg>
                        </div>
                        <h3 className="mt-8 text-lg font-semibold text-black">
                            Reporting and Analytics
                        </h3>
                        <p className="mt-4 text-sm text-gray-600">
                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
                            sint. Velit officia consequat duis enim velit mollit.
                        </p>
                    </div>
                    <div>
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                            <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 20 20"><path fill="currentColor" d="M10 6a2 2 0 1 0 0-4a2 2 0 0 0 0 4M5.472 4.15a1.76 1.76 0 0 0-2.317.88c-.4.882-.008 1.917.877 2.31l2.671 1.19A.5.5 0 0 1 7 8.987v1.865a.5.5 0 0 1-.036.187l-1.84 4.555a1.75 1.75 0 0 0 3.244 1.311l.086-.213A5.5 5.5 0 0 1 13 9.022v-.035a.5.5 0 0 1 .297-.457l2.671-1.19a1.74 1.74 0 0 0 .877-2.31a1.76 1.76 0 0 0-2.317-.88l-1.276.569a1.04 1.04 0 0 0-.52.524a3 3 0 0 1-5.463 0a1.04 1.04 0 0 0-.52-.524zM18 14.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m-2.146-1.854a.5.5 0 0 0-.708 0L12.5 15.293l-.646-.647a.5.5 0 0 0-.708.708l1 1a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0 0-.708" /></svg>
                        </div>
                        <h3 className="mt-8 text-lg font-semibold text-black">Mobile Accessibility</h3>
                        <p className="mt-4 text-sm text-gray-600">
                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
                            sint. Velit officia consequat duis enim velit mollit.
                        </p>
                    </div>
                </div>
            </div>
            <section className="container mx-auto max-w-7xl bg-gradient-to-b from-green-200 to-blue-300 px-4 py-12 lg:px-0">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-grey-800 sm:text-5xl lg:text-6xl">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Discover more about the Garbage Tracking System and how it can simplify waste management in your community.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-6 mt-12 mx-4 md:grid-cols-3 lg:grid-cols-3">
                    <div className="bg-white rounded-lg shadow-md">
                        <button className="flex items-center justify-between w-full px-6 py-4 text-lg font-semibold text-gray-800 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-300">
                            <span>How do I get started?</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M13.293 9.293a1 1 0 0 0-1.414-1.414L10 10.586 7.707 8.293a1 1 0 1 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l3-3a1 1 0 0 0 0-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <div className="p-6">
                            <div className="text-gray-700">
                                To start using the Garbage Tracking System:
                                <ul className="list-decimal pl-4 mt-4">
                                    <li>Create an account on our platform.</li>
                                    <li>Enter your address details for accurate tracking.</li>
                                    <li>Once logged in, track the waste-collecting vehicle assigned to your area.</li>
                                    <li>Receive notifications about the estimated time of arrival of the garbage collector.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md">
                        <button className="flex items-center justify-between w-full px-6 py-4 text-lg font-semibold text-gray-800 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-300">
                            <span>How do I get started?</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M13.293 9.293a1 1 0 0 0-1.414-1.414L10 10.586 7.707 8.293a1 1 0 1 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l3-3a1 1 0 0 0 0-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <div className="p-6">
                            <div className="text-gray-700">
                                To start using the Garbage Tracking System:
                                <ul className="list-decimal pl-4 mt-4">
                                    <li>Create an account on our platform.</li>
                                    <li>Enter your address details for accurate tracking.</li>
                                    <li>Once logged in, track the waste-collecting vehicle assigned to your area.</li>
                                    <li>Receive notifications about the estimated time of arrival of the garbage collector.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md">
                        <button className="flex items-center justify-between w-full px-6 py-4 text-lg font-semibold text-gray-800 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-300">
                            <span>What is the difference between a free and paid account?</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M13.293 9.293a1 1 0 0 0-1.414-1.414L10 10.586 7.707 8.293a1 1 0 1 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l3-3a1 1 0 0 0 0-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <div className="p-6">
                            <p className="text-gray-700">
                                With a free account, users can track the garbage collector and receive basic notifications. A paid account offers additional benefits such as priority support, advanced tracking options, customized notifications, and exclusive offers.
                            </p>
                        </div>
                    </div>
                </div>
                <p className="mt-8 text-lg text-center text-gray-600">
                    If you have any further questions or need assistance, feel free to <a href="#" className="font-semibold text-black hover:underline">contact our support team</a>.
                </p>
            </section>

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
                        <div className="w-full p-5 md:w-1/2">
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
                                    <button
                                        className="w-full rounded-md bg-gradient-to-r from-green-400 to-blue-500 py-4 px-9 text-center text-base font-semibold text-white transition-all duration-200 hover:opacity-80"
                                        onClick={() => handlePayment(25, 'Basic Plan')}
                                    >
                                        Purchase Plan for $25
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="w-full p-5 md:w-1/2">
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
                                    <button
                                        className="w-full rounded-md bg-gradient-to-r from-green-400 to-blue-500 py-4 px-9 text-center text-base font-semibold text-white transition-all duration-200 hover:opacity-80"
                                        onClick={() => handlePayment(50, 'Premium Plan')}
                                    >
                                        Purchase Plan for $50
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    

                </div>

            </div>
</div>

              
                
           
                );
}