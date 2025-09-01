import React from 'react'
import { Link } from 'react-router-dom'


export default function NotFound() {
  return (
    <div className='flex flex-col p-10 items-center gap-5 justify-center min-h-[80vh] text-center'>
        <h1 className='text-3xl font-mono'>Error 404</h1>
        <p>Not Found Page!!!</p>
        <p className='w-72'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis maiores delectus tempora esse in modi quasi ut. Sit dignissimos sequi adipisci. Eligendi itaque similique ipsa ad ut cumque consequatur magnam!</p>
        <Link to='/' className='btn'> Back Home</Link>
    </div>
  )
}
