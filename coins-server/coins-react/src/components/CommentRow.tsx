import React from 'react'
import { formatDate } from '../lib/utils';
interface CommnetProps{
    // _id:string;
    author:string;
    content:string;
    createdAt:string;
}
const CommentRow = ({comment}:{comment: CommnetProps}) => {
  return (
    <div className='flex justify-around  border-b-2 border-green-500 p-1.5'>
        <div className='w-[10%]'>{comment.author}</div>
        <div className='w-[70%]'>
            <p>{comment.content}</p>
        </div>
        <div className='w-[20%]'>
            <span>{formatDate(comment.createdAt)}</span>
        </div>
    </div>
  )
}

export default CommentRow