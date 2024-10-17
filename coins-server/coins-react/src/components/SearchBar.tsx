import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import useSearchState from '../lib/store';

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useSearchState();
  return (
    <>
 
        <div className='flex flex-row items-center h-[35px] min-w-[400px] rounded-2xl bg-[rgba(0,0,0,0.14)] gap-2 px-[16px]' >
          <input 
            type='text' 
            className='bg-transparent w-full h-full relative' 
            placeholder='검색하세요'
            onChange={(e)=>{setSearchTerm(e.currentTarget.value)}}
            />
          <div className='text-white cursor-pointer'><FiSearch size={24}/></div>
        </div>
    
      </>
  )
}
// searchTerm에 디바운싱 으로 디벨롭할것

export default SearchBar