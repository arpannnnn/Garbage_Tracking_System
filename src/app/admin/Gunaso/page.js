import React from 'react';
import PostListAdmin from '../../../../components/PostListAdmin';
import PostList from '../../../../components/PostList';
import PhotoUploadForm from '../../../../components/PhotoUploadForm';
const GunasoPage = () => {
    return (
        <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">

            <div className="max-w-4xl w-full p-8 overflow-y-auto">
                <PhotoUploadForm/>

                <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Photo Feed</h2>
                <PostListAdmin />
            </div>
        </div></>
    );
}

export default GunasoPage;
