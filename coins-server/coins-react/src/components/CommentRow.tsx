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
  

    
    // const handleDelete = async() =>{
    //   try{
    //     const deleteData = {
    //         postId: postId,
    //         author: comment.author,
    //         content: comment.content,
    //       };
    //     await axios.delete(`http://localhost:8080/api/comments/${comment._id}`,{
    //         data:deleteData
    //     });
    //     alert("삭제 성공")
    //   }catch(error){
    //     console.error("댓글 삭제오류", error)
    //     alert("삭제 실패")
    //   }
      
    // }
  return (
    <div className='flex justify-around  border-b-2 border-green-500 p-1.5'>
        <div className='w-[10%]'>{comment.author}</div>
        <div className='w-[70%]'>
            <p>{comment.content}</p>
        </div>
        <div className='w-[20%] flex justify-end items-center'>
            <span>{formatDate(comment.createdAt)}</span>
            {nickname == comment.author && isLogged?   <span className='cursor-pointer' onClick={() => onDelete(comment._id)}><MdDelete/></span> : null}
           
        </div>
    </div>
  )
}

export default CommentRow