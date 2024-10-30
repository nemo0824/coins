import React from 'react'
import { useNavigate } from 'react-router-dom';

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더함
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}/${month}/${day} ${hours}:${minutes}`;
};
  return (
    <tr className='text-neutral-300 border-b-[1px] border-b-[rgb(41, 37, 36)] w-full cursor-pointer' onClick={handleDetail}>
        <td className='py-1.5 px-2 max-w-[50px] truncate'>{index}</td>
        <td className='py-1.5 px-2 max-w-[100px] truncate'>{post.category}</td>
        <td className='py-1.5 px-2 max-w-[200px] truncate '>{post.title}</td>
        <td className='py-1.5 px-2 max-w-[100px] truncate'>{post.author}</td>
        <td className='py-1.5 px-2 max-w-[200px] truncate'>{formatDate(post.createdAt)}</td>
    </tr>
  )
}

export default PostRow