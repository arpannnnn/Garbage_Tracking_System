"use client"
import { useEffect, useState } from 'react';
import SmartDustbin from '../../../../components/smartDustbin';
import Loader from '../../../../components/Loader';
export default function Home() {
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
        <div className=' flex justify-center items-center h-screen  bg-gray-100'>
            <SmartDustbin />
        </div>
    );
}
