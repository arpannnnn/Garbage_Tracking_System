"use client"
import React, { useEffect, useState } from 'react'
import { AboutPage } from '../../../components/about'
import Loader from '../../../components/Loader';

function Page() {
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
        <AboutPage />
    </div>
  )
}

export default Page