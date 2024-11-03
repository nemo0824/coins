import React from 'react'
import PostRow from './PostRow'
import { useState, useEffect } from 'react'
import axios from 'axios'

import PostDialog from './PostDialog'
import Paging from './elements/Paging'


interface Post {
    _id: string;
    category: string;
    title: string;
    author: string;
}

const Post = ({ category }: { category: string }) => {
   
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;


    // 게시글 가져오기
    const getPostList = async () => {
        const response = await axios.get('http://localhost:8080/api/posts');
        console.log("무슨값이 나오나? ", response.data);
        setPosts(response.data);
    }

    useEffect(() => {
        getPostList();
    }, []);

    // 로그인했을때만 글쓰기 
   

    // 게시글 썼을때 새로고침
    const handlePostSubmit = () => {
        getPostList();
    }

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    // 카테고리에 따라 필터링
    const filteredPost = posts.filter(post => post.category === category);

    // 페이지당 총 게시글 수 및 현재 게시글
    const totalPages = Math.ceil(filteredPost.length / postsPerPage);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPost.slice(indexOfFirstPost, indexOfLastPost);

    console.log("넘겨받은 카테고리", category);

    return (
        <section className='text-white w-full'>
            <table className='min-w-[550px] w-full table-fixed'>
                <thead>
                    <tr className='text-[#FAFAF9] border border-t-white-300 bg-stone-800'>
                        <th className='cursor-pointer text-left py-2 px-2'>순서</th>
                        <th className='cursor-pointer text-left py-2 px-2'>카테고리</th>
                        <th className='cursor-pointer text-left py-2 px-2'>제목</th>
                        <th className='cursor-pointer text-left py-2 px-2'>작성자</th>
                        <th className='cursor-pointer text-left py-2 px-2'>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPosts.length === 0 ? (
                        <tr>
                            <td colSpan={5}> 게시글이 없습니다</td>
                        </tr>
                    ) : (
                        currentPosts.map((post, index) => (
                            <PostRow key={post._id} post={post} index={index + indexOfFirstPost + 1} />
                        ))
                    )}
                </tbody>
            </table>
            <div className='flex justify-end mt-4'>
                <PostDialog category={category} isEdit={false} handlePostSubmit={handlePostSubmit} />
            </div>
            <div>
                <Paging
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </section>
    )
}

export default Post;
