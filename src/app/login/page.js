"use client"
import React, { useEffect, useState } from 'react'
import CustomLogin from '../../../components/login'
import Loader from '../../../components/Loader';
export default function LoginPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    setTimeout(() => {
      setLoading(false);
    }, 1000); 
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div> 
      <CustomLogin/>
  </div>
  )
}
