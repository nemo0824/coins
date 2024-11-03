import React, { useEffect } from 'react'
import SearchBar from "./SearchBar"
import { RxHamburgerMenu } from "react-icons/rx";
import IconButton from './elements/IconButton';
import UserIcon from './UserIcon';
import store from '../lib/store';
import { useNavigate } from 'react-router-dom';
import Logo from './elements/Logo';

export const Header = () => {
  const {nickname, profileImage} = store.useUserStore()
  const navigate = useNavigate()
  const {clearUser} = store.useUserStore()
  // store 에서 logged 상태 사용
  const {isLogged, setIsLogged} = store.useUserLogin()
  // 로그아웃 버튼 
  const handleLogout = ()=>{
    localStorage.removeItem('accessToken')
    console.log('accessToken after logout:', localStorage.getItem('accessToken')); // 여기에서 확인
    clearUser('','')
    setIsLogged(false)
    console.log('Is Logged false여야함', isLogged);
    navigate('/')
  }
  // 로그인 페이지로 이동
  const handleLoginPage = ()=>{
    navigate('/login')
    // console.log('Is Logged:', isLogged);
    
  }

  const handleRoot = () =>{
    navigate('/')
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setIsLogged(!!accessToken); 
    console.log("useEffect에서 accessToken",!!accessToken)
  }, []);
 

  return (
    <header className='bg-neutral-700 flex flex-rox justify-between items-center min-w-[600px] h-[64px] w-full px-3 gap-1'>
      <article className='flex flex-row items-center'>
        {/* <IconButton icon={<RxHamburgerMenu size={26}></RxHamburgerMenu>} ></IconButton> */}
        <Logo handleRoot={handleRoot}/>
      </article>
      <article>
       <SearchBar/>
      </article>
      <article className='flex items-center gap-2'>
        {/* user profile */}
       
        <UserIcon profileImage={profileImage} nickname= {nickname}/>
        
        {profileImage && nickname ?
        <span className='text-white'>{nickname}님</span>
        : ''
        }
        {isLogged ? <button className='text-blue-500' onClick={handleLogout}>Logout</button> : <button className='text-red-500' onClick={handleLoginPage}>LogIn</button>}
      </article>
    </header>
  )
}

export default Header
