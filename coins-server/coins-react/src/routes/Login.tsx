import React from 'react'

export const Login = () => {
  return (
    <section className='flex justify-center items-center h-screen p-5'>
      <div className='max-w-[500px] bg-slate-100 h-full rounded-md shadow-md'>
         <div className='p-4'>
           <h1>로그인</h1>
         </div>
         <div>
           <img src='https://images.unsplash.com/photo-1641197408799-262f1f343cc6?q=80&w=2972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'></img>
         </div>
         <div className='mt-10'></div>
         <div className='cursor-pointer flex justify-center items-chttps://images.unsplash.com/photo-1641197408799-262f1f343cc6?q=80&w=2972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Denter'>
            <img src='/images/kakao_login_medium_wide.png' alt='kakao 로그인'></img>
         </div>
      </div>
    </section>
  )
}

export default Login
