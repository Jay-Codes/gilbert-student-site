import React , {useState} from 'react';
import {TextField} from './Profile'
import RichTextEditor from '../components/RichTextEditor';

const ProjectSubmission = () => {
  return (
    <div className='bg-white rounded-lg mt-[.5rem] pt-[1.7rem] pl-[1.5rem] pb-[1.7rem]  pr-[1.5rem]'>
        <div className="header text-left pt-[1.7rem] pb-[1.8rem]">
            <h1 className='uppercase font-bold'>upload your project here</h1>
            <h2 className='capitalize font-[400]'>upload your new project idea here so that your evaluator can approve it shence it reaches potential investors!!!</h2>
        </div>
        <div className="content">
            <form className='flex flex-col'>
                <TextField label='Project Name'/>
                <h1 className='text-left pb-[.5rem] pt-[1rem]'><b>Project Description</b></h1>
                <RichTextEditor onChange={value=>console.log(value)}/>
            </form>
            <div className="bottom flex items-center justify-start pl-[1.5rem] pb-[1.7rem]">
                <button className='rounded-lg bg-blue-700 text-white p-[.75rem] mt-[1.5rem]'>PUBLISH</button>
            </div>
        </div>
    </div>
  )
}

export default ProjectSubmission