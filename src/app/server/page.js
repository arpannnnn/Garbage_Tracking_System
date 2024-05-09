
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function ServerPage() {
  const session = await getServerSession(authOptions);
  return (
    <div className='m=10'>
      <h1 className='text 2-xl font-bold'>Congratulations!! <span className='text-blue-700'>welcome to the server page</span></h1>
      <div>
       
        {JSON.stringify(session)}
      </div>
    </div>
  )
}
