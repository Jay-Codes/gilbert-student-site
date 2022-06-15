import React , {useState} from 'react';
import {TextField} from './Profile'
import RichTextEditor from '../components/RichTextEditor';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { publishProject } from '../lib/projects';

const ProjectSubmission = () => {
    const [description ,setDescription]=useState('')
    const [category,setCategory] = useState('Health Care')
    const [projectName,setProjectName] = useState('')
    const { user } =useSelector(state=>state.currentUser)
    const { uploadProject } =useSelector(state=>state.projectState)

    function handlePublish(){
        publishProject(projectName,category,uploadProject.description,user.uid)
    }
  return (
    <div className='bg-white rounded-lg p-[1rem] '>
        <div className="header text-left  pb-[1.8rem]">
            <h1 className='uppercase font-bold'>upload your project here</h1>
            <h2 className='capitalize font-[400]'>upload your new project idea here so that your evaluator can approve it , hence it reaches potential investors!!!</h2>
        </div>
        <div className="content">
            <form className='flex flex-col'>
                <TextField label='Project Name' onChange={e=>setProjectName(e.target.value)}/>
                <div className="flex w-[40%] flex-col capitalize items-start font-bold">
                    <span> Project Category</span>
                    <select className='border-b-[1px] border-[#454545] mt-[1rem] mb-[1rem] w-[90%] cursor-pointer' id="" onChange={e=>setCategory(e.target.value)}>
                        <option>Health Care</option>
                        <option>Education Quality</option>
                        <option>Corruption</option>
                        <option>Food Insecurity</option>
                        <option>Economy</option>
                    </select>
                    
                </div>
                <h1 className='text-left pb-[.5rem] pt-[1rem] capitalize'><b>Project Description </b> <font className='font-[300] text-neutral-700'> <br/><b className='mx-[.5rem]'>NB:</b>what problems are you solving? and what do you need for your project implementation </font></h1>
                <RichTextEditor onChange={value=>setDescription(value)}/>
            </form>
            <div className="bottom flex items-center justify-start pl-[1.5rem] pb-[1.7rem]">
                <button className='rounded-lg bg-blue-700 text-white p-[.75rem] mt-[1.5rem]' onClick={handlePublish}>PUBLISH</button>
            </div>
        </div>
    </div>
  )
}

export default ProjectSubmission