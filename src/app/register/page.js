"use client"
import React, { useEffect, useState } from 'react'
import CustomRegister from '../../../components/register'
import Loader from '../../../components/Loader';
export default function LoginPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a data fetch
    setTimeout(() => {
      setLoading(false);
    }, 1000); // 3 seconds delay
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div> 
      <CustomRegister/>
  </div>
  )
}
