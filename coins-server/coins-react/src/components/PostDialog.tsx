import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../components/ui/dialog"
import store from '../lib/store';
import axios from 'axios';
import { FaPen } from "react-icons/fa";

interface PropsPost{
    category:string;
    handlePostSubmit: ()=> void
}


const PostDialog = ({category, handlePostSubmit}:PropsPost) => {
    const {nickname} = store.useUserStore()
    const [formData , setFormData] = useState({
        title:'',
        content:'',
    })
    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }
    const handleSubmit = async(e:React.FormEvent)=>{
     e.preventDefault();
     try{
        await axios.post('http://localhost:8080/api/posts', {
         ...formData,
          category,
          author: nickname,
        })
        alert("게시글 작성완료!!")
        setFormData({ title: '', content: '' });
        handlePostSubmit()
        setOpen(false)
        
     }catch(error){
        console.error("게시글 작성 오류", error);
        alert("게시글 작성실패..")
     }
    }

    const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger className='border border-white rounded-md p-2'>Open</DialogTrigger>
  <DialogContent className='text-white h-[600px] min-w-[500px] rounded-lg bg-black'>
    <DialogHeader className='text-white'>
      <DialogTitle className='text-white flex gap-3'><FaPen></FaPen>게시글 작성해주세요</DialogTitle>
      {/* <DialogDescription className='text-white scroll'> */}
      <section className='overflow-y-auto'>
       <form onSubmit={handleSubmit}>
        <div className='flex flex-col mt-8'>
            <label className='white'>제목</label>
            <input type="text" placeholder='제목 입력' className='block p-2 rounded text-black' name='title' onChange={handleChange}/>
        </div>

        <div className='flex flex-col mt-4'>
            <label className='text-white'>카테고리</label>
            <input type='text'  className='block p-2 rounded text-black bg-gray-400' name='category' value={category} readOnly/>
        </div>

        <div className='flex flex-col mt-4'>
            <label className='text-white'>작성자</label>
            <input type='text' className='block p-2 rounded text-black bg-gray-400' name='author' value={nickname} readOnly/>
        </div>

        <div className='flex flex-col mt-4'>
            <label>내용</label>
            <textarea  placeholder='내용입력' className='h-[150px] block p-2 rounded text-black ' name='content' onChange={handleChange}/>
        </div>

        <div className='flex justify-end mt-10'>
            <button type="submit" className='border border-white rounded-md px-3'>게시글 작성</button>
        </div>
        
       </form>
       </section>
      {/* </DialogDescription> */}
    </DialogHeader>
  </DialogContent>
</Dialog>
  )
}

export default PostDialog