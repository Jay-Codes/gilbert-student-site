import React from 'react'
import {Send} from '@mui/icons-material'
const Message = ({left,msg})=> (
    left ? 
    <div className='text-left flex justify start m-[.5rem]'>
        <p className='w-[fit-content] bg-[rgb(243,243,243)]  p-[.2rem] m-[.5rem] rounded-lg max-w-[50%]'>{msg}</p>
    </div> : 
    <div className='text-right flex justify-end m-[.5rem]'>
        <p className='w-[fit-content] bg-[rgb(223,223,223)]  p-[.2rem] m-[.5rem] rounded-lg max-w-[50%]'>{msg}</p>
    </div>
)
const msgs = [
    {left :true ,text:'Hello how are you ?'},
    {left :false ,text:'I am Fine How About you Mr Exsampl?'},
    {left :true ,text:'Hello how are you ?'},
    {left :false ,text:'Hello how are you ?'},
    {left :false ,text:'Hello how are you ?'},
    {left :false ,text:'Hello how are you ?'},
]

    /* Recent Messages Design */
const MiniMessage = () => {
  return (
    <div className='flex-1 m-[.5rem] ml-[.25rem] rounded-lg bg-white capitalize   pt-[1.7rem] pl-[1.5rem] pb-[1.7rem]  pr-[1.5rem]'>
        <h1 className=' font-bold uppercase text-left mt-[.25rem] mb-[1rem]'>Recent Messages</h1>
        <div className=''>
            <h4 className='text-center font-bold'>Instructor</h4>
            <div className="content h-[150px] overflow-y-auto">
                {msgs.map((msg,index)=><Message left={msg.left} msg={msg.text} key={index}/>)}
            </div>
            
            <div className="input flex items-center justify-between ">
                <input type="text" name="" id="" className='bg-[rgb(243,243,243)] rounded-md w-[85%] p-[.25rem]' />
                <button className=' bg-blue-500 text-white h-[2.5rem] w-[2.5rem]  rounded-[100%]'><Send className='p-[1px]'/></button>
            </div>
        </div>
    </div>
  )
}

export default MiniMessage