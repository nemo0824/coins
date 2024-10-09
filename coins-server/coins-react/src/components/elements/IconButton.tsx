import React from 'react'

interface IconButtonProps{
    icon: React.ReactNode;
    onClickIcon?: ()=> void;
    // size?: number
}


const IconButton = ({icon, onClickIcon=()=>{}, }: IconButtonProps) => {
  return (
    <div className={`flex, justify-center items-center  rounded-full cursor-pointer hover:bg-[rgba(246,194,194,0,0.45)]`}
        onClick={onClickIcon}>
        {icon}
    </div>
  )
}

export default IconButton