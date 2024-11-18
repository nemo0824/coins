import React from 'react'
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../lib/utils';
interface PropsPost{
    category:string;
    title:string;
    author:string;
    _id:string;
    createdAt:string;
    profileImage:string;
}

interface PostRowPost{
    post:PropsPost;
    index:number;
    displayName:string;
}

const PostRow = ({post, index, displayName}:PostRowPost) => {
  const navigate = useNavigate()
  
  const handleDetail = ()=>{
    navigate(`/coin/${post.category}/post/${post._id}`, {state:{post, index}})
  }


  return (
    <tr className='text-neutral-300 border-b-[1px] border-b-[rgb(41, 37, 36)] w-full cursor-pointer whitespace-nowrap hover:bg-slate-900' onClick={handleDetail}>
        <td className='py-1.5 px-2 max-w-[50px] truncate'>{index}</td>
        <td className='py-1.5 px-2 max-w-[100px] truncate'>{displayName}</td>
        <td className='py-1.5 px-2 max-w-[200px] truncate '>{post.title}</td>
        <td className='py-1.5 px-2 max-w-[150px] truncate flex items-center gap-4'><span>{post.author}</span><img src={post.profileImage} className='rounded-full w-[36px] h-[36px]'></img></td>
        <td className='py-1.5 px-2 max-w-[150px] truncate text-right'>{formatDate(post.createdAt)}</td>
    </tr>
  )
}

export default PostRow