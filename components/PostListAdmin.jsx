"use client";
import { useState, useEffect, useCallback } from 'react';
import { getFirestore, collection, query, orderBy, onSnapshot, doc, deleteDoc, getDoc, updateDoc, where, getDocs } from 'firebase/firestore';
import { app } from '../firebase/firebase';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Trash2, X } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import Loader from './Loader';

function PostListAdmin() {
    const { data: session, status } = useSession();
    const db = getFirestore(app);
    const [posts, setPosts] = useState([]);
    const [userNames, setUserNames] = useState({});
    const [Loading, setLoading] = useState(true);

    const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false, postId: null });
    const [userData, setUserData] = useState(null);

    const fetchUserName = async (uid) => {
        try {
            const userDoc = await getDoc(doc(db, 'users', uid));
            if (userDoc.exists()) {
                return userDoc.data().fullName;
            } else {
                return 'Unknown User';
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            return 'Unknown User';
        }
    };

    const getUser = useCallback(async () => {
        if (status === 'authenticated' && session?.user?.uid) {
            try {
                const q = query(collection(db, 'users'), where('uid', '==', session.user.uid));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        setUserData(doc.data());
                    });
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    }, [db, session, status]);

    useEffect(() => {
        getUser();
    }, [getUser]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
                const unsubscribe = onSnapshot(q, async (snapshot) => {
                    const postsData = await Promise.all(snapshot.docs.map(async (doc) => {
                        const postData = { id: doc.id, ...doc.data() };
                        const userName = await fetchUserName(postData.uid);
                        return { ...postData, userName };
                    }));
                    setPosts(postsData);
                    const names = {};
                    postsData.forEach(post => {
                        names[post.uid] = post.userName;
                    });
                    setUserNames(names);
                });
                return () => unsubscribe();
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [db]);

    const isAdmin = userData && userData.role === 'admin';

    const handleDelete = async (postId) => {
        if (!isAdmin) {
            console.log('Only admins can delete posts.');
            return;
        }
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
                                <h4 className="text-lg font-bold text-gray-900">{userNames[post.uid] || 'Unknown User'}</h4>
                                <p className="text-xs text-gray-500">{new Date(post.createdAt?.toDate()).toLocaleString()}</p>
                            </div>
                        </div>
                        {isAdmin && (
                            <div className="flex items-center">
                                <button
                                    onClick={() => handleDelete(post.id)}
                                    className="text-sm text-red-500 hover:text-red-700 mr-2"
                                >
                                    <Trash2 size={18} />
                                </button>

                            </div>
                        )}
                    </div>

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

export default PostListAdmin;
