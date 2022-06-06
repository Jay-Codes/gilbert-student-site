import React ,{useState ,useEffect} from 'react'
import { useDispatch ,useSelector } from 'react-redux'
import { setCurrentProject } from '../redux/ProjectReducer'
import { setMessages } from '../redux/messagesSlice'
import {Send} from '@mui/icons-material'
import { sendMessage ,getMessages } from '../lib/messages'

const messagesSample= {
    0:[
        {left :true ,text:'Hello how are you ?'},
        {left :false ,text:'I am Fine How About you Mr Exsampl?'},
        {left :true ,text:'Hello how are you ?'},
        {left :false ,text:'Hello how are you ?'},
        {left :false ,text:'Hello how are you ?'},
        {left :false ,text:'Hello how are you ?'},
    ],
    1:[
        {left :true ,text:'Hello how are you ?'},
        {left :false ,text:'I amdfsdfsdfst you Mr Exsampl?'},
        {left :true ,text:'Hello how are you ?'},
        {left :false ,text:'Hello how are you ?'},
        {left :false ,text:'Hello how are you ?'},
        {left :false ,text:'Hesdfsefsefyou ?'},
    ],
    2:[
        {left :true ,text:'Hello how are you ?'},
        {left :false ,text:'I am Fine How About you Mr Exsampl?'},
        {left :true ,text:'Hello how are you ?'},
        {left :false ,text:'Helfsdfesdfou ?'},
        {left :false ,text:'Hello how are you ?'},
        {left :false ,text:'Hello how are you ?'},
    ],
}
const Chat = ()=>{
    const dispatch = useDispatch()
    const { projects ,currentProject } = useSelector( state=>state.projectReducer)
    const { user } = useSelector( state=>state.currentUser)
    const [ currentValue , setCurrentValue ] = useState()
    function HandleProjectSelect(e){
        const curproj = projects.find(project=>project.id===e.target.value)
        dispatch(setCurrentProject(curproj))
    }
    useEffect(
        ()=>{
            if (currentProject)setCurrentValue(currentProject.id)
            if (currentProject) return
            const curproj = projects.find(project=>project.id===0)
            dispatch(setCurrentProject(curproj))
        },[]
    )
    useEffect(()=>{
        if(currentProject ==null)return
        setCurrentValue(currentProject.id)
        dispatch(setMessages(messagesSample[currentProject.id]))
    },[currentProject])
  return (
    <div className='flex-[5] p-[2rem] rounded-xl bg-white flex flex-col w-[100%] h-[100vh]'>
        <div className='px-[1.5rem] flex'>
            <div className='flex flex-col flex-1'>
                <span className='ml-[.5rem] font-[300] text-neutral-400 capitalize mt-[1rem] text-[.8rem] mb-[-.1rem] '>Select a project</span>
                <select className='cursor-pointer' value={currentValue} onChange={HandleProjectSelect}>
                    {projects.map( (project,index)=>{ 
                        if (user && project.evaluator === user.uid ) return (<option key={index} label={project.projectName} value={project.id}/> )
                        else return (<option key={index} label={project.projectName} value={project.id}/> )
                    })
                    }
                </select>    
            </div>
        </div>
        <MiniMessage/>
    </div>
  )
}

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
    
]
const MiniMessage = () => {
    const { currentProject , projects} = useSelector(state=>state.projectReducer)
    const dispatch = useDispatch()
    const {messages }=  useSelector(state=>state.messagesReducer)
    async function handleSend(e){
        e.preventDefault()
        const text = document.getElementById('sendTextField').value
        document.getElementById('sendTextField').value=''
        // dispatch(setMessages([...messages,{
        //     left :false,
        //     text : text
        // }]))

        await sendMessage(currentProject,text)

        // messagesSample[currentProject.id]=[...messages,{left:false,text:true}]
    }

    useEffect(()=>{
        ( async function loadMsg(){
            const messages = await getMessages(currentProject)
            dispatch(setMessages([...messages]))
            console.log('helo world')
        })()
        
    })

    useEffect(()=>{
        const element =  document.getElementById('chatContent')
        element.scrollTop+=99999;
    },[messages])
  return (
    <div className='flex-1 m-[.5rem] ml-[.25rem] rounded-lg bg-neutral-50 capitalize   pt-[1.7rem] pl-[1.5rem] pb-[1.7rem]  pr-[1.5rem]'>
        <h1 className=' font-bold uppercase text-left mt-[.25rem] mb-[1rem]'>Recent Messages</h1>
        <div className='relative flex flex-col'>
            <h4 className='text-center font-bold'>Chatting with {currentProject ? currentProject.studentName : projects[0].studentName}</h4>
            <div id='chatContent' className="content h-[460px] overflow-y-auto">
                {/* {messages.map((msg,index)=><Message left={msg.left} msg={msg.text} key={index}/>)} */}
            </div>
            <form className="input flex items-center justify-between ">
                <input type="text" name="" id="sendTextField" className='bg-[rgb(243,243,243)] rounded-md w-[85%] p-[.25rem]' />
                <button className=' bg-blue-500 text-white h-[2.5rem] w-[2.5rem]  rounded-[100%]' onClick={handleSend}><Send className='p-[1px]'/></button>
            </form>
        </div>
    </div>
  )
}

export default Chat