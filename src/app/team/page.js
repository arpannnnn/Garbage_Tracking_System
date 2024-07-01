"use client"
import React, { useEffect, useState } from 'react'
import { TeamSection } from '../../../components/team'
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
        <TeamSection />
    </div>
  )
}

export default Page