import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../components/ui/dialog"
const PostDialog = () => {
  return (
    <Dialog>
  <DialogTrigger className='border border-white rounded-md p-2'>Open</DialogTrigger>
  <DialogContent className='text-white h-[600px] min-w-[500px] rounded-lg bg-black'>
    <DialogHeader className='text-white'>
      <DialogTitle className='text-white'>게시글 작성해주세요</DialogTitle>
      {/* <DialogDescription className='text-white scroll'> */}
      <section className='overflow-y-auto'>
       <form>
        <div className='flex flex-col mt-8'>
            <label className='white'>제목</label>
            <input type="text" placeholder='제목 입력' className='block p-2 rounded text-black'/>
        </div>

        <div className='flex flex-col mt-4'>
        <label className='text-white'>카테고리</label>
        <input type='text' name='category' className='block p-2 rounded text-black' readOnly/>
        </div>

        <div className='flex flex-col mt-4'>
        <label className='text-white'>작성자</label>
        <input type='text' name='category'className='block p-2 rounded text-black' readOnly/>
        </div>

        <div className='flex flex-col mt-4'>
        <label>내용</label>
        <textarea  placeholder='내용입력' className='block p-2 rounded text-black'/>
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