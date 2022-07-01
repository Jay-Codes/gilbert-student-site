import React, { useEffect } from 'react'
import {Send} from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux' 
import { setCurrentProject } from '../redux/projectState'
import { getMessages ,sendMessage } from '../lib/messages'
import { setMessages } from '../redux/messagesSlice'

const Message = ({left,msg})=> (
    !left ? 
    <div className='text-left flex justify start m-[.5rem]' style={{wordWrap:'break-word'}}>
        <p className=' bg-[rgb(243,243,243)]  p-[.2rem] m-[.5rem] rounded-lg max-w-[50%]'>{msg}</p>
    </div> : 
    <div className='text-right flex justify-end m-[.5rem]' style={{wordWrap:'break-word'}}>
        <p className=' bg-[rgb(223,223,223)]  p-[.2rem] m-[.5rem] rounded-lg max-w-[50%]'>{msg}</p>
    </div>
)

    /* Recent Messages Design */
const MiniMessage = () => {
    const { projects,currentProject } = useSelector(state=>state.projectState)
    const { messages :msgs } = useSelector(state=>state.messageReducer)
    const dispatch = useDispatch()

    function handleSelectorChange(e){
        const currProj = projects.find((proj)=>proj.id===e.target.value)
        dispatch(setCurrentProject(currProj))
    }
    if (projects && !currentProject) dispatch(setCurrentProject(projects[0]))
    
    useEffect(()=>{
        if(!currentProject)return
        (   async function loadMsg() {
            const messages =  await getMessages(currentProject)
            dispatch(setMessages(messages))
            
        }
        )()
    },[currentProject])
    
    useEffect(()=>{
        let element = document.getElementById('chatArea')
        element.scrollTop+=99999
    },[msgs])

    function handleSend(e){
        e.preventDefault();
        const input = document.getElementById('textInput')
        const text = input.value
        sendMessage(currentProject,text)
        input.value = ''
    }
  return (
    <div className='flex-1 m-[.5rem] ml-[.25rem] rounded-lg bg-white capitalize mt-[0]  pt-[1.7rem] pl-[1.5rem] pb-[1.7rem]  pr-[1.5rem]'>
        {/* <h1 className=' font-bold uppercase text-left mt-[.25rem] mb-[1rem]'>Recent Messages</h1> */}
        <div className="projectsSelector flex items-center justify-between w-[70%]">
            <span className='text-[.8rem] font-[300]'>choose a project:</span>
            <select name="" id="" onChange={handleSelectorChange}>
                {projects.map((project,index)=><option key={index} value={project.id}>{project.projectName}</option>)}
            </select>
        </div>

        <div className=''>
            <h4 className='text-center font-bold'>Instructor</h4>
            <div className="content h-[150px] overflow-y-auto" id='chatArea'>
                {msgs.map((msg,index)=><Message left={msg.left} msg={msg.text} key={index}/>)}
            </div>
            
            <form className="input flex items-center justify-between ">
                <input type="text" name="" id="textInput" className='bg-[rgb(243,243,243)] rounded-md w-[85%] p-[.25rem]' />
                <button className=' bg-blue-500 text-white h-[2.5rem] w-[2.5rem]  rounded-[100%]' onClick={handleSend}><Send className='p-[1px]'/></button>
            </form>
        </div>
    </div>
  )
}

export default MiniMessage