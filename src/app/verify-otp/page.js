"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { app } from '../../../firebase/firebase';
import { useToast } from '../../../components/ui/use-toast';

export default function OTPVerification() {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [registrationData, setRegistrationData] = useState(null);
    const router = useRouter();
    const { toast } = useToast();
    const auth = getAuth(app);
    const db = getFirestore(app);

    useEffect(() => {
        const data = localStorage.getItem('registrationData');
        if (data) {
            setRegistrationData(JSON.parse(data));
        } else {
            router.push('/register');
        }
    }, [router]);

    useEffect(() => {
        if (registrationData) {
            sendOTP(registrationData.email);
        }
    }, [registrationData]);

    const sendOTP = async (email) => {
        try {
            const response = await fetch('/api/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            if (response.ok) {
                toast({
                    title: 'OTP Sent',
                    description: 'Please check your email for the OTP.',
                    variant: 'success',
                });
            } else {
                throw new Error(data.error || 'Failed to send OTP');
            }
        } catch (error) {
            toast({
                title: 'Error sending OTP',
                description: error.message,
                variant: 'destructive',
            });
        }
    };

    const handleVerify = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: registrationData.email, otp })
            });
            const data = await response.json();

            if (data.success) {
                // If OTP is correct, create user account
                const { email, password, fullName, citizenship, mobileNumber, latitude, longitude, role } = registrationData;
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                const payload = {
                    email: user.email,
                    fullName,
                    citizenship,
                    mobileNumber,
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude),
                    role,
                    uid: user.uid,
                };

                // Store user data in Firestore
                await setDoc(doc(db, 'users', user.uid), payload);

                // Clear registration data from local storage
                localStorage.removeItem('registrationData');

                toast({
                    title: 'Registration successful',
                    description: 'Your account has been created.',
                    variant: 'success',
                });

                // Redirect user to login page
                router.push('/login');
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            setOtp('');
            toast({
                title: 'Error verifying OTP',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = () => {
        if (registrationData) {
            sendOTP(registrationData.email);
        }
    };

    if (!registrationData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                <h3 className="text-2xl font-bold text-center">Verify OTP</h3>
                <form onSubmit={handleVerify}>
                    <div className="mt-4">
                        <label className="block" htmlFor="otp">OTP</label>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-baseline justify-between mt-4">
                        <button
                            type="submit"
                            className={`px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                        <button
                            type="button"
                            onClick={handleResendOTP}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Resend OTP
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}