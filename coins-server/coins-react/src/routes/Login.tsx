import axios from 'axios';
import { response } from 'express';
import { link } from 'fs'
import React, { useState } from 'react'

const Login = () => {
  const [kakaoAuthUrl, setKakaoAuthUrl] = useState('')
  const handleKakaoLogin = () => {
    window.location.href = kakaoAuthUrl; // URL로 리디렉션
  };

  const getKakaUrl = ()=>{
    axios.get('http://localhost:8080/api/auth/kakao-login').then(response => setKakaoAuthUrl(response.data))
    
  }
  return (
    <section className='flex flex-col justify-center items-center min-w-screen min-h-screen overflow-y-hidden' >
      <div className='relative h-full min-w-[550px] w-full'>
        <img src='https://images.unsplash.com/photo-1651341050677-24dba59ce0fd?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        className='w-full h-full object-cover'></img>
        {/* <img src='https://images.unsplash.com/photo-1613575998061-0f59337425f2?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        className='w-auto h-auto'></img> */}
         {/* <img src='https://images.unsplash.com/photo-1640340434855-6084b1f4901c?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'></img> */}
        {/* <div className='absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'></div>
        <div className='absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'></div> */}
        <div className='absolute bg-black opacity-40 top-0 w-full h-full'></div>
        <div className='absolute bg-gradient-to-t from-black opacity-40 top-0 w-full h-full'></div>

        <div className='z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <div className='flex flex-col justify-center gap-4'>
            <h1 className='text-white text-[30px] text-center'>Check Dreams</h1>
            <h1 className='text-white text-[30px] text-center'>Login</h1>
            <div onClick={handleKakaoLogin}>
              <img src='/images/kakao_login_medium_wide.png' className='w-full cursor-pointer'></img>
            </div>
          </div>  
        
        </div>
      </div>
    </section>
  )
}

export default Login
