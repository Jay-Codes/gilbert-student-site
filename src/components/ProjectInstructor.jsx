import React from 'react'
import {Close ,Check} from '@mui/icons-material'

const data= [
    {name:'ordering system',instructor:true , investor : true},
    {name:'app',instructor:true , investor : false},
    {name:'webstie',instructor:false , investor : false},
    {name:'water system',instructor:false , investor : null},
]
const TrueFalse = ({flag})=>(
    flag ? <Check className=' text-green-500'/> :
         flag ===null ? <span className='rounded-xl bg-red-400 text-red-800 p-[.25rem]'>pending</span> :
          <Close className='text-red-500'/>
)
const ProjectInstructor = () => {
  return (
    <div className='flex-1 pb-[1.7rem] pt-[1.7rem] pl-[1.5rem] pr-[1.5rem] bg-white rounded-xl'>
        <h1 className='font-bold text-left uppercase mb-[1.7rem]'> Instructor approved projects</h1>
        <table className='capitalize text-left border-collapse w-[100%]'>
            <tr className='mb-[.5rem] border-b-[1px] border-b-gray-300'>
                <th className='pb-[.5rem]'>Project Name</th>
                <th className='pl-[2rem] pb-[.5rem] text-center'>instructor comments</th>
            </tr>
            {data.map((project,key)=>(
                <tr index={key} className=' border-b-[1px] border-b-gray-300 cursor-pointer hover:bg-[#b0b0b0] rounded-lg'>
                    <td className='pb-[.5rem]  pt-[.5rem]'>{project.name}</td>
                    <td className='text-center pl-[2rem] pb-[.5rem]  pt-[.5rem]'> <p>Good Project check on your execution</p></td>
                </tr>
            ))}
        </table>
    </div>
  )
}

export default ProjectInstructor