"use client"
import React, { useEffect, useState } from 'react'
import  Map  from '../../../../components/map'
import Loader from '../../../../components/Loader';

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
<Map />

    </div>
  )
}

export default Page