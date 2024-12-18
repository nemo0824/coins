import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CommentRow from './CommentRow'
import store from '../lib/store'
import { useNavigate } from 'react-router-dom'

const Comment = ({postId}:{postId:string}) => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const {nickname} = store.useUserStore()
  const [isEditId, setIsEditId] = useState<string|null>(null)
  const [editContent, setEditContent] = useState("")
  const {isLogged} = store.useUserLogin()
  const navigate = useNavigate()
// 댓글 작성
  const handleSubmitComment = async()=>{
     try{
      if(!isLogged){
        alert("로그인 페이지로 이동합니다")
        navigate("/login")
        return;
      }
      if(!newComment){
        return alert("댓글 입력 해주세요")
      }
        const response = await axios.post(`http://localhost:8080/api/comments`, {
          postId,
          author: nickname,
          content: newComment
        }
      )
      // console.log(response.data)
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
        // console.log(response.data, "조회")
    }catch(error){
        console.error('댓글 조회 오류',error)
    }
  } 
 // 댓글 삭제ㅌ
 const handleDelete = async (commentId: string) => {
  // console.log(commentId)
  try {
    await axios.delete(`http://localhost:8080/api/comments/${commentId}`);
    alert("삭제 성공");
    getComment(); // 삭제 후 댓글 목록 갱신
  } catch (error) {
    console.error("댓글 삭제 오류", error);
    alert("삭제 실패");
  }
};
// 댓글 수정 시작
 const handleEdit = async(commentId:string, content:string)=>{
  setIsEditId(commentId);
  setEditContent(content);
 }
// 수정한 댓글 저장
 const handleEditSave = async (commentId: string) => {
  try {
    await axios.put(`http://localhost:8080/api/comments/${commentId}`, {
      content: editContent,
    });
    alert('수정 성공');
    setIsEditId(null); // 수정 모드 종료
    getComment(); // 댓글 새로고침
  } catch (error) {
    console.error('댓글 수정 오류', error);
    alert('수정 실패');
  }
};
// 댓글 수정 취소
const handleEditCancel = () => {
  setIsEditId(null); // 수정 모드 종료
};
  
  useEffect(()=>{
    getComment()
  },[])
  return (
    <div className='w-full mt-5'>
        <div className='flex items-center justify-center'>
        <textarea 
          placeholder='댓글을 입력해주세요'
          onChange={(e)=>{setNewComment(e.target.value)}}
          value={newComment}
          className='w-full h-16 overflow-y-auto resize-none border border-gray-300 p-2 mr-4' />
        <button onClick={handleSubmitComment} className='border h-16 border-white text-white px-2 rounded-md text-nowrap'>댓글 작성</button>
        </div>

        <ul className='text-white mt-8 w-full'>
        {
            comments.length>0 ? (
                comments.map(comment =>(
                    <CommentRow 
                    key={comment._id} 
                    comment={comment}  
                    onDelete={handleDelete} 
                    onEditSave={handleEditSave} 
                    onEdit={handleEdit} 
                    setEditContent ={setEditContent}
                    editContent = {editContent}
                    isEditing={isEditId === comment._id} 
                    onEditCancel={handleEditCancel}
                    ></CommentRow>
                    
                ))
            ) : (
                <li>작성된 댓글이 없습니다</li>
            )
        }
        </ul>
    </div>
  )
}

export default Comment