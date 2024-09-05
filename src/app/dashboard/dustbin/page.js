"use client"
import { useEffect, useState } from 'react';
import SmartDustbin from '../../../../components/SmartDustbin';
import Loader from '../../../../components/Loader';
export default function Home() {
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
    <div className=' flex justify-center items-center h-screen  bg-gray-100'>
      <SmartDustbin />
    </div>
  );
}
