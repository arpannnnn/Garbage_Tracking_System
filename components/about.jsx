import React from 'react';

export const AboutPage = () => {
    return (
        <div className='bg-white'>

            <div className="container max-w-xl p-6 py-12 mx-auto space-y-20 lg:px-8 lg:max-w-7xl">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-center sm:text-5xl text-black">Efficient Garbage Tracking System</h2>
                    <p className="max-w-3xl mx-auto mt-4 text-xl text-center text-black">"Optimize waste management with real-time tracking and data insights."</p>
                </div>
                
                <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
                    <div className="relative lg:mr-8" style={{ marginTop: '-8rem' }}>
                        <h3 className="text-2xl font-bold tracking-tight sm:text-3xl text-black">Real-time Tracking</h3>
                        <p className="mt-3 text-lg text-black">Monitor garbage collection trucks in real-time and ensure efficient route management.</p>
                    </div>
                    <div className="relative mt-10 lg:mt-0 transition-transform transform hover:scale-105 duration-300">
                        <div className="absolute inset-0 w-full h-full bg-blue-400 rounded-lg transform translate-x-2 lg:translate-x-4 translate-y-2 lg:translate-y-4"></div>
                        <img src="https://img.freepik.com/free-vector/isometric-garbage-banners_1284-9197.jpg?t=st=1716560614~exp=1716564214~hmac=b31af6faf855c8f41d49462567eba1549b45099267a93b9066a3405d62163cbd&w=740" alt="Garbage Tracking" className="relative mx-auto bg-gray-500 rounded-lg shadow-lg" />
                    </div>
                </div>
            </div>
        
            <div className='bg-gray-800 pt-2 py-2'>
                <div className="container max-w-xl p-6 py-12 mx-auto lg:px-8 lg:max-w-7xl">
                    <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
                        <div className="lg:col-start-2 mt-4">
                            <h3 className="text-2xl font-bold px-8 tracking-tight sm:text-3xl text-gray-50">Seamless Integration</h3>
                            <p className="mt-2 text-lg px-8 text-white">Integrate with existing systems and ensure smooth operations.</p>
                        </div>
                        <div className="relative mt-10 lg:mt-0 lg:col-start-1 lg:row-start-1 transition-transform transform hover:scale-105 duration-300">
                            <div className="absolute inset-0 w-full h-full bg-green-300 rounded-lg transform translate-x-2 lg:translate-x-4 translate-y-2 lg:translate-y-4"></div>
                            <img src="https://img.freepik.com/free-vector/vector-garbage-truck-isolated-white_8130-663.jpg?t=st=1716560196~exp=1716563796~hmac=42e37744888d7af9ef1ee00ee0ed0336b40c69ad9e69156e4909b48118921000&w=996" alt="Garbage Truck" className="relative mx-auto bg-gray-500 rounded-lg shadow-lg" />
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-cyan-100 '>
                <div className="container max-w-xl p-6 py-12 mx-auto space-y-24 lg:px-8 lg:max-w-7xl">
                    <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
                        <div>
                            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl text-black">Advanced Analytics</h3>
                            <p className="mt-3 text-lg text-black">Leverage advanced analytics to make data-driven decisions and optimize operations.</p>
                        </div>
                        <div className="relative mt-10 lg:mt-0 transition-transform transform hover:scale-105 duration-300">
                            <div className="absolute inset-0 w-full h-full bg-gray-700 rounded-lg transform translate-x-2 lg:translate-x-4 translate-y-2 lg:translate-y-4"></div>
                            <img src="https://img.freepik.com/free-vector/garbage-truck-concept_1284-12005.jpg?t=st=1716564896~exp=1716568496~hmac=a82ef6f48f3594413c18ded96bfa685a441847848be3f464ba7203d9192b43a9&w=740" alt="Advanced Analytics" className="relative mx-auto bg-gray-500 rounded-lg shadow-lg" />
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-blue-300 pt-2 py-2'>
                <div className="container max-w-xl p-6 py-12 mx-auto lg:px-8 lg:max-w-7xl">
                    <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
                        <div className="lg:col-start-2 mt-4">
                            <h3 className="text-2xl px-4 font-bold tracking-tight sm:text-3xl text-black">Smart Notifications</h3>
                            <p className="mt-2 text-lg px-4 text-black">Receive smart notifications and alerts to stay updated on the status of garbage collection.</p>
                        </div>
                        <div className="relative mt-10 lg:mt-0 lg:col-start-1 lg:row-start-1 transition-transform transform hover:scale-105 duration-300">
                            <div className="absolute inset-0 w-full h-full bg-gray-700 rounded-lg transform translate-x-2 lg:translate-x-6 translate-y-2 lg:translate-y-4"></div>
                            <img src="https://as2.ftcdn.net/v2/jpg/01/01/68/27/1000_F_101682732_OejrMC8RzUdpxMVmSQLhgsnTW2HQloO0.jpg" alt="Smart Notifications" className="relative mx-auto bg-gray-500 rounded-lg shadow-lg" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
