import React from 'react'

export const Login = () => {
  return (
    <div className='flex w-full h-full justify-center items-center  '>
        <div className='flex flex-row'>
            <div className='w-1/2'>
                <img src='https://images.unsplash.com/photo-1532043772213-09a6cec77cfa?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'></img>
            </div>
            <div className='flex flex-col w-1/2 justify-center items-center gap-6'>
             <h1>회원 가입 </h1>
             <div>구글</div>
             <div>
                <img src='/images/kakao_login_medium_wide.png'></img>
             </div>
            </div>
        </div>
    </div>
  )
}

export default Login
