'use client'
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const roles = ['User', 'Administrator'];

export default function CustomRegister() {
    const emailRef = useRef("");
    const passRef = useRef("");
    const confirmPassRef = useRef();
    const firstNameRef = useRef("");
    const lastNameRef = useRef("");
    const [selectedRole, setSelectedRole] = useState('');
    const router = useRouter();
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            if (emailRef.current.length === 0) return alert('Email is empty');
            if (passRef.current.length < 6) return alert('Password must not be less than 6 characters');
            if (passRef.current !== confirmPassRef.current) return alert('Passwords must match');

            const payload = {
                email: emailRef.current,
                password: passRef.current,
                firstName: firstNameRef.current,
                lastName: lastNameRef.current,
                role: selectedRole // Include the selected role in the payload
            };

            const formData = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            };

            const res = await fetch("http://localhost:3000/api/auth/register", formData);
            const resJson = await res.json();
            alert(`${resJson.message}`);
            router.push('/login');
        } catch (error) {
            alert(`${error}`);
        }
    };
    const imageStyle = {
        borderRadius: '5%',
        border: '1px solid #fff',
        width: '700px', // Adjust width as needed
        height: '700px',

    }

    return (
        <section>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="flex items-center justify-center px-2 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-4">
                    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                            Sign Up
                        </h2>
                        <form action="#" method="POST" className="mt-8">
                            <div className="space-y-5">
                                <div className="flex space-x-2">
                                    <div>
                                        <label htmlFor="" className="text-base font-medium text-gray-900">
                                            First Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                onChange={(event) => firstNameRef.current = event.target.value}
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                type="text"
                                                placeholder="First Name"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="" className="text-base font-medium text-gray-900">
                                            Last Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                onChange={(event) => lastNameRef.current = event.target.value}
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                type="text"
                                                placeholder="Last Name"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            onChange={(event) => emailRef.current = event.target.value}
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="email"
                                            placeholder="Email"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="" className="text-base font-medium text-gray-900">
                                            Password
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            onChange={(event) => passRef.current = event.target.value}
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="password"
                                            placeholder="Password"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="" className="text-base font-medium text-gray-900">
                                            Confirm Password
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            onChange={(event) => confirmPassRef.current = event.target.value}
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="password"
                                            placeholder="Password"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900">
                                        Select Your Role
                                    </label>
                                    <select
                                        onChange={(event) => setSelectedRole(event.target.value)}
                                        value={selectedRole}
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="">Select Role</option>
                                        {roles.map(role => (
                                            <option key={role} value={role}>{role}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>

                                    {/* Placeholder for latitude and longitude */}
                                    <div className='flex space-x-2 my-4'>
                                        <div >
                                            <input
                                                className="flex h-10  w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                type="text"
                                                placeholder={`Latitude: ${latitude}`}
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <input
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                type="text"
                                                placeholder={`Longitude: ${longitude}`}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            onClick={(event) => {
                                                event.preventDefault();
                                                navigator.geolocation.getCurrentPosition((position) => {
                                                    setLatitude(position.coords.latitude);
                                                    setLongitude(position.coords.longitude);
                                                });
                                            }}
                                            type="button"
                                            className="my-4 inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                        >
                                            Get Location
                                            <svg className='ml-4' xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"/></svg>
                                        </button>
                                    </div>
                                    {/* End of placeholder */}
                                    <button
                                        onClick={(event) => handleRegister(event)}
                                        type="button"
                                        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                    >
                                        Get started{' '}
                                        <svg
                                        
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="ml-4"
                                        >
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="mt-3 space-y-3">
                            <button
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
                                Sign in with Google
                            </button>
                            
                        </div>
                    </div>
                </div>
                <div className="h-full w-full mt-4 ">
                    <img
                        className="mx-auto h-full w-full rounded-md object-cover"
                        src="/GTS.jpg"

                        style={imageStyle}
                        alt=""
                    />
                </div>
            </div>
        </section>
    );
}
