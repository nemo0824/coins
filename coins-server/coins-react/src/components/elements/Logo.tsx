import React from 'react'

const Logo = ({handleRoot}:{handleRoot:()=>void}) => {
  return (
    <div className='overflow-hidden rounded-2xl min-w-[50px] h-[40px] cursor-pointer' onClick={handleRoot}>
        <img src='/images/Logo.jpg' alt='Logo' className='w-full h-full object-cover'></img>
    </div>
  )
}

export default Logo