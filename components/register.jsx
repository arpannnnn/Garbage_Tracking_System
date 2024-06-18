"use client"
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { app } from '../firebase/firebase';
import Image from 'next/image';
import { useToast } from './ui/use-toast';
const roles = ['User', 'Staff'];

export default function CustomRegister() {

    const emailRef = useRef("");
    const passRef = useRef("");
    const confirmPassRef = useRef("");
    const fullNameRef = useRef("");
    const citizenshipRef = useRef("");
    const [selectedRole, setSelectedRole] = useState('');
    const router = useRouter();

    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');

    const auth = getAuth(app);
    const db = getFirestore(app);
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleMobileNumberChange = (event) => {
        const value = event.target.value;
        if (/^\d*$/.test(value) && value.length <= 10) {
            setMobileNumber(value);
        }
    }

    const handleCitizenshipChange = (event) => {
        let value = event.target.value.replace(/\D/g, '');
        if (value.length > 16) {
            value = value.slice(0, 16); // Only 16 digits allowed
        }
        const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        citizenshipRef.current = formattedValue;
        event.target.value = formattedValue;
    };

    const handleRegister = async (event) => {
        setLoading(true);
        event.preventDefault();


        const email = emailRef.current;
        const password = passRef.current;
        const confirmPassword = confirmPassRef.current;
        const fullName = fullNameRef.current;
        const citizenship = citizenshipRef.current;

        // Validate email and password
        if (!email) {
            toast({
                title: 'Email is empty',
                description: ' Enter a valid email',
                variant: 'destructive',
            }); setLoading(false);

        } else if (!password || password.length < 6) {
            toast({
                title: 'Password must not be less than 6 characters',
                description: 'Enter a valid password',
                variant: 'destructive',
            }); setLoading(false);

        } else if (password !== confirmPassword) {
            toast({
                title: 'Passwords must match',
                description: ' Enter the same password in both fields',
                variant: 'destructive',
            }); setLoading(false);

        }
        else {

            try {

                // // Register user using Firebase authentication
                // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                // const user = userCredential.user;

                const payload = {
                    email: email,
                    full_name: fullName,
                    citizenship: citizenship,
                    mobile_number: mobileNumber,
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude),
                    role: selectedRole,
                    password: password,
                    password2: confirmPassword
                };

                // // Store user data in Firestore
                // await setDoc(doc(db, 'users', user.uid), payload);

                // // Redirect user to login page
                // router.push('/login');
                const response = await fetch('http://127.0.0.1:8000/api/register_user/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });
                console.log(payload)
                
                if (response.ok) {
                    // Redirect user to login page
                    console.log("we are inside response.ok")
                    router.push('/login');
    
                } else {
                    console.log("we are at else")
                    const errorData = await response.json();
                    console.error('Error registering user:', errorData);
                    alert('Error registering user.');
                }
                
            } catch (error) {
                toast({
                    title: 'Error registering user. Please try again.',
                    variant: 'destructive',
                });
            } finally {
                setLoading(false);
            }
        }
    }
    const imageStyle = {
        borderRadius: '5%',
        border: '1px solid #fff',
        width: '700px',
        height: '700px',
    };


    return (
        <section>
            <div className="grid grid-cols-1 lg:grid-cols-2 bg-white">
                <div className="flex items-center justify-center px-2 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-4">
                    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                            Sign Up
                        </h2>
                        <form onSubmit={handleRegister} className="mt-8">
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="fullName" className="text-base font-medium text-gray-900">
                                        Full Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="fullName"
                                            onChange={(event) => fullNameRef.current = event.target.value}
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="Full Name"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4"></div>
                                <div>
                                    <label htmlFor="email" className="text-base font-medium text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            onChange={(event) => emailRef.current = event.target.value}
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="email"
                                            placeholder="Email"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="text-base font-medium text-gray-900">
                                            Password
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            onChange={(event) => passRef.current = event.target.value}
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="password"
                                            placeholder="Password"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="confirmPassword" className="text-base font-medium text-gray-900">
                                            Confirm Password
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="confirmPassword"
                                            onChange={(event) => confirmPassRef.current = event.target.value}
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="password"
                                            placeholder="Confirm Password"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="role" className="text-base font-medium text-gray-900">
                                        Select Your Role
                                    </label>
                                    <select
                                        id="role"
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
                                    <label htmlFor="citizenship" className="text-base font-medium text-gray-900">
                                        Citizenship Number
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="citizenship"
                                            onChange={handleCitizenshipChange}
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="Citizenship Number"
                                            maxLength="20" // 16 digits + 2 spaces
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="mobileNumber" className="text-base font-medium text-gray-900">
                                        Mobile Number
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="mobileNumber"
                                            onChange={handleMobileNumberChange}
                                            value={mobileNumber}
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="Mobile Number"
                                            maxLength="10" // Restrict the length to 10 digits
                                        />
                                    </div>
                                </div>
                                <div className='flex space-x-2 my-4'>
                                    <div >
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
                                        Get Location from here
                                        <svg className='ml-4' xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7" /></svg>
                                    </button>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className={`w-full text-white ${loading ? 'bg-gray-500' : 'bg-black hover:bg-primary-700'} focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                                        disabled={loading}
                                    >
                                        {loading ? 'Loading...' : 'Sign up'}
                                    </button>
                                </div>

                            </div>
                        </form>

                    </div>
                </div>
                <div className="h-full w-full mt-4">
                    <Image
                        className="mx-auto h-full w-full rounded-md object-cover"
                        src="/GTS.jpg"
                        width={700}
                        height={700}
                        style={imageStyle}
                        alt=""
                    />
                </div>
            </div>
        </section>
    );
}
