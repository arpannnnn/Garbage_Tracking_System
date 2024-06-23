"use client"
import React, { useState,useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { db } from '../../../../firebase/firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { FrownIcon, MehIcon, SmileIcon, HeartIcon,Laugh } from 'lucide-react';

const PageFeedbackForm = () => {
    const { data: session, status } = useSession();
    const [rating, setRating] = useState(null);
    const [category, setCategory] = useState('');
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const feedbackCategories = [
        'User Interface',
        'Performance',
        'Content',
        'Functionality',
        'Other'
    ];
    useEffect(() => {
        let timer;
        if (success) {
            timer = setTimeout(() => {
                setSuccess(false);
            }, 3000); 
        }
        return () => clearTimeout(timer);
    }, [success]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (status !== 'authenticated') {
            alert('You must be logged in to submit feedback');
            return;
        }

        setLoading(true);
        try {
            const userRef = doc(db, 'users', session.user.uid);
            await updateDoc(userRef, {
                pageFeedback: arrayUnion({ rating, category, comment, timestamp: new Date() }),
            });
            setLoading(false);
            setSuccess(true);
            setRating(null);
            setCategory('');
            setComment('');
        } catch (error) {
            console.error('Error submitting feedback: ', error);
            setLoading(false);
        }
    };

    const faces = [
        { icon: FrownIcon, value: 'very_negative', color: 'text-red-500', label: 'Very Poor' },
        { icon: MehIcon, value: 'negative', color: 'text-orange-500', label: 'Poor' },
        { icon: SmileIcon, value: 'neutral', color: 'text-yellow-500', label: 'Average' },
        { icon: Laugh, value: 'positive', color: 'text-green-500', label: 'Good' },
        { icon: HeartIcon, value: 'very_positive', color: 'text-pink-500', label: 'Excellent' }
    ];

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-8 border mt-6 border-gray-200">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">GTS Feedback</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 text-lg font-medium mb-3">How was your experience?</label>
                    <div className="flex justify-between items-center">
                        {faces.map(({ icon: Icon, value, color, label }) => (
                            <div key={value} className="flex flex-col items-center">
                                <button
                                    type="button"
                                    className={`p-2 rounded-full transition-all duration-200 ${
                                        rating === value ? `${color} bg-gray-100 scale-110` : 'text-gray-400 hover:scale-105'
                                    }`}
                                    onClick={() => setRating(value)}
                                >
                                    <Icon size={36} />
                                </button>
                                <span className="text-xs mt-1 text-gray-600">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 text-lg font-medium mb-3">Please select a feedback category:</label>
                    <select
                        className="w-full border border-gray-300 p-2 rounded-lg text-gray-700"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Select a category</option>
                        {feedbackCategories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 text-lg font-medium mb-3">Any additional comments?</label>
                    <textarea
                        className="w-full border border-gray-300 p-3 rounded-lg text-gray-700 resize-none"
                        rows="4"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Tell us more about your experience..."
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-300 text-lg font-semibold"
                    disabled={loading || !rating || !category}
                >
                    {loading ? 'Submitting...' : 'Submit Feedback'}
                </button>
            </form>
            {success && (
                <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    <p className="text-center font-medium">Thank you for your valuable feedback!</p>
                </div>
            )}
        </div>
    );
};

export default PageFeedbackForm;