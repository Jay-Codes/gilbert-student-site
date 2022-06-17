import React from 'react'
import { Link } from 'react-router-dom'
import { Home ,Person,AccountTree,Message,Publish,WebAsset } from '@mui/icons-material'

const SideItem = ({icon,label,to}) => {

  return (
    <Link to ={to}>
      <div className='flex flex-1 justify-start border-b-[1px] border-[rgb(243,243,243)] p-[1rem] cursor-pointer hover:bg-[#b0b0b0] rounded-lg'
        >
          {icon}
          <span className='ml-[.5rem]'>{label}</span>
          
      </div>
    </Link>
    )
}
const SideNav = () => {
  return (
      <div className=' flex-[1] bg-[rgb(243,243,243)] h-[100vh] mr-[.25rem] '>
        <div className="items bg-white h-[stretch] ">
            <SideItem icon={<Home/>} label='Dashboard'  to='/student/'/> 
            <SideItem icon={<WebAsset/>} label='All Approved Projects'  to='/student/all-projects'/> 
            <SideItem icon={<Person/>} label='Profile' to='/student/profile'/>
            <SideItem icon={<Publish/>} label='Submission Page'to='/student/submission'/>
            {/* <SideItem icon={<Message/>} label='Message Page'/> */}
        </div>
      </div>
  )
}

export default SideNav