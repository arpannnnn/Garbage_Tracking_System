"use client"
import React, { useEffect, useState } from 'react'
import { TeamSection } from '../../../components/team'
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
        <TeamSection />
    </div>
  )
}

export default Page