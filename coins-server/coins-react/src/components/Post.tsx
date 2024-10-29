import React from 'react'
import PostRow from './PostRow'
import { useState, useEffect } from 'react'
import axios from 'axios'
import store from '../lib/store'
import PostDialog from './PostDialog'


interface Post {
    _id: string;
    category: string;
    title: string;
    author: string;
}

const Post = () => {
   
    const {isLogged} = store.useUserLogin()
    const [posts, setPosts] = useState<Post[]>([])
    // 게시글 가져오기
      const getPostList = async() =>{
        const response = await axios.get('http://localhost:8080/api/posts')
       console.log("무슨값이 나오나? ",response.data)
       setPosts(response.data)
      }

      useEffect(()=>{
        getPostList()
      },[])
    
    // 글쓰기 
    const handleWrite = ()=>{
        // isLogged ? 
    }
  return (
    <section className='text-white w-full'>
       
        <table className='min-w-[550px] w-full'>
            <thead>
            <tr className='text-[#FAFAF9] border border-t-white-300 bg-stone-800'>
                <th className='cursor-pointer text-left py-2 px-2'>순서</th>
                <th className='cursor-pointer text-left py-2 px-2'>카테고리</th>
                <th className='cursor-pointer text-left py-2 px-2'>제목</th>
                <th className='cursor-pointer text-left py-2 px-2'>작성자</th>
            </tr>
            </thead>
            <tbody>
                {posts.length === 0 ? (
                    <tr>
                        <td colSpan= {4}> 게시글이 없습니다</td>
                    </tr>
                ):(
                    posts.map((post,index) => (
                        <PostRow key={post._id} post={post} index={index+1}></PostRow>
                    ))
                )
                
                }
               
            </tbody>
        </table>
        <div className='flex justify-end mt-4'>
        <PostDialog></PostDialog>
        </div>
    </section>
  )
}



export default Post