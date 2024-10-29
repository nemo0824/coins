import React from 'react'
import { useNavigate } from 'react-router-dom';

interface PropsPost{
    category:string;
    title:string;
    author:string;
    _id:string;
}

interface PostRowPost{
    post:PropsPost;
    index:number;
}

const PostRow = ({post, index}:PostRowPost) => {
  const navigate = useNavigate()
  
  const handleDetail = ()=>{
    navigate(`/coin/${post.category}/post/${post._id}`)
  }
  return (
    <tr className='text-[#FAFAF9] border-b-[1px] border-b-[rgb(41, 37, 36)] w-full cursor-pointer' onClick={handleDetail}>
        <td className='py-1.5 px-2'>{index}</td>
        <td className='py-1.5 px-2'>{post.category}</td>
        <td className='py-1.5 px-2'>{post.title}</td>
        <td className='py-1.5 px-2'>{post.author}</td>
    </tr>
  )
}

export default PostRow