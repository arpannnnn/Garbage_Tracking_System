'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
export default function ClientPage() {
   const {data:session} = useSession();
  return (
    <div className='m-10'>
      {JSON.stringify(session)}
    </div>
  )
}
