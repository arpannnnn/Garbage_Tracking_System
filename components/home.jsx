// "use client"
// import Image from 'next/image';
// import React from 'react';
// import { useEffect, useState } from 'react';

// export default function Home() {
//     const [showScrollBtn, setShowScrollBtn] = useState(false);


//     useEffect(() => {
//         const handleScroll = () => {
//             const scrollHeight = window.pageYOffset;
//             setShowScrollBtn(scrollHeight > 200);
//         };

//         window.addEventListener('scroll', handleScroll);


//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);

//     const scrollToTop = () => {
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     };
//     const imageStyle = {
//         borderRadius: '5%',
//         border: '1px solid #fff',
//     }
//     const [email, setEmail] = useState('');
//     const [isValidEmail, setIsValidEmail] = useState(false);

//     const handleEmailChange = (e) => {
//         const newEmail = e.target.value;
//         setEmail(newEmail);
//         setIsValidEmail(validateEmail(newEmail));
//     };
//     const handleSubscribeClick = () => {
//         if (isValidEmail) {
//             const emailAddress = email;
//             const subject = 'Subscribe Request';
//             const body = 'Please subscribe me to your newsletter.';

//             const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
//             window.location.href = mailtoLink;
//         } else {
//             alert('Please enter a valid email address.');
//         }
//     };
//     const validateEmail = (email) => {

//         const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return regex.test(email);
//     };
//     const [paymentDetails, setPaymentDetails] = useState(null);
//     const [planType, setPlanType] = useState('');

//     useEffect(() => {
//         if (paymentDetails) {
//             const form = document.createElement('form');
//             form.method = 'POST';
//             form.action = 'https://uat.esewa.com.np/epay/main';

//             const appendInput = (name, value) => {
//                 const input = document.createElement('input');
//                 input.type = 'hidden';
//                 input.name = name;
//                 input.value = value;
//                 form.appendChild(input);
//             };

//             appendInput('tAmt', paymentDetails.totalAmount.toFixed(2));
//             appendInput('amt', paymentDetails.amount.toFixed(2));
//             appendInput('txAmt', paymentDetails.taxAmount.toFixed(2));
//             appendInput('psc', paymentDetails.serviceCharge.toFixed(2));
//             appendInput('pdc', paymentDetails.deliveryCharge.toFixed(2));
//             appendInput('scd', 'EPAYTEST');
//             appendInput('pid', 'ee2c3ca1-696b-4cc5-a6be-2c40d929d453');
//             appendInput('su', 'http://merchant.com.np/page/esewa_payment_success');
//             appendInput('fu', 'http://localhost:3000');
            

//             document.body.appendChild(form);
//             form.submit();
//             document.body.removeChild(form);
//         }
//     }, [paymentDetails]);

//     const handlePayment = (amount) => {
//         const taxAmount = amount * 0.13; // 13% tax (adjust as needed)
//         const serviceCharge = 0; // Adjust if there's a service charge
//         const deliveryCharge = 0; // Adjust if there's a delivery charge
//         const totalAmount = amount + taxAmount + serviceCharge + deliveryCharge;
        
//         setPaymentDetails({
//             amount,
//             taxAmount,
//             serviceCharge,
//             deliveryCharge,
//             totalAmount

//         });
//     };




//     return (

//         <><div className="w-full">
//             <button
//                 id="scrollToTopBtn"
//                 className={`fixed bottom-4 right-4 z-50 ${showScrollBtn ? 'block' : 'hidden'} h-12 w-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500`}
//                 onClick={scrollToTop}
//             >
//                 <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6 mx-auto"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                 >
//                     <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M5 10l7-7m0 0l7 7m-7-7v18" />
//                 </svg>
//             </button>
//             <header className="relative w-full border-b bg-white pb-1">
//             </header>


