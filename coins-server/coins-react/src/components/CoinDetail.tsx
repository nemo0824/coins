import React from 'react'
import { CoinChart } from './CoinChart'
import { useLocation} from 'react-router-dom'
import Post from './Post'
import { IoBarChart } from "react-icons/io5";
import { LuClipboardEdit } from "react-icons/lu";
const CoinDetail = () => {
  const location = useLocation()
  const {displayName} = location.state
  return (
    <div>
      <div className='p-6'>
      <div className='mb-4'></div>
      <h1 className='text-slate-100 text-[24px] flex items-center gap-3' ><IoBarChart></IoBarChart>{displayName} 차트</h1>
      <div className='mb-4'></div>
      <CoinChart></CoinChart>
      <div className='mb-6'></div>
      <h1 className='text-slate-100 text-[24px] flex items-center gap-3'><LuClipboardEdit></LuClipboardEdit>{displayName} 게시판</h1>
      <div className='mb-4'></div>
      <Post category={displayName}></Post>
      </div>
    </div>
  )
}

export default CoinDetail