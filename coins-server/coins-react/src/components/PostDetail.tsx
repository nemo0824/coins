import React from 'react'
import { useParams } from 'react-router-dom'

const PostDetail = () => {
    const params = useParams();
    console.log("params", params)
  return (
    <div>
        <h1 className='text-white'>postDetail</h1>
    </div>
  )
}

export default PostDetail