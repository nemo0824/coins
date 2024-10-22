import React, { useState } from 'react'
import SearchBar from "./SearchBar"
import { RxHamburgerMenu } from "react-icons/rx";
import IconButton from './elements/IconButton';
import { Avatar } from './ui/avatar';
import UserIcon from './UserIcon';

export const Header = () => {
  
 

  return (
    <header className='bg-neutral-700 flex flex-rox justify-between items-center h-[64px]  px-3 gap-2'>
      <article className='flex flex-row items-center'>
        <IconButton icon={<RxHamburgerMenu size={26}></RxHamburgerMenu>} ></IconButton>
      </article>
      <article>
       <SearchBar/>
      </article>
      <article >
        {/* user profile */}
        <UserIcon/>
        
      </article>
    </header>
  )
}

export default Header
