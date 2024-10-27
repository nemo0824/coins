import React, { useState } from 'react'
import SearchBar from "./SearchBar"
import { RxHamburgerMenu } from "react-icons/rx";
import IconButton from './elements/IconButton';
import UserIcon from './UserIcon';
import store from '../lib/store';
import useUserStore from '../lib/store'
export const Header = () => {
  const {nickname, profileImage} = store.useUserStore()
 

  return (
    <header className='bg-neutral-700 flex flex-rox justify-between items-center h-[64px] w-full px-3 gap-1'>
      <article className='flex flex-row items-center'>
        <IconButton icon={<RxHamburgerMenu size={26}></RxHamburgerMenu>} ></IconButton>
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
      </article>
    </header>
  )
}

export default Header
