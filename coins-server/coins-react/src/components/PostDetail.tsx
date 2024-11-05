import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import PostDialog from './PostDialog';
import axios from 'axios';
import {useUserLogin, useUserStore} from "../lib/store"
import store from '../lib/store';
import Comment from './Comment';
const PostDetail = () => {
    const params = useParams();
    console.log("params", params)
    const {postId} = params
    const location = useLocation()
    const {post, index} = location.state
    const [isEdit, setIsEdit] = useState(false)
    const navigate = useNavigate();
    const {isLogged} = store.useUserLogin()
    const {nickname} = store.useUserStore()


    const handleDelete = async() =>{
      try{
        await axios.delete(`http://localhost:8080/api/posts/${postId}`);
        alert("삭제 성공")
        navigate(-1);
      }catch(error){
        console.error("게시글 삭제오류", error)
        alert("삭제 실패")
      }
      
    }
    useEffect(()=>{
      setIsEdit(true)
    }, [])
  return (
   
    <section className='p-6' >
        
      <nav className='border-green-500 border-b-4 p-3 text-white '>

        {/* <div>{index}</div> */}
        <div className='text-[32px] font-bold text-green-500'>{post.category} 게시판</div>
        <h1 className='text-[20px]'>{post.title}</h1>
       
        <div>{post.author}</div>
        <div>{post.createAt}</div>
      </nav>
        
      <article className='border-green-500 border-b-4 p-3 text-white min-h-[400px] overflow-y-auto'>
        <div>{post.content}</div>
      </article>
      { isLogged && nickname === post.author &&(
      <article className='flex flex-row justify-end text-white gap-3 mt-2'>
       
        <PostDialog 
          onClick={()=> setIsEdit(true)}
          category={post.category}
          postData = {post}
          isEdit={true}
          handlePostSubmit={()=>setIsEdit(false)}
        />
        <button className='border border-white px-2 rounded-md'onClick={handleDelete} >삭제</button>
      </article>
       )
      }
        <Comment 
         postId={postId}
        />
          
    </section>

  )
}

export default PostDetail