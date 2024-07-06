"use client"
import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getFirestore, collection, query, where, getDocs, Timestamp, runTransaction, doc } from 'firebase/firestore';
import { app } from '../../../firebase/firebase';
import confetti from 'canvas-confetti';

const db = getFirestore(app);

export default function Success() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isSaved, setIsSaved] = useState(false);
    const savingRef = useRef(false);

    useEffect(() => {
        const savePaymentDetails = async (oid, status, planType, amount, userId) => {
            if (savingRef.current || isSaved) {
                console.log('Payment details already saved or in progress for OID:', oid);
                return;
            }

            savingRef.current = true;

            try {
                console.log('Saving payment details for OID:', oid);

                await runTransaction(db, async (transaction) => {
                    const paymentRef = collection(db, 'PaymentInfo');
                    const paymentQuery = query(paymentRef, where('oid', '==', oid));
                    const querySnapshot = await getDocs(paymentQuery);

                    if (!querySnapshot.empty) {
                        querySnapshot.forEach((doc) => {
                            console.log('Updating existing payment document:', doc.id);
                            transaction.update(doc.ref, {
                                status: status,
                                timestamp: Timestamp.now(),
                                planType: planType,
                                amount: parseFloat(amount),
                                userId: userId,
                            });
                        });
                    } else {
                        console.log('Creating new payment record for OID:', oid);
                        const newDocRef = doc(paymentRef, oid);
                        transaction.set(newDocRef, {
                            oid: oid,
                            status: status,
                            timestamp: Timestamp.now(),
                            planType: planType,
                            amount: parseFloat(amount),
                            userId: userId,
                        });
                    }
                });

                console.log('Payment details saved successfully for OID:', oid);
                setIsSaved(true);
            } catch (error) {
                console.error('Error saving/updating payment details:', error);
            } finally {
                savingRef.current = false;
            }
        };

        const handlePaymentSuccess = (oid, planType, amount, userId) => {
            if (window.opener) {
                window.opener.postMessage({ status: 'success', oid: oid }, '*');
                window.close();
            } else {
                // Clear URL parameters
                router.replace('/success', undefined, { shallow: true });

                console.log('Payment successful, OID:', oid);
                savePaymentDetails(oid, 'success', planType, amount, userId);
                
                // Trigger confetti effect
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        };

        const handleSuccessEvent = (event) => {
            const { status, oid, planType, amount, userId } = event.data;
            if (status === 'success' && oid && planType && amount && userId) {
                handlePaymentSuccess(oid, planType, amount, userId);
            }
        };

        window.addEventListener('message', handleSuccessEvent);

        const oidParam = searchParams.get('oid');
        const planType = searchParams.get('planType');
        const amount = searchParams.get('amount');
        const userId = searchParams.get('userId');

        console.log('Received parameters:', { oidParam, planType, amount, userId });

        if (oidParam && planType && amount && userId && !isSaved && !savingRef.current) {
            const oid = oidParam.split('&')[0];
            handlePaymentSuccess(oid, planType, amount, userId);
        }

        return () => {
            window.removeEventListener('message', handleSuccessEvent);
        };
    }, [searchParams, isSaved, router]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 font-sans">
            <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-md w-11/12">
                <div className="text-green-500 text-6xl mb-4">✓</div>
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
                <p className="text-gray-600 mb-6">Thank you for your purchase. Your transaction has been completed successfully.</p>
                <button 
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                    onClick={() => router.push('/dashboard')}
                >
                    Go to Dashboard
                </button>
            </div>
        </div>
    );
}