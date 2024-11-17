import React from 'react'
import { formatDate } from '../lib/utils';
import { MdDelete } from "react-icons/md";
import store from '../lib/store';
interface CommnetProps{
    _id:string;
    author:string;
    content:string;
    createdAt:string;
}
interface CommentRowProps {
    comment: CommnetProps;
    onDelete: (commentId: string) => void;  // 삭제 함수의 타입 지정
}



const CommentRow = ({comment, onDelete}:CommentRowProps) => {
    const {isLogged} = store.useUserLogin()
    const {nickname} = store.useUserStore()
  

    

  return (
    <div className='flex justify-around  border-b-2 border-green-500 p-1.5'>
        <div className='w-[10%]'>{comment.author}</div>
        <div className='w-[70%]'>
            <p>{comment.content}</p>
        </div>
        <div className='w-[20%] flex justify-end items-center'>
            <span className='whitespace-nowrap'>{formatDate(comment.createdAt)}</span>
            {nickname == comment.author && isLogged?   <span className='cursor-pointer' onClick={() => onDelete(comment._id)}><MdDelete/></span> : null}
           
        </div>
    </div>
  )
}

export default CommentRow