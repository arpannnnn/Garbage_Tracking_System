"use client";
import { useState, useEffect } from 'react';
import { getFirestore, collection, query, orderBy, onSnapshot, doc, deleteDoc, getDoc, updateDoc } from 'firebase/firestore';
import { app } from '../firebase/firebase';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Edit2, Trash2, X } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';

function PostList() {
    const { data: session } = useSession();
    const db = getFirestore(app);
    const [posts, setPosts] = useState([]);
    const [userNames, setUserNames] = useState({});
    const [editText, setEditText] = useState('');
    const [editingPostId, setEditingPostId] = useState(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false, postId: null });

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