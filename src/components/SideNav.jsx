import React from 'react'
import { Home ,Person,AccountTree,Message,Publish } from '@mui/icons-material'

const SideItem = ({icon,label,to}) => {

  return (
      <div className='flex justify-start border-b-[1px] border-[rgb(243,243,243)] p-[1rem] cursor-pointer hover:bg-[#b0b0b0] rounded-lg'
       onClick={e=>window.location = to}>
        {icon}
        <span className='ml-[.5rem]'>{label}</span>
        
      </div>
    )
}
const SideNav = () => {
  return (
      <div className='flex-[1] bg-[rgb(243,243,243)] h-[100vh] mr-[.25rem] '>
        <div className="top h-9 mb-[.5rem] bg-white border-[1]">
        </div>
        <div className="items bg-white h-[stretch] ">
            <SideItem icon={<Home/>} label='Dashboard'  to='/'/> 
            <SideItem icon={<Person/>} label='Profile' to='/profile'/>
            <SideItem icon={<Publish/>} label='Submission Page'to='submission'/>
            {/* <SideItem icon={<Message/>} label='Message Page'/> */}
        </div>
      </div>
  )
}

export default SideNav