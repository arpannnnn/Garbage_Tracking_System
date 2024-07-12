"use client"
import { useState, useRef } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../firebase/firebase';
import { useSession } from 'next-auth/react';
import { Camera, X, Upload } from 'lucide-react';

function PhotoUploadForm() {
    const { data: session } = useSession();
    const storage = getStorage(app);
    const db = getFirestore(app);

    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setPreview(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !description) return;

        setUploading(true);

        try {
            const storageRef = ref(storage, `photos/${file.name}`);
            await uploadBytes(storageRef, file);
            const photoURL = await getDownloadURL(storageRef);

            await addDoc(collection(db, 'posts'), {
                uid: session.user.uid,
                description,
                photoURL,
                createdAt: new Date(),
            });

            setDescription('');
            setFile(null);
            setPreview(null);
        } catch (error) {
            console.error('Error uploading photo: ', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <><div className='text-center font-bold py-2 text-4xl'> Community Board</div>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white rounded-lg shadow-md p-2">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">
                    Choose a photo
                </label>
                <div className="relative">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                        id="photo"
                        ref={fileInputRef} />
                    {preview ? (
                        <div className="relative">
                            <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                            <button
                                type="button"
                                onClick={() => {
                                    setFile(null);
                                    setPreview(null);
                                } }
                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition duration-300"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ) : (
                        <div
                            onClick={() => fileInputRef.current.click()}
                            className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 transition duration-300"
                        >
                            <Camera size={48} className="text-gray-400" />
                        </div>
                    )}
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Description
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3" />
            </div>
            <button
                type="submit"
                disabled={uploading || !file || !description}
                className={`w-full py-2 px-4 rounded-lg flex items-center justify-center ${uploading || !file || !description
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600'} text-white font-semibold transition duration-300`}
            >
                {uploading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading...
                    </>
                ) : (
                    <>
                        <Upload size={20} className="mr-2" />
                        Post
                    </>
                )}
            </button>
        </form></>
        
    );
}

export default PhotoUploadForm;