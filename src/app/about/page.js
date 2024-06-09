"use client"
import React, { useEffect, useState } from 'react'
import { AboutPage } from '../../../components/about'
import Loader from '../../../components/Loader';

function Page() {
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
        <AboutPage />
    </div>
  )
}

export default Page