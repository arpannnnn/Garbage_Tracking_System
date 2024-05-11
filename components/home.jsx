
import React from "react";
import Image from "next/image";
export default function Home() {
    const imageStyle = {
        borderRadius: '5%',
        border: '1px solid #fff',
    }
    return (
        <div class="w-full">
            <header class="relative w-full border-b bg-white pb-1">





            </header>
            <div class="relative w-full bg-white">
                <div class="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
                    <div class="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
                        <div class="mt-8 flex max-w-max items-center space-x-2 rounded-full bg-gray-100 p-1">
                            <div class="rounded-full bg-white p-1 px-2">
                                <p class="text-sm font-medium">GTS</p>
                            </div>
                            <p class="text-sm font-medium"> ♻️Nepal </p>
                        </div>
                        <h1 class="mt-8 text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-6xl">
                            Welcome to the Garbage Tracking System Web App!
                        </h1>
                        <p class="mt-8 text-lg text-gray-700">
                            Revolutionize waste management with our innovative web app. Track, manage, and optimize waste collection for municipalities, waste companies, and homeowners. Streamline operations, cut costs, and create a cleaner environment.
                        </p>
                        <form action="" class="mt-8 flex items-start space-x-2">

                            <div>
                                <button
                                    type="button"
                                    class="rounded-md bg-black px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                >
                                    Join Us
                                </button>
                            </div>
                        </form>
                    </div>
                    <div class="relative lg:col-span-5 lg:-mr-8 xl:col-span-6">
                        <img
                            class="aspect-[3/2] bg-gray-50 object-cover lg:aspect-[4/3] lg:h-[700px] xl:aspect-[16/9]"
                            src="/homegts.jpg"
                            style={imageStyle}
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div class="mx-auto my-32 max-w-7xl px-2 lg:px-8">
                <div class="grid grid-cols-1 gap-y-8 text-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
                    <div>
                        <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <h3 class="mt-8 text-lg font-semibold text-black">Real-time Tracking</h3>
                        <p class="mt-4 text-sm text-gray-600">
                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
                            sint. Velit officia consequat duis enim velit mollit.
                        </p>
                    </div>
                    <div>
                        <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
                            <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 64 64"><path fill="#b1bcc4" d="m4.9 24.5l3.2 25.7C8.2 57.8 18.3 64 30.7 64c12.5 0 22.6-6.2 22.6-13.8l3.2-25.7z" /><g fill="#cad5dd"><path d="m9.1 24.5l2.7 25.7c0 7.6 8.5 13.8 18.9 13.8c10.5 0 18.9-6.2 18.9-13.8l2.7-25.7z" /><ellipse cx="30.7" cy="25.2" rx="25.8" ry="11.7" /></g><ellipse cx="30.7" cy="24.5" fill="#333" rx="21.1" ry="9.6" /><path fill="#efd57f" d="M17.3 26.4c.4 3.3-4.9-3.7-6.5-1.6c-.8 1.1 3.6 6.5 3.6 6.5l11-4.9s1-8.6-.5-7c-3.6 3.8-8.3 1.4-7.6 7" /><path fill="#fee790" d="M22.8 26.4c-3.4-.5-2.4-6.2-5-5.5c-3.5.9-.9 5.3-7.2 8.1c0 0 18.1 12.4 19.6-.1c0 .1-3-6.8-4.9-6.2c-1.1.3-.2 4-2.5 3.7" /><path fill="#efd57f" d="M33.3 25.7c-.3 3.3 8.5 9.5 8.5 9.5l11.8-9.6s-3.8-1.1-5-2.6c-.8-1.1-2-4.2-4.4-3.8c-2.6.5-1.8 4.8-3.1 5.8c-1.4 1.1-7.6-1.6-7.8.7" /><path fill="#fee790" d="M48.9 20.4c-1.1-.9-14.1 8.3-14.2 8.6c-.4 2.2 5.1 2 5.8 2c-.8 4.2 13.5.1 13.8-2.2c-1.1-2.5-3-3.6-5.8-3.4c-.2 0 2.4-3.3.4-5" /><path fill="#428bc1" d="M23.6 35.5c-.8 1.1 17.2-.6 17.4-.9c1.4-1.7-3.4-4.1-4-4.5c2.9-3.3.8-4.4-3.2-3.3c.4-6.8-1.2-8.5-4.5 0c-1.2-.6-5.4-.1-6.3 2.1c-1.1 2.4 4.8 1 .6 6.6" /><path fill="#42ade2" d="M27.3 21.8c-1.8.5-1.1 12.6 1.3 13.2c-.2.3-2.5 2.8-1.5 3.6c1.6 1.4 8.9-4.7 8.6-6.5c6.8.8 9-.7.3-4.3c.7-1 3.9-4.1 1.8-5.1c-2.4-1.2-4.4 3.1-6.1 2.8c-1.5-.3-1.9-4.4-4.4-3.7" /><path fill="#b1bcc4" d="m51.7 32l-2 18.2c0 7.6-8.5 13.8-18.9 13.8c12.5 0 22.6-6.2 22.6-13.8l3-23.5c-.7 2-2.3 3.8-4.7 5.3M11.8 50.2L9.8 32c-2.4-1.5-4-3.3-4.6-5.2l3 23.5C8.2 57.8 18.3 64 30.7 64c-10.4 0-18.9-6.2-18.9-13.8" /><path fill="#cad5dd" d="M56.6 24.5c-.7-6.2-12-11.1-25.8-11.1c-13.9 0-25.1 4.9-25.8 11.1v.6c0 .5.1 1.1.2 1.6c.6 1.9 2.2 3.7 4.6 5.3l2 18.2c0 7.6 8.5 13.8 18.9 13.8c10.5 0 18.9-6.2 18.9-13.8l2-18.2c2.4-1.5 4-3.3 4.6-5.2c.2-.5.2-1.1.2-1.6v-.4zm-25.9 9.6c-11.6 0-21.1-4.3-21.1-9.6S19.1 15 30.7 15c11.6 0 21.1 4.3 21.1 9.6s-9.4 9.5-21.1 9.5" /><g fill="#7d8b91"><path d="m9.268 56.109l2.063-.392l.299 1.571l-2.063.392zm13.297-.001l2.064-.391l.298 1.572l-2.063.39z" /><path d="M13.7 52.6s4.1 3.8 11.2 4.7c0 0-.8 5.6-2.7 6.4c-3.2 1.4-12-2.7-12.6-6c-.4-1.7 4.1-5.1 4.1-5.1" /></g><path fill="#dfe9ef" d="M13.4 51s4.1 3.8 11.2 4.7c0 0-.8 5.6-2.7 6.4c-3.2 1.4-12-2.7-12.6-6c-.4-1.7 4.1-5.1 4.1-5.1" /><path fill="#fff" d="M54.4 29.9c-1.3 1.7-3.1 3-4.9 4.2c-1.9 1.1-3.9 2-5.9 2.6c-4.1 1.3-8.5 1.8-12.8 1.8c-4.3 0-8.6-.5-12.8-1.7c-2.1-.6-4.1-1.5-6-2.6c-1.8-1.1-3.6-2.5-4.8-4.3c1.5 1.5 3.4 2.6 5.2 3.4c1.9.9 3.9 1.5 5.9 1.9c4.1.9 8.2 1.2 12.4 1.2c4.2 0 8.3-.4 12.4-1.3c2-.5 4-1.1 5.9-2c1.9-.7 3.8-1.8 5.4-3.2" /><path fill="#b1bcc4" d="m58.4 14.7l.6-3.6c.6-2.9-10.8-7.4-22.1-9.6c-11.3-2.1-23.8-2.1-24.4.8l-1 3.5z" /><path fill="#cad5dd" d="m55.4 14.1l.6-3.6c.6-2.9-9.2-7.2-19.1-9C27.1-.4 16.2 0 15.5 2.9l-.9 3.5z" /><path fill="#7d8b91" d="M11.6 5.6c.5-2.4 11.4-2.4 24.4 0s23 6.4 22.5 8.8c-.5 2.4-11.5 2.4-24.4 0C21.1 12 11 8 11.6 5.6" /><path fill="#333" d="M15.8 6.6c.4-2 9.4-2 20 0s18.8 5.2 18.4 7.2c-.4 2-9.4 2-20 0c-10.6-1.9-18.8-5.2-18.4-7.2" /></svg>
                        </div>
                        <h3 class="mt-8 text-lg font-semibold text-black">
                            Bin Management
                        </h3>
                        <p class="mt-4 text-sm text-gray-600">
                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
                            sint. Velit officia consequat duis enim velit mollit.
                        </p>
                    </div>
                    <div>
                        <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                            <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 32 32"><path fill="currentColor" d="M4 2H2v26a2 2 0 0 0 2 2h26v-2H4Z" /><path fill="currentColor" d="M30 9h-7v2h3.59L19 18.59l-4.29-4.3a1 1 0 0 0-1.42 0L6 21.59L7.41 23L14 16.41l4.29 4.3a1 1 0 0 0 1.42 0l8.29-8.3V16h2Z" /></svg>
                        </div>
                        <h3 class="mt-8 text-lg font-semibold text-black">
                        Reporting and Analytics
                        </h3>
                        <p class="mt-4 text-sm text-gray-600">
                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
                            sint. Velit officia consequat duis enim velit mollit.
                        </p>
                    </div>
                    <div>
                        <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 20 20"><path fill="currentColor" d="M10 6a2 2 0 1 0 0-4a2 2 0 0 0 0 4M5.472 4.15a1.76 1.76 0 0 0-2.317.88c-.4.882-.008 1.917.877 2.31l2.671 1.19A.5.5 0 0 1 7 8.987v1.865a.5.5 0 0 1-.036.187l-1.84 4.555a1.75 1.75 0 0 0 3.244 1.311l.086-.213A5.5 5.5 0 0 1 13 9.022v-.035a.5.5 0 0 1 .297-.457l2.671-1.19a1.74 1.74 0 0 0 .877-2.31a1.76 1.76 0 0 0-2.317-.88l-1.276.569a1.04 1.04 0 0 0-.52.524a3 3 0 0 1-5.463 0a1.04 1.04 0 0 0-.52-.524zM18 14.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m-2.146-1.854a.5.5 0 0 0-.708 0L12.5 15.293l-.646-.647a.5.5 0 0 0-.708.708l1 1a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0 0-.708"/></svg>
                        </div>
                        <h3 class="mt-8 text-lg font-semibold text-black">Mobile Accessibility</h3>
                        <p class="mt-4 text-sm text-gray-600">
                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
                            sint. Velit officia consequat duis enim velit mollit.
                        </p>
                    </div>
                </div>
            </div>
            <section class="mx-auto max-w-7xl bg-gray-50 px-2 py-10 md:px-0">
                <div>
                    <div class="mx-auto max-w-2xl lg:text-center">
                        <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                            Frequently Asked Questions
                        </h2>
                        <p class="mt-4 max-w-xl text-base leading-relaxed text-gray-600 lg:mx-auto">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere,
                            assumenda
                        </p>
                    </div>
                    <div class="mx-auto mt-8 max-w-3xl space-y-4 md:mt-16">
                        <div class="cursor-pointer rounded-md border border-gray-400 shadow-lg transition-all duration-200">
                            <button
                                type="button"
                                class="flex w-full items-center justify-between px-4 py-5 sm:p-6"
                            >
                                <span class="flex text-lg font-semibold text-black">
                                    How do I get started?
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="h-5 w-5 text-gray-500"
                                >
                                    <polyline points="18 15 12 9 6 15"></polyline>
                                </svg>
                            </button>
                            <div class="px-4 pb-5 sm:px-6 sm:pb-6">
                                <p class="text-gray-500">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
                                    aliquam adipisci iusto aperiam? Sint asperiores sequi nobis
                                    inventore ratione deleniti?
                                </p>
                            </div>
                        </div>
                        <div class="cursor-pointer rounded-md border border-gray-400 transition-all duration-200">
                            <button
                                type="button"
                                class="flex w-full items-start justify-between px-4 py-5 sm:p-6 md:items-center"
                            >
                                <span class="flex text-start text-lg font-semibold text-black">
                                    What is the difference between a free and paid account?
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="hidden h-5 w-5 text-gray-500 md:block"
                                >
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </button>
                        </div>
                        <div class="cursor-pointer rounded-md border border-gray-400 transition-all duration-200">
                            <button
                                type="button"
                                class="flex w-full items-start justify-between px-4 py-5 sm:p-6 md:items-center"
                            >
                                <span class="flex text-start text-lg font-semibold text-black">
                                    What is the difference between a free and paid account?
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="hidden h-5 w-5 text-gray-500 md:block"
                                >
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <p class="textbase mt-6 text-center text-gray-600">
                        Can&#x27;t find what you&#x27;re looking for?{" "}
                        <a href="#" title="" class="font-semibold text-black hover:underline">
                            Contact our support
                        </a>
                    </p>
                </div>
            </section>
            <div class="mx-auto my-12 max-w-7xl md:my-24 lg:my-32">
                <div class="lg:grid lg:grid-cols-12 lg:gap-x-6">
                    <div class="px-4 py-10 lg:col-span-5 lg:px-0">
                        <span class="mb-8 inline-block rounded-full border p-1 px-3 text-xs font-semibold">
                            Pricing that fits your budget
                        </span>
                        <h1 class="text-3xl font-bold md:text-5xl">
                            Lorem ipsum dolor sit amet consectetur.
                        </h1>
                        <p class="mt-8 font-medium">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
                            magni, rem sed sint neque doloribus saepe veniam minima quaerat minus.
                        </p>
                        <div class="mt-8 flex w-full max-w-sm items-center space-x-2">
                            <input
                                class="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                type="email"
                                placeholder="Email"
                            />
                            <button
                                type="button"
                                class="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                    <div class="flex flex-col items-center justify-center md:flex-row lg:col-span-7">
                        <div class="w-full p-5 md:w-1/2">
                            <div class="rounded-md border bg-white bg-opacity-90">
                                <div class=" border-b">
                                    <div class="px-9 py-7">
                                        <h3 class="mb-3 text-xl font-bold leading-snug text-gray-900">
                                            Standard
                                        </h3>
                                        <p class="font-medium leading-relaxed text-gray-500">
                                            Lorem ipsum dolor sit amet, consect etur adipiscing maror.
                                        </p>
                                    </div>
                                </div>
                                <div class="px-9 pb-9 pt-8">
                                    <p class="mb-6 font-medium leading-relaxed text-gray-600">
                                        Features included:
                                    </p>
                                    <ul class="mb-11">
                                        <li class="mb-4 flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                class="mr-2"
                                            >
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                            </svg>
                                            <p class="font-semibold leading-normal">3 Team Members</p>
                                        </li>
                                        <li class="mb-4 flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                class="mr-2"
                                            >
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                            </svg>
                                            <p class="font-semibold leading-normal">1200+ UI Blocks</p>
                                        </li>
                                        <li class="mb-4 flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                class="mr-2"
                                            >
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                            </svg>
                                            <p class="font-semibold leading-normal">
                                                10 GB Cloud Storage
                                            </p>
                                        </li>
                                        <li class="mb-4 flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                class="mr-2"
                                            >
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                            </svg>
                                            <p class="font-semibold leading-normal">
                                                Individual Email Account
                                            </p>
                                        </li>
                                        <li class="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                class="mr-2"
                                            >
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                            </svg>
                                            <p class="font-semibold leading-normal">Premium Support</p>
                                        </li>
                                    </ul>
                                    <p class="mb-6 text-lg font-semibold leading-normal text-gray-600">
                                        <span>Starting from</span>
                                        <span class="ml-2 text-gray-900">$49/mo</span>
                                    </p>
                                    <div class="md:inline-block">
                                        <button
                                            type="button"
                                            class="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                        >
                                            Start your free trial
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="w-full p-5 md:w-1/2">
                            <div class="rounded-md border bg-white bg-opacity-90">
                                <div class=" border-b">
                                    <div class="px-9 py-7">
                                        <h3 class="mb-3 text-xl font-bold leading-snug text-gray-900">
                                            Standard
                                        </h3>
                                        <p class="font-medium leading-relaxed text-gray-500">
                                            Lorem ipsum dolor sit amet, consect etur adipiscing maror.
                                        </p>
                                    </div>
                                </div>
                                <div class="px-9 pb-9 pt-8">
                                    <p class="mb-6 font-medium leading-relaxed text-gray-600">
                                        Features included:
                                    </p>
                                    <ul class="mb-11">
                                        <li class="mb-4 flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                class="mr-2"
                                            >
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                            </svg>
                                            <p class="font-semibold leading-normal">3 Team Members</p>
                                        </li>
                                        <li class="mb-4 flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                class="mr-2"
                                            >
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                            </svg>
                                            <p class="font-semibold leading-normal">1200+ UI Blocks</p>
                                        </li>
                                        <li class="mb-4 flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                class="mr-2"
                                            >
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                            </svg>
                                            <p class="font-semibold leading-normal">
                                                10 GB Cloud Storage
                                            </p>
                                        </li>
                                        <li class="mb-4 flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                class="mr-2"
                                            >
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                            </svg>
                                            <p class="font-semibold leading-normal">
                                                Individual Email Account
                                            </p>
                                        </li>
                                        <li class="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                class="mr-2"
                                            >
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                            </svg>
                                            <p class="font-semibold leading-normal">Premium Support</p>
                                        </li>
                                    </ul>
                                    <p class="mb-6 text-lg font-semibold leading-normal text-gray-600">
                                        <span>Starting from</span>
                                        <span class="ml-2 text-gray-900">$49/mo</span>
                                    </p>
                                    <div class="md:inline-block">
                                        <button
                                            type="button"
                                            class="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                        >
                                            Start your free trial
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mx-auto max-w-7xl bg-gray-50 px-2 py-10 lg:px-2">
                <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div class="w-full md:w-2/3 lg:w-1/2">
                        <h2 class="text-3xl font-bold text-black">
                            Sign up for our weekly newsletter
                        </h2>
                        <p class="mt-4 text-gray-600">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at
                            ipsum eu nunc commodo posuere et sit amet ligula.
                        </p>
                        <div class="mt-4">
                            <p class="font-semibold text-gray-800">
                                Trusted by over 100,000+ businesses and individuals
                            </p>
                            <div class="mt-2 flex items-center">
                                <div class="flex space-x-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="h-5 w-5 text-yellow-400"
                                    >
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="h-5 w-5 text-yellow-400"
                                    >
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="h-5 w-5 text-yellow-400"
                                    >
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="h-5 w-5 text-yellow-400"
                                    >
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="h-5 w-5 text-yellow-400"
                                    >
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                </div>
                                <span class="ml-2 inline-block">
                                    <span class="text-sm font-semibold text-gray-800">
                                        4.8/5 . 3420 Reviews
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="mt-10 w-full md:w-2/3 lg:mt-0 lg:w-1/2">
                        <form class="flex lg:justify-center">
                            <div class="flex w-full max-w-md flex-col space-y-4">
                                <input
                                    class="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="email"
                                    placeholder="Email"
                                />
                                <button
                                    type="button"
                                    class="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                        <p class="mt-2 lg:text-center">
                            <span class="text-sm text-gray-600">
                                By signing up, you agree to our terms of service and privacy policy.
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="mx-auto mt-12 max-w-7xl">
                <footer class="px-4 py-10">
                    
                    <div class="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                        <div class="mb-8 lg:mb-0">
                            <p class="mb-6 text-lg font-semibold text-gray-700">Company</p>
                            <ul class="flex flex-col space-y-4 text-[14px] font-medium text-gray-500">
                                <li>About us</li>
                                <li>Company History</li>
                                <li>Our Team</li>
                                <li>Our Vision</li>
                                <li>Press Release</li>
                            </ul>
                        </div>
                        <div class="mb-8 lg:mb-0">
                            <p class="mb-6 text-lg font-semibold text-gray-700">Our Stores</p>
                            <ul class="flex flex-col space-y-4 text-[14px] font-medium text-gray-500">
                                <li>Washington</li>
                                <li>New Hampshire</li>
                                <li>Maine</li>
                                <li>Texas</li>
                                <li>Indiana</li>
                            </ul>
                        </div>
                        <div class="mb-8 lg:mb-0">
                            <p class="mb-6 text-lg font-semibold text-gray-700">Services</p>
                            <ul class="flex flex-col space-y-4 text-[14px] font-medium text-gray-500">
                                <li>UI / UX Design</li>
                                <li>App Development</li>
                                <li>API reference</li>
                                <li>API status</li>
                                <li>Documentation</li>
                            </ul>
                        </div>
                        <div class="mb-8 lg:mb-0">
                            <p class="mb-6 text-lg font-semibold text-gray-700">Legal</p>
                            <ul class="flex flex-col space-y-4 text-[14px] font-medium text-gray-500">
                                <li>Privacy Policy</li>
                                <li>Terms of Service</li>
                                <li>Cookie Policy</li>
                                <li>Disclaimer</li>
                                <li>Media Policy</li>
                            </ul>
                        </div>
                        <div class="mb-8 lg:mb-0">
                            <p class="mb-6 text-lg font-semibold text-gray-700">Social Links</p>
                            <ul class="flex flex-col space-y-4 text-[14px] font-medium text-gray-500">
                                <li>Facebook</li>
                                <li>Twitter</li>
                                <li>Instagram</li>
                                <li>Linkedin</li>
                                <li>YouTube</li>
                            </ul>
                        </div>
                    </div>
                </footer>
            </div>
        </div>

    );
}
