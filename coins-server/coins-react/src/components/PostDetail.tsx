import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

const PostDetail = () => {
    const params = useParams();
    console.log("params", params)
    const location = useLocation()
    const {post, index} = location.state
  return (
   
    <section>
      <nav className='bg-slate-500 flex flex-row text-white'>
     
        <div>{index}</div>
        <div>{post.title}</div>
        <div>{post.category}</div>
        <div>{post.author}</div>
        <div>{post.createAt}</div>
        <div>{post.content}</div>
       
      </nav>
      <article>

      </article>
          
    </section>

  )
}

export default PostDetail