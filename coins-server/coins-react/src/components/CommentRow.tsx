import React from 'react'
import { formatDate } from '../lib/utils';
import { MdDelete , MdSave, MdCancel, MdEdit } from "react-icons/md";
import store from '../lib/store';

interface CommnetProps{
    _id:string;
    author:string;
    content:string;
    createdAt:string;
}
interface CommentRowProps {
    comment: CommnetProps;
    onDelete: (commentId: string) => void;  
    onEdit: (commentId:string, content:string)=> void
    onEditSave: (commentId:string) => void
    setEditContent: (content: string) => void
    isEditing:boolean;
    editContent:string;
    onEditCancel:()=> void
    
}



const CommentRow = ({comment, onDelete, onEdit, onEditSave, setEditContent, isEditing, editContent, onEditCancel}:CommentRowProps) => {
    const {isLogged} = store.useUserLogin()
    const {nickname} = store.useUserStore()
  

    

  return (
    <div className='flex justify-around  border-b-2 border-green-500 p-1.5'>
        <div className='w-[10%]'>{comment.author}</div>
        <div className='w-[60%]'>
           {isEditing ? (
            <input 
                value={editContent}  
                onChange={(e)=> setEditContent(e.target.value)}
                className='text-black w-[90%]'></input>
           ):(
            <p className='truncate'>{comment.content}</p>
           )}
        </div>
        <div className="w-[30%] flex justify-end items-center">
        <span className="whitespace-nowrap">{formatDate(comment.createdAt)}</span>
        {/* 로그인 && 로그인된 닉네임 과 저자 같을떄 */}
        {isLogged && nickname == comment.author && (
          <>
            {isEditing ? (
              <>
                <span className="cursor-pointer" onClick={() => onEditSave(comment._id)}>
                  <MdSave />
                </span>
                <span className="cursor-pointer" onClick={onEditCancel}>
                    <MdCancel />
                </span>
              </>
            ) : (
              <>
                <span className="cursor-pointer" onClick={() => onDelete(comment._id)}>
                  <MdDelete />
                </span>
                <span className="cursor-pointer" onClick={() => onEdit(comment._id, comment.content)}>
                  <MdEdit />
                </span>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CommentRow