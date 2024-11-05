import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Comment = ({postId}:{postId:string}) => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")

// 댓글 작성
  const handleSubmitComment = ()=>{
     try{
        const response = axios.post(`/api/comments`, {postId})

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
    <div className='text-white'>
        <div className='w-full mt-3'>
        <input 
            type='text'
            placeholder='댓글을 입력해주세요'
            onChange={(e)=>{setNewComment(e.target.value)}}
            className='w-3/4'
        />
        <button onClick={handleSubmitComment} className='border border-white px-2 rounded-md'>댓글 작성</button>
        </div>
        <ul>
        {
            comments.length>0 ? (
                comments.map(comment =>(
                    <li className='border-b-2 border-green-400 ' key={comment._id}>{comment.content}</li>
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