//             <div className="flex flex-col items-center justify-center md:flex-row lg:col-span-7">
//                 <div className="w-full p-5 md:w-1/2">
//                     <div className="rounded-md border bg-white  ">
//                         <div className=" border-b  ">
//                             <div className="px-9 py-7 ">
//                                 <h3 className="mb-3 text-xl font-bold leading-snug   text-gray-900">
//                                     Basic Plan
//                                 </h3>
//                                 <p className="font-medium leading-relaxed text-gray-500">
//                                     Start managing your waste efficiently with our basic plan.
//                                 </p>
//                             </div>
//                         </div>
//                         <div className="px-9 pb-9 pt-8">
//                             <p className="mb-6 font-medium leading-relaxed text-gray-600">
//                                 Features included:
//                             </p>
//                             <ul className="mb-11">
//                                 <li className="mb-4 flex items-center">
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         width="16"
//                                         height="16"
//                                         viewBox="0 0 24 24"
//                                         fill="none"
//                                         stroke="currentColor"
//                                         strokeWidth="2"
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         className="mr-2"
//                                     >
//                                         <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
//                                         <polyline points="22 4 12 14.01 9 11.01"></polyline>
//                                     </svg>
//                                     <p className="font-semibold leading-normal">Basic Waste Tracking</p>
//                                 </li>
//                                 <li className="mb-4 flex items-center">
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         width="16"
//                                         height="16"
//                                         viewBox="0 0 24 24"
//                                         fill="none"
//                                         stroke="currentColor"
//                                         strokeWidth="2"
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         className="mr-2"
//                                     >
//                                         <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
//                                         <polyline points="22 4 12 14.01 9 11.01"></polyline>
//                                     </svg>
//                                     <p className="font-semibold leading-normal">Access to Community Updates</p>
//                                 </li>
//                             </ul>
//                             <p className="mb-6 text-lg font-semibold leading-normal text-gray-600">
//                                 <span>Starting from</span>
//                                 <span className="ml-2 text-gray-900">$19/mo </span>
//                             </p>
//                             <div className="md:inline-block">
//                                 <button
//                                     type="button"
//                                     className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
//                                     onClick={() => handlePayment(19, "basic")}
//                                 >
//                                     Get Now
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="w-full p-5 md:w-1/2">
//                     <div className="rounded-md border bg-white">
//                         <div className="border-b">
//                             <div className="px-9 py-7">
//                                 <h3 className="mb-3 text-xl font-bold leading-snug text-gray-900">
//                                     Premium Plan
//                                 </h3>
//                                 <p className="font-medium leading-relaxed text-gray-500">
//                                     Unlock advanced features with our premium plan.
//                                 </p>
//                             </div>
//                         </div>
//                         <div className="px-9 pb-9 pt-8">
//                             <p className="mb-6 font-medium leading-relaxed text-gray-600">
//                                 Features included:
//                             </p>
//                             <ul className="mb-11">
//                                 <li className="mb-4 flex items-center">
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         width="16"
//                                         height="16"
//                                         viewBox="0 0 24 24"
//                                         fill="none"
//                                         stroke="currentColor"
//                                         strokeWidth="2"
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         className="mr-2"
//                                     >
//                                         <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
//                                         <polyline points="22 4 12 14.01 9 11.01"></polyline>
//                                     </svg>
//                                     <p className="font-semibold leading-normal">Advanced Waste Tracking</p>
//                                 </li>
//                                 <li className="mb-4 flex items-center">
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         width="16"
//                                         height="16"
//                                         viewBox="0 0 24 24"
//                                         fill="none"
//                                         stroke="currentColor"
//                                         strokeWidth="2"
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         className="mr-2"
//                                     >
//                                         <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
//                                         <polyline points="22 4 12 14.01 9 11.01"></polyline>
//                                     </svg>
//                                     <p className="font-semibold leading-normal">Advanced Analytics Dashboard</p>
//                                 </li>
//                                 <li className="mb-4 flex items-center">
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         width="16"
//                                         height="16"
//                                         viewBox="0 0 24 24"
//                                         fill="none"
//                                         stroke="currentColor"
//                                         strokeWidth="2"
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         className="mr-2"
//                                     >
//                                         <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
//                                         <polyline points="22 4 12 14.01 9 11.01"></polyline>
//                                     </svg>
//                                     <p className="font-semibold leading-normal">
//                                         Automatic Pickup Scheduling
//                                     </p>
//                                 </li>
//                                 <li className="mb-4 flex items-center">
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         width="16"
//                                         height="16"
//                                         viewBox="0 0 24 24"
//                                         fill="none"
//                                         stroke="currentColor"
//                                         strokeWidth="2"
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         className="mr-2"
//                                     >
//                                         <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
//                                         <polyline points="22 4 12 14.01 9 11.01"></polyline>
//                                     </svg>
//                                     <p className="font-semibold leading-normal">
//                                         Personalized Waste Reduction Tips
//                                     </p>
//                                 </li>
//                             </ul>
//                             <p className="mb-6 text-lg font-semibold leading-normal text-gray-600">
//                                 <span>Starting from</span>
//                                 <span className="ml-2 text-gray-900">$49/mo</span>
//                             </p>
//                             <div className="md:inline-block">
//                                 <button
//                                     type="button"
//                                     className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
//                                     onClick={() => handlePayment(49, "premium")}
//                                 >
//                                     Try free for 2 month
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//             {/* </div>
//         </div> */}
//             <form id="esewaForm" action="https://uat.esewa.com.np/epay/main" method="POST" style={{ display: 'none' }}>
//                 <input value="100" name="tAmt" type="hidden" id="tAmt" />
//                 <input value="90" name="amt" type="hidden" id="amount" />
//                 <input value="5" name="txAmt" type="hidden" />
//                 <input value="2" name="psc" type="hidden" />
//                 <input value="3" name="pdc" type="hidden" />
//                 <input value="EPAYTEST" name="scd" type="hidden" />
//                 <input value="ee2c3ca1-696b-4cc5-a6be-2c40d929d453" name="pid" type="hidden" />
//                 <input value="http://merchant.com.np/page/esewa_payment_success" type="hidden" name="su" />
//                 <input value="http://localhost:3000" type="hidden" name="fu" />
//             </form></>

//     );
// }
