import React from 'react'
import { Home ,Person,AccountTree,Message,Publish,ChatIcon,Settings } from '@mui/icons-material'
import { AccountTree as Project } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const SideItem = ({icon,label,to}) => {

  return (
      <Link className='flex justify-start items-start border-b-[1px] border-[rgb(243,243,243)] p-[1rem] cursor-pointer hover:bg-[#b0b0b0] rounded-lg'
       to = {to}>
        {icon}
        <span className='ml-[.5rem]'>{label}</span>
        
      </Link>
    )
}
const SideNav = () => {
  return (
      <div className='flex-[1] bg-[rgb(243,243,243)] h-[100vh]  '>
        <div className="items bg-white h-[stretch] ">
            <SideItem icon={<Home/>} label='Dashboard'  to='/'/> 
            {/* <SideItem icon={<Project/>} label='My Projects' to='/my-projects'/> */}
            <SideItem icon={<Settings/>} label='settings'to='/settings'/>
            {/* <SideItem icon={<Message/>} label='Message Page'/> */}
        </div>
      </div>
  )
}

export default SideNav