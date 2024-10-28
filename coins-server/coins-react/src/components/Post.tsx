import React from 'react'
import PostRow from './PostRow'
import { useState, useEffect } from 'react'
import axios from 'axios'

interface Post {
    _id: string;
    category: string;
    title: string;
    author: string;
}

const Post = () => {

    
    const [posts, setPosts] = useState<Post[]>([])
    
      const getPostList = async() =>{
        const response = await axios.get('http://localhost:8080/api/posts')
       console.log("무슨값이 나오나? ",response.data)
       setPosts(response.data)
      }

      useEffect(()=>{
        getPostList()
      },[])
    
  return (
    <section className='text-white w-full'>
        <h2> 게시글 목록</h2>
        <table className='min-w-[550px] w-full'>
            <thead>
            <tr>
                <th>순서</th>
                <th>카테고리</th>
                <th>제목</th>
                <th>작성자</th>
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
    </section>
  )
}



export default Post