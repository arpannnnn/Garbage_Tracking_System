"use client"
import React, { useEffect, useState } from 'react'
import { CalendarDateRangePicker } from '../../../../components/date-range-picker'
import Loader from '../../../../components/Loader';

export default function Page() {
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
    <div className=' min-h-[100vh]'>
        <CalendarDateRangePicker isDriver={false} />
    </div>
  )
}