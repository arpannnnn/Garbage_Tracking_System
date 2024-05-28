import React from 'react';

export const Content = () => {
    return (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-2">
                <div className="flex flex-col justify-center md:pr-8 xl:pr-0 lg:max-w-lg">
                    <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-teal-accent-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 24 24"><path fill="green" d="m21.82 15.42l-2.5 4.33c-.49.86-1.4 1.31-2.32 1.25h-2v2l-2.5-4.5L15 14v2h2.82l-2.22-3.85l4.33-2.5l1.8 3.12c.52.77.59 1.8.09 2.65M9.21 3.06h5c.98 0 1.83.57 2.24 1.39l1 1.74l1.73-1l-2.64 4.41l-5.15.09l1.73-1l-1.41-2.45l-2.21 3.85l-4.34-2.5l1.8-3.12c.41-.83 1.26-1.41 2.25-1.41m-4.16 16.7l-2.5-4.33c-.49-.85-.42-1.87.09-2.64l1-1.73l-1.73-1l5.14.08l2.65 4.42l-1.73-1L6.56 16H11v5H7.4a2.51 2.51 0 0 1-2.35-1.24" /></svg>
                    </div>
                    <div className="max-w-xl mb-6">
                        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                            GTS Nepal:
                            <br className="hidden md:block" />

                            <span className="inline-block text-deep-purple-accent-400">
                                Your Partner in Clean and Green Communities.
                            </span>
                        </h2>
                        <p className="text-base text-gray-700 md:text-lg">
                            GTS Nepal is the ultimate Smart Waste Management Platform, empowering you to start instantly with User Charges Collection, Complaint Management, GPS Tracking, Fuel Management, GIS Survey & Billing, and Comprehensive Monitoring with Photographs and more!
                        </p>
                    </div>
                    <div>
                        <a
                            href="/about"
                            aria-label=""
                            className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                        >
                            Learn more
                            <svg
                                className="inline-block w-3 ml-2"
                                fill="currentColor"
                                viewBox="0 0 12 12"
                            >
                                <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                            </svg>
                        </a>
                    </div>
                </div>
                <div className="flex items-center justify-center -mx-4 lg:pl-8">
                    <div className="flex flex-col items-end px-3">
                        <img
                            className="object-cover mb-6 rounded shadow-lg h-28 sm:h-48 xl:h-56 w-28 sm:w-48 xl:w-56 transform transition-transform duration-300 hover:scale-105"
                            src="https://images.unsplash.com/photo-1608476524605-2ad765c3bd78?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                        />
                        <img
                            className="object-cover w-20 h-20 rounded shadow-lg sm:h-32 xl:h-40 sm:w-32 xl:w-40 transform transition-transform duration-300 hover:scale-105"
                            src="https://images.unsplash.com/photo-1605600659908-0ef719419d41?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                        />
                    </div>
                    <div className="px-3">
                        <img
                            className="object-cover w-40 h-40 rounded shadow-lg sm:h-64 xl:h-80 sm:w-64 xl:w-80 transform transition-transform duration-300 hover:scale-105"
                            src="https://images.unsplash.com/photo-1635691315495-ff39debe5764?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
