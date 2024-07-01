"use client"
import React, { useState, useEffect } from 'react'
import HomePage from '../../components/home'
import Loader from '../../components/Loader'
import { Content } from '../../components/ok'
import { Testi } from '../../components/testi'
export default function HeroPage() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setTimeout(() => {
      setLoading(false);
    }, 3000);
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
