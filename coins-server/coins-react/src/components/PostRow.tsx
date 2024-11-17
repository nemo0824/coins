import React from 'react'
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../lib/utils';
interface PropsPost{
    category:string;
    title:string;
    author:string;
    _id:string;
    createdAt:string;
}

interface PostRowPost{
    post:PropsPost;
    index:number;
}

const PostRow = ({post, index}:PostRowPost) => {
  const navigate = useNavigate()
  
  const handleDetail = ()=>{
    navigate(`/coin/${post.category}/post/${post._id}`, {state:{post, index}})
  }


  return (
    <tr className='text-neutral-300 border-b-[1px] border-b-[rgb(41, 37, 36)] w-full cursor-pointer whitespace-nowrap' onClick={handleDetail}>
        <td className='py-1.5 px-2 max-w-[50px] truncate'>{index}</td>
        <td className='py-1.5 px-2 max-w-[100px] truncate'>{post.category}</td>
        <td className='py-1.5 px-2 max-w-[200px] truncate '>{post.title}</td>
        <td className='py-1.5 px-2 max-w-[100px] truncate'>{post.author}</td>
        <td className='py-1.5 px-2 max-w-[200px] truncate text-right'>{formatDate(post.createdAt)}</td>
    </tr>
  )
}

export default PostRow