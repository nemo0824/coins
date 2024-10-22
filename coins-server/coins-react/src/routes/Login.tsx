import React from 'react'

export const Login = () => {
  return (
    <section className='flex flex-col justify-center items-center w-full h-full'>
      <div className='relative w-full h-full'>
        <img src='https://images.unsplash.com/photo-1651341050677-24dba59ce0fd?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        className='w-full h-full object-cover'></img>
        {/* <img src='https://images.unsplash.com/photo-1613575998061-0f59337425f2?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        className='w-auto h-auto'></img> */}
         {/* <img src='https://images.unsplash.com/photo-1640340434855-6084b1f4901c?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'></img> */}
        <h1 className='text-white absolute top-5 text-[30px] z-20'>welcome</h1>
        <p className='text-white absolute top-7'>Login</p>
        <div className='absolute bg-black opacity-40 top-0 w-full h-full'></div>
        <div className='absolute bg-gradient-to-t from-black opacity-40 top-0 w-full h-full'></div>
        <div className='absolute bottom-10 z-20'>
          <img src='/images/kakao_login_medium_wide.png' className='w-full '></img>
        </div>
      </div>
    </section>
  )
}

export default Login
