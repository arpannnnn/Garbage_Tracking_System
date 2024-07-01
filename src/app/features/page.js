"use client"
import React, { useEffect, useState } from 'react'
import Grid from '../../../components/grid'
import Loader from '../../../components/Loader';
export default function FeaturePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a data fetch
    setTimeout(() => {
      setLoading(false);
    }, 2000); // 3 seconds delay
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
        <Grid />
    </div>
  )
}
