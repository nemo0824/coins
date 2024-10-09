import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { RxHamburgerMenu } from "react-icons/rx";
import IconButton from './elements/IconButton';
export const Header = () => {
  return (
    <header className='bg-neutral-700 flex flex-rox justify-between items-center h-[64px]  px-3'>
      <article className='flex flex-row items-center'>
        <IconButton icon={<RxHamburgerMenu size={26}></RxHamburgerMenu>} ></IconButton>
      </article>
      <article>
        <div className='flex flex-row items-center h-[35px] min-w-[400px] rounded-2xl bg-[rgba(0,0,0,0.14)] gap-2 px-[16px]' >
          <input type='text' className='bg-transparent w-full h-full relative' placeholder='검색하세요'></input>
          <div className='text-white cursor-pointer'><FiSearch size={24}/></div>
        </div>
      </article>
      <article>프로필</article>
    </header>
  )
}

export default Header
