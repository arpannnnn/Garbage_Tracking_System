'use client'
import React, { useState } from 'react'
export const TeamSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.email && formData.message) {
            alert('Thanks For submitting!');
            // Optionally,we can reset the form after submission
            setFormData({
                name: '',
                email: '',
                message: ''
            });
        } else {
            alert('Please fill out all fields.');
        }
    }

    return (

        <div>
            <section className="py-6 bg-gray-800 dark:bg-gray-100 text-gray-100 dark:text-gray-800">
                <div className="container flex flex-col items-center  justify-center p-4 mx-auto sm:p-10">
                    <p className="p-2 text-sm font-medium tracking-wider text-center uppercase">Development team</p>
                    <h1 className="text-4xl font-bold leading-none text-center sm:text-5xl">"The talented people behind the scenes"</h1>
                    <div className="flex  flex-row flex-wrap-reverse  justify-center mt-8">
                        <div className="flex flex-col justify-center   w-full px-8 mx-6 my-12 text-center rounded-md md:w-96 lg:w-80 xl:w-64 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
                            <img alt="" className="self-center flex-shrink-0 w-24 h-24 -mt-12 bg-center bg-cover rounded-full bg-gray-500 dark:bg-gray-500" src="https://scontent.fktm10-1.fna.fbcdn.net/v/t39.30808-6/405741399_3716905368541236_3288495521380446542_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=QsBuaYy3ecAQ7kNvgEcVELk&_nc_ht=scontent.fktm10-1.fna&oh=00_AYCJ1mLxUOORlKrVSnPjZ_wW8PdyCbG2o3ZyAyMTS3dLPg&oe=6658F635" />
                            <div className="flex-1 my-4">
                                <p className="text-xl font-semibold leading-snug">Arpan Acharya</p>
                                <p>IT Engineer</p>
                            </div>
                            <div className="flex items-center justify-center p-3 space-x-3 border-t-2">
                                <a rel="noopener noreferrer" href="#" title="Email" className="text-gray-900 dark:text-gray-50 hover:text-violet-400 hover:dark:text-violet-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                    </svg>
                                </a>
                                <a rel="noopener noreferrer" href="#" title="Twitter" className="text-gray-900 dark:text-gray-50 hover:text-violet-400 hover:dark:text-violet-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                                        <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
                                    </svg>
                                </a>
                                <a rel="noopener noreferrer" href="#" title="LinkedIn" className="text-gray-900 dark:text-gray-50 hover:text-violet-400 hover:dark:text-violet-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-5 h-5">
                                        <path d="M8.268 28h-5.805v-18.694h5.805zM5.362 6.756c-1.856 0-3.362-1.538-3.362-3.394s1.505-3.362 3.362-3.362 3.362 1.505 3.362 3.362c0 1.856-1.506 3.394-3.362 3.394zM29.994 28h-5.792v-9.1c0-2.169-0.044-4.95-3.018-4.95-3.018 0-3.481 2.356-3.481 4.794v9.256h-5.799v-18.694h5.567v2.55h0.081c0.775-1.469 2.668-3.019 5.492-3.019 5.875 0 6.955 3.869 6.955 8.894v10.269z"></path>
                                    </svg>
                                </a>
                                <a rel="noopener noreferrer" href="#" title="GitHub" className="text-gray-900 dark:text-gray-50 hover:text-violet-400 hover:dark:text-violet-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-5 h-5">
                                        <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center w-full px-8 mx-6 my-12 text-center rounded-md md:w-96 lg:w-80 xl:w-64 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
                            <img alt="" className="self-center flex-shrink-0 w-24 h-24  -mt-12 bg-center bg-cover rounded-full bg-gray-500 dark:bg-gray-500" src="https://scontent.fktm7-1.fna.fbcdn.net/v/t1.6435-9/45063101_1147598905394387_7575579748953227264_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=nnnm-I0D_BQQ7kNvgFUBAN9&_nc_ht=scontent.fktm7-1.fna&oh=00_AYDP-QG1_HTM21_UkDPSdTeH6of3Kd4ZK4w3iXegDUUm2A&oe=667A9CB6" />
                            <div className="flex-1 my-4">
                                <p className="text-xl font-semibold leading-snug">Binay Rijal</p>
                                <p>IT Engineer</p>
                            </div>
                            <div className="flex items-center justify-center p-3 space-x-3 border-t-2">
                                <a rel="noopener noreferrer" href="#" title="Email" className="text-gray-900 dark:text-gray-50 hover:text-violet-400 hover:dark:text-violet-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                    </svg>
                                </a>
                                <a rel="noopener noreferrer" href="#" title="Twitter" className="text-gray-900 dark:text-gray-50 hover:text-violet-400 hover:dark:text-violet-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                                        <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
                                    </svg>
                                </a>
                                <a rel="noopener noreferrer" href="#" title="LinkedIn" className="text-gray-900 dark:text-gray-50 hover:text-violet-400 hover:dark:text-violet-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-5 h-5">
                                        <path d="M8.268 28h-5.805v-18.694h5.805zM5.362 6.756c-1.856 0-3.362-1.538-3.362-3.394s1.505-3.362 3.362-3.362 3.362 1.505 3.362 3.362c0 1.856-1.506 3.394-3.362 3.394zM29.994 28h-5.792v-9.1c0-2.169-0.044-4.95-3.018-4.95-3.018 0-3.481 2.356-3.481 4.794v9.256h-5.799v-18.694h5.567v2.55h0.081c0.775-1.469 2.668-3.019 5.492-3.019 5.875 0 6.955 3.869 6.955 8.894v10.269z"></path>
                                    </svg>
                                </a>
                                <a rel="noopener noreferrer" href="#" title="GitHub" className="text-gray-900 dark:text-gray-50 hover:text-violet-400 hover:dark:text-violet-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-5 h-5">
                                        <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center w-full px-8 mx-6 my-12 text-center rounded-md md:w-96 lg:w-80 xl:w-64 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
                            <img alt="" className="self-center flex-shrink-0 w-24 h-24 -mt-12 bg-center bg-cover rounded-full bg-gray-500 dark:bg-gray-500" src="https://scontent.fktm10-1.fna.fbcdn.net/v/t39.30808-1/263466540_137729135284412_8858117032975631302_n.jpg?stp=c0.9.200.200a_dst-jpg_p200x200&_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=KNFA7l3fsV0Q7kNvgGOOa-1&_nc_ht=scontent.fktm10-1.fna&oh=00_AYBzfTkfdL5-lU4xbtyTA8Woup9FuETqpTeQhRfZq2qGBw&oe=6659077F" />
                            <div className="flex-1 my-4">
                                <p className="text-xl font-semibold leading-snug">Smreeta Shrestha </p>
                                <p>IT Engineer</p>
                            </div>
                            <div className="flex items-center justify-center p-3 space-x-3 border-t-2">
                                <a rel="noopener noreferrer" href="#" title="Email" className="text-gray-900 dark:text-gray-50 hover:text-violet-400 hover:dark:text-violet-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                    </svg>
                                </a>
                                <a rel="noopener noreferrer" href="#" title="Twitter" className="text-gray-900 dark:text-gray-50 hover:text-violet-400 hover:dark:text-violet-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                                        <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
                                    </svg>
                                </a>
                                <a rel="noopener noreferrer" href="#" title="LinkedIn" className="text-gray-900 dark:text-gray-50 hover:text-violet-400 hover:dark:text-violet-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-5 h-5">
                                        <path d="M8.268 28h-5.805v-18.694h5.805zM5.362 6.756c-1.856 0-3.362-1.538-3.362-3.394s1.505-3.362 3.362-3.362 3.362 1.505 3.362 3.362c0 1.856-1.506 3.394-3.362 3.394zM29.994 28h-5.792v-9.1c0-2.169-0.044-4.95-3.018-4.95-3.018 0-3.481 2.356-3.481 4.794v9.256h-5.799v-18.694h5.567v2.55h0.081c0.775-1.469 2.668-3.019 5.492-3.019 5.875 0 6.955 3.869 6.955 8.894v10.269z"></path>
                                    </svg>
                                </a>
                                <a rel="noopener noreferrer" href="#" title="GitHub" className="text-gray-900 dark:text-gray-50 hover:text-violet-400 hover:dark:text-violet-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-5 h-5">
                                        <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>



                    </div>
                </div>
            </section>
            <section className="text-black bg-cyan-100 body-font relative ">
                <div className="container px-5 py-20 mx-auto flex sm:flex-nowrap flex-wrap ">
                    <div className="lg:w-2/3 md:w-1/2 bg-cyan-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative ">
                        <iframe width="100%" height="100%" className="absolute inset-0" frameborder="0" title="map" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=Nepal&ie=UTF8&t=&z=7&iwloc=B&output=embed"></iframe>
                        <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md">
                            <div className="lg:w-1/2 px-6">
                                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">ADDRESS</h2>
                                <p className="mt-1">Ghorahi Dang 11, Nepal </p>
                            </div>
                            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">EMAIL</h2>
                                <a className="text-indigo-500 leading-relaxed">arpannacharya@gmail.com</a>
                                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">PHONE</h2>
                                <p className="leading-relaxed">+977-9866742214</p>
                            </div>
                        </div>
                    </div>

                    <div classNameName="lg:w-1/3 md:w-1/2 bg-white flex flex-col   md:ml-auto w-full md:py-8 mt-8 px-6   md:mt-0">
                        <h2 classNameName="text-gray-900 text-bold mb-1   text-4xl font-bold leading-none">Feedback</h2>
                        <p classNameName="leading-relaxed mb-5 text-gray-600">Drop us a line with any questions, inquiries or business proposals</p>
                        <form onSubmit={handleSubmit}>
                            <div className="relative mb-4">
                                <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required />
                            </div>
                            <div className="relative mb-4">
                                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required />
                            </div>
                            <div className="relative mb-4">
                                <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
                                <textarea id="message" name="message" value={formData.message} onChange={handleChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" required></textarea>
                            </div>
                            <button type="submit" className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Send Now</button>
                        </form>
                    </div>

                </div>
            </section>
        </div>
    )
}
