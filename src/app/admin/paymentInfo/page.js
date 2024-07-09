'use client';
import { useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { app } from '../../../../firebase/firebase';
import Loader from '../../../../components/Loader';

const PaymentInfo = () => {
    const db = getFirestore(app);
    const [payInfo, setPayInfo] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPaymentInfo = async () => {
            const unsubscribe = onSnapshot(collection(db, 'PaymentInfo'), async (snapshot) => {
                const paymentData = await Promise.all(snapshot.docs.map(async (paymentDoc) => {
                    const payment = paymentDoc.data();
                    const userDoc = await getDoc(doc(db, 'users', payment.userId));
                    const userData = userDoc.exists() ? userDoc.data() : {};
                    return {
                        ...payment,
                        fullName: userData.fullName || 'Unknown'
                    };
                }));
                setPayInfo(paymentData);
                setLoading(false);
            });
            return unsubscribe;
        };

        fetchPaymentInfo();
    }, [db]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Payment Info
                    </h2>
                </div>
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Full Name</th>
                                <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Amount</th>
                                <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Order ID</th>
                                <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Plan Type</th>
                                <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Status</th>
                                <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">User ID</th>
                                <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payInfo.map((info, index) => (
                                <tr key={index}>
                                    <td className="text-center py-3 px-4">{info.fullName}</td>
                                    <td className="text-center py-3 px-4">{info.amount}</td>
                                    <td className="text-center py-3 px-4">{info.oid}</td>
                                    <td className="text-center py-3 px-4">{info.planType}</td>
                                    <td className="text-center py-3 px-4"><span className='bg-green-500 text-white rounded-sm'>{info.status} </span> </td>
                                    <td className="text-center py-3 px-4">{info.userId}</td>
                                    <td className="text-center py-3 px-4">{new Date(info.timestamp.toDate()).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentInfo;