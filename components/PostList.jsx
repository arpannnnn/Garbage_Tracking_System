"use client"
import { useState, useEffect } from 'react';
import { getFirestore, collection, query, orderBy, onSnapshot, doc, deleteDoc, getDoc, updateDoc } from 'firebase/firestore';
import { app } from '../firebase/firebase';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Edit2, Trash2, X } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import Loader from './Loader';

function PostList() {
    const { data: session } = useSession();
    const db = getFirestore(app);
    const [posts, setPosts] = useState([]);
    const [userNames, setUserNames] = useState({});
    const [userRoles, setUserRoles] = useState({});
    const [editText, setEditText] = useState('');
    const [editingPostId, setEditingPostId] = useState(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false, postId: null });
    const [Loading, setLoading] = useState(true);
    const [payInfo, setPayInfo] = useState([]);

    const fetchUserInfo = async (uid) => {
        try {
            const userDoc = await getDoc(doc(db, 'users', uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                return {
                    fullName: userData.fullName || 'Unknown User',
                    role: userData.role || 'user'
                };
            } else {
                return { fullName: 'Unknown User', role: 'user' };
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            return { fullName: 'Unknown User', role: 'user' };
        }
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
                const unsubscribe = onSnapshot(q, async (snapshot) => {
                    const postsData = await Promise.all(snapshot.docs.map(async (doc) => {
                        const postData = { id: doc.id, ...doc.data() };
                        const { fullName, role } = await fetchUserInfo(postData.uid);
                        return { ...postData, userName: fullName, userRole: role };
                    }));
                    setPosts(postsData);
                    const names = {};
                    const roles = {};
                    postsData.forEach(post => {
                        names[post.uid] = post.userName;
                        roles[post.uid] = post.userRole;
                    });
                    setUserNames(names);
                    setUserRoles(roles);
                });
                return () => unsubscribe();
            } catch (error) {
                console.error('Error fetching posts: ', error);
            }
        };

        fetchPosts();
    }, [db]);

    const handleDelete = async (postId) => {
        setDeleteConfirmation({ show: true, postId });
    };

    const confirmDelete = async () => {
        if (!deleteConfirmation.postId) return;

        try {
            await deleteDoc(doc(db, 'posts', deleteConfirmation.postId));
            console.log('Post deleted successfully.');
            setDeleteConfirmation({ show: false, postId: null });
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const cancelDelete = () => {
        setDeleteConfirmation({ show: false, postId: null });
    };

    const handleEditDescription = async (postId, newDescription) => {
        try {
            await updateDoc(doc(db, 'posts', postId), {
                description: newDescription,
            });
            console.log('Description updated successfully.');
            setPosts(posts.map(p => p.id === postId ? { ...p, description: newDescription } : p));
            setEditingPostId(null);
        } catch (error) {
            console.error('Error updating description:', error);
        }
    };

    const startEditing = (postId, description) => {
        setEditingPostId(postId);
        setEditText(description);
    };

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

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    if (Loading) {
        return <Loader />;
    }

    return (
        <div className="space-y-6 relative">
            {posts.map((post) => (
                <div key={post.id} className="p-6 border border-gray-300 rounded-lg shadow-md bg-white">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <Avatar className="h-8 w-8">
                                <AvatarImage
                                    src='https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?t=st=1720350273~exp=1720353873~hmac=41dcf9e9b31d9e7a101f3babc322f1d2cb77bd3df19637d85f64c0e4e7c02dff&w=740'
                                    alt="User avatar"
                                />
                            </Avatar>
                            <div className="ml-4">
                                <h4 className="text-lg font-bold text-gray-900">
                                    {userNames[post.uid] || 'Unknown User'}
                                    {userRoles[post.uid] === 'admin' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="blue" width="80px" height="80px"
                                            className="inline-block w-5 h-5 ml-2 text-blue-500"
                                            viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" /></svg>
                                    )}
                                    {userRoles[post.uid] === 'staff' && (
                                        <svg width="80px" height="80px" viewBox="0 -2 20.001 20.001"
                                            className="inline-block w-5 h-5 ml-2 " xmlns="http://www.w3.org/2000/svg">
                                            <g id="truck" transform="translate(-2 -4)">
                                                <path id="secondary" fill="#2ca9bc" d="M20.24,10.81,19,10.5l-.79-2.77a1,1,0,0,0-1-.73H13V6a1,1,0,0,0-1-1H4A1,1,0,0,0,3,6V16a1,1,0,0,0,1,1H5a2,2,0,0,1,4,0h6a2,2,0,0,1,4,0h1a1,1,0,0,0,1-1V11.78A1,1,0,0,0,20.24,10.81Z" />
                                                <path id="primary" d="M5,17H4a1,1,0,0,1-1-1V6A1,1,0,0,1,4,5h8a1,1,0,0,1,1,1V17H9" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                                                <path id="primary-2" data-name="primary" d="M15,17H13V7h4.25a1,1,0,0,1,1,.73L19,10.5l1.24.31a1,1,0,0,1,.76,1V16a1,1,0,0,1-1,1H19" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                                                <path id="primary-3" data-name="primary" d="M7,15a2,2,0,1,0,2,2A2,2,0,0,0,7,15Zm10,0a2,2,0,1,0,2,2A2,2,0,0,0,17,15Z" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                                            </g>
                                        </svg>
                                    )}





                                    {payInfo.map(payment => (
                                        payment.userId === post.uid && payment.status === 'success' && (
                                            <svg
                                                key={payment.userId}
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="28"
                                                height="28"
                                                viewBox="0 0 24 24"
                                                fill="#2372af"
                                                stroke="#fafafa"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="inline-block w-6 h-6 ml-2"
                                            >
                                                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                                                <path d="m9 12 2 2 4-4" />
                                            </svg>
                                        )
                                    ))}
                                </h4>
                                <p className="text-xs text-gray-500">{new Date(post.createdAt?.toDate()).toLocaleString()}</p>
                            </div>
                        </div>
                        {session && session.user.uid === post.uid && (
                            <div className="flex items-center">
                                <button
                                    onClick={() => handleDelete(post.id)}
                                    className="text-sm text-red-500 hover:text-red-700 mr-2"
                                >
                                    <Trash2 size={18} />
                                </button>
                                {editingPostId !== post.id && (
                                    <button
                                        onClick={() => startEditing(post.id, post.description)}
                                        className="text-sm text-blue-500 hover:text-blue-700 mr-2"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                    {editingPostId === post.id ? (
                        <textarea
                            className="w-full h-auto object-cover rounded-md mb-4 border border-gray-300 p-2"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                        />
                    ) : (
                        <div className="flex flex-col items-center space-y-4">
                            <div className="max-w-lg bg-white shadow-md rounded-lg overflow-hidden w-full">
                                <Image
                                    src={post.photoURL}
                                    height={900}
                                    width={900}
                                    alt={post.description}
                                    className="w-full h-auto object-cover rounded-t-lg"
                                />
                            </div>
                            <div className="p-4">
                                <p className="text-gray-800 text-lg mb-2 ">{post.description}</p>
                            </div>
                        </div>
                    )}
                    {editingPostId === post.id && (
                        <div className="mt-2">
                            <button
                                onClick={() => handleEditDescription(post.id, editText)}
                                className="text-sm text-blue-500 hover:text-blue-700 mr-2"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => {
                                    setEditingPostId(null);
                                    setEditText('');
                                }}
                                className="text-sm text-red-500 hover:text-red-700"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            ))}

            {deleteConfirmation.show && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Confirm Deletion</h3>
                            <button onClick={cancelDelete} className="text-gray-500 hover:text-gray-700">
                                <X size={20} />
                            </button>
                        </div>
                        <p className="mb-4">Are you sure you want to delete this post? This action cannot be undone.</p>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PostList;