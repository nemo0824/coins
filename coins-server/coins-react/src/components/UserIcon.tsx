import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { cn } from '../lib/utils'


interface UserInfo{
  profileImage:string;
  nickname:string;
}

const UserIcon = ({profileImage, nickname}:UserInfo) => {

  
  return (
    <Avatar className='w-[36px] h-[36px]'>
    <AvatarImage src={profileImage || "https://github.com/shadcn.png"} />
    <AvatarFallback>{nickname ? nickname : 'CN'}</AvatarFallback>
  </Avatar>
    )
  }

export default UserIcon