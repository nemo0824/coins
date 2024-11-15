import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CommentRow from './CommentRow'
import store from '../lib/store'

const Comment = ({postId}:{postId:string}) => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const {nickname} = store.useUserStore()
// 댓글 작성
  const handleSubmitComment = async()=>{
     try{
        const response = await axios.post(`http://localhost:8080/api/comments`, {
          postId,
          author: nickname,
          content: newComment
        }
      )
      console.log(response.data)
      getComment();
      setNewComment('')

     }catch(error){
        console.error('댓글추가 오류', error)
     }
  }

// 댓글 조회
  const getComment = async()=>{
    try{
        const response = await axios.get(`http://localhost:8080/api/comments/${postId}`);
        setComments(response.data)
        console.log(response.data)
    }catch(error){
        console.error('댓글 조회 오류',error)
    }
  } 

  
  useEffect(()=>{
    getComment()
  },[])
  return (
    <div>
        <div className='w-full mt-8 flex items-center justify-center'>
        <textarea 
          placeholder='댓글을 입력해주세요'
          onChange={(e)=>{setNewComment(e.target.value)}}
          className='w-3/4 h-16 overflow-y-auto resize-none border border-gray-300 p-2 mr-4' />
        <button onClick={handleSubmitComment} className='border h-16 border-white text-white px-2 rounded-md'>댓글 작성</button>
        </div>

        <ul className='text-white'>
        {
            comments.length>0 ? (
                comments.map(comment =>(
                    <CommentRow className='border-b-2 border-green-400 ' key={comment._id}>{comment.content}</CommentRow>
                    
                ))
            ) : (
                <li>없어용</li>
            )
        }
        </ul>
    </div>
  )
}

export default Comment