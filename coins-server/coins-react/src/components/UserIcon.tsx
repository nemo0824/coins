import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { cn } from '../lib/utils'
const UserIcon = () => {
  return (
    <Avatar className='w-[36px] h-[36px]'>
    <AvatarImage src="https://github.com/shadcn.png" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
    )
  }

export default UserIcon