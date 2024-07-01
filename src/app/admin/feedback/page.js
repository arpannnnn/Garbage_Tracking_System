'use client';
import { useState, useEffect } from 'react';
import {
    getFirestore,
    collection,
    onSnapshot
} from 'firebase/firestore';
import { app } from '../../../../firebase/firebase';
import Loader from '../../../../components/Loader';

const AdminFeedbackPanel = () => {
    const db = getFirestore(app);
    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
            const feedbackData = [];
            snapshot.forEach(userDoc => {
                const userData = userDoc.data();
                const userFeedback = userData.pageFeedback;
                if (userFeedback) {
                    userFeedback.forEach(feedbackItem => {
                        feedbackData.push({ 
                            ...feedbackItem, 
                            fullName: userData.fullName || 'Anonymous' 
                        });   
                    });
                }
            });
            setFeedback(feedbackData);
            setLoading(false);
        });

        
        return () => unsubscribe();
    }, [db]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">
                        User Feedback
                    </h2>
                </div>
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Full Name</th>
                                <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Rating</th>
                                <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Category</th>
                                <th className="w-1/3 py-3 px-4 uppercase font-semibold text-sm">Comment</th>
                                <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {feedback.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-100 transition duration-200 ease-in-out">
                                    <td className="w-1/6 py-3 px-4">{item.fullName}</td>
                                    <td className="w-1/6 py-3 px-4">{item.rating}</td>
                                    <td className="w-1/6 py-3 px-4">{item.category}</td>
                                    <td className="w-1/3 py-3 px-4">{item.comment}</td>
                                    <td className="w-1/6 py-3 px-4">{new Date(item.timestamp.seconds * 1000).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminFeedbackPanel;
