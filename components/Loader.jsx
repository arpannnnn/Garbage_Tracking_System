import React from 'react';

const Loader = () => {
    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-white bg-opacity-100">
            <svg  className="animate-spin h-32 w-32 text-green-500" xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 24 24"><path fill="currentColor" d="m21.82 15.42l-2.5 4.33c-.49.86-1.4 1.31-2.32 1.25h-2v2l-2.5-4.5L15 14v2h2.82l-2.22-3.85l4.33-2.5l1.8 3.12c.52.77.59 1.8.09 2.65M9.21 3.06h5c.98 0 1.83.57 2.24 1.39l1 1.74l1.73-1l-2.64 4.41l-5.15.09l1.73-1l-1.41-2.45l-2.21 3.85l-4.34-2.5l1.8-3.12c.41-.83 1.26-1.41 2.25-1.41m-4.16 16.7l-2.5-4.33c-.49-.85-.42-1.87.09-2.64l1-1.73l-1.73-1l5.14.08l2.65 4.42l-1.73-1L6.56 16H11v5H7.4a2.51 2.51 0 0 1-2.35-1.24"/></svg>
        </div>
    );
};

export default Loader;



