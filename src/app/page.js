"use client"
import React, { useState, useEffect } from 'react'
import HomePage from '../../components/home'
import  Loader  from '../../components/Loader'
import { Content } from '../../components/ok'
import { Testi } from '../../components/testi'
export default function HeroPage() {

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
      <HomePage />


      <div>

        <Content />
        <Testi />

      </div>
    </div>
  )
}
