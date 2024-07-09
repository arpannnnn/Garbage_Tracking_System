'use client'
import React, { useState, useEffect } from 'react'
import PaymentPlan from '../../../components/paymentPlan'
import Loader from '../../../components/Loader'

export default function Page () {
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
        <PaymentPlan />
    </div>
  )
}
