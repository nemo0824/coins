import React from 'react'

interface PropsPost{
    category:string;
    title:string;
    author:string;
    _id:string;
}

interface PostRowPost{
    post:PropsPost;
    index:number;
}

const PostRow = ({post, index}:PostRowPost) => {
  return (
    <tr>
        <td>{index}</td>
        <td>{post.category}</td>
        <td>{post.title}</td>
        <td>{post.author}</td>
    </tr>
  )
}

export default PostRow