'use client'
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

export const Testi = () => {
    const testimonials = [
        {
            name: 'Qutoof',
            position: 'Operations Manager at CleanTech Solutions',
            photo: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=1917&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ',
            feedback: '“GTS Nepal&&s platform is a game-changer. The ease of use and the ability to manage everything from user charges to GIS surveys has significantly improved our workflow. Highly recommended!”',
        },
        {
            name: 'Bahadur',
            position: 'Facilities Director at GreenCity Initiatives',
            photo: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            feedback: '“Thanks to GTS Nepal, we have better control and visibility over our waste management operations. The integration of GPS tracking and fuel management has been particularly beneficial for our team.”'
        },
        {
            name: 'Xopher',
            position: 'Logistics Coordinator at Urban Waste Solutions',
            photo: 'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            feedback: '“GTS Nepal provides an all-in-one solution that meets all our waste management needs. The platform&&s robust monitoring and reporting features have enhanced our ability to maintain high standards of cleanliness and efficiency.”.',
        },
        
    ];

    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        if (!isHovering) {
            const interval = setInterval(() => {
                setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [isHovering, testimonials.length]);

    const handleNext = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const { name, position, photo, feedback } = testimonials[currentTestimonial];

    return (
        <div>
            <section className="bg-white dark:bg-gray-900">
                <div className="max-w-6xl px-6 py-10 mx-auto">
                    <p className="text-2xl font-medium text-green-500">Our Clients</p>
                    <h1 className="mt-2 text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                        Why GTS Nepal?
                    </h1>
                    <main
                        className="relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <div className="absolute w-full bg-slate-800  -z-10 md:h-96 rounded-2xl"></div>
                        <div className="w-full p-6 md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly">
                            <Image
                                className="h-24 w-24 md:mx-6 rounded-full object-cover shadow-md md:h-[32rem] md:w-80 lg:h-[30rem] lg:w-[26rem] md:rounded-2xl"
                                src={photo}
                                width={500}
                                height={500}
                                alt={`${name} photo`}
                            />
                            <div className="mt-2 md:mx-6">
                                <div>
                                    <p className="text-xl font-medium tracking-tight text-white">{name}</p>
                                    <p className="text-blue-200">{position}</p>
                                </div>
                                <p className="mt-4 text-lg leading-relaxed text-white md:text-xl">{feedback}</p>
                                <div className="flex items-center justify-between mt-6 md:justify-start">
                                    <button
                                        title="left arrow"
                                        className="p-2 text-white transition-colors duration-300 border rounded-full rtl:-scale-x-100 hover:bg-blue-400"
                                        onClick={handlePrev}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        title="right arrow"
                                        className="p-2 text-white transition-colors duration-300 border rounded-full rtl:-scale-x-100 md:mx-6 hover:bg-blue-400"
                                        onClick={handleNext}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </section>
        </div>
    );
};
