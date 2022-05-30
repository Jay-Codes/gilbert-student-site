import React ,{ useState ,useEffect} from 'react'
import { Close } from '@mui/icons-material'
import { Dashboard  as ApprovedProjects ,Modal ,Desc ,ActionButtons} from './Dashboard'

const data = [
  {
    projectName :'water project',
    category : 'Health Care',
    studentName :  'Jay',
    description : '<h1 class="text-[2rem]"><b>a powerful way to live life</b></h1>',
    approved : true,
    hasInvestor : false
},
{
    projectName :'water project',
    category : 'Health Care',
    studentName :  'Jay',
    description : '<h1 class="text-[2rem]"><b>a powerful way to live life sdasdw sdadw dasd sdad sasdw dasdw sdada</b></h1>',
    approved : true,
    hasInvestor : false
},
{
    projectName :'water project',
    category : 'Corruption',
    studentName :  'Jay',
    description : '<h1><b>a powerful way to live life</b></h1><span>hello world</span>',
    approved : true,
    hasInvestor : false
},
]

const Projs = ({projects}) => {
  const [ category ,setCategory ] = useState('all')
    const [ currentProject , setCurrentProject] = useState(null)
    const rowStyle = 'px-[1.5rem] my-[.25rem] capitalize'
    let list = data.filter((item)=> category !=='all' ? item.category === category : true)
    useEffect(()=>{
        if(projects) data = projects
    },[])
  return (
    <div className='flex-[5] p-[2rem] rounded-xl bg-white flex flex-col w-[fit-content]'>
        <select className='w-[300px]' value={category} onChange={e=>setCategory(e.target.value)}>
            <option label='all' value='all'/>
            <option label='Health Care' value='Health Care'/>
            <option label='Education Quality' value='Education'/>
            <option label='Corruption' value='Corruption'/>
            <option label='Food Insecurity' value='Food Insecurity'/>
            <option label='Economy' value='Economy'/>
            <option label='Other' value='other'/>
        </select>
        

        <div>
            <table className=' border-collapse '>
                <tr>
                    <th className={rowStyle}>project name</th>
                    <th className={rowStyle}>Category</th>
                    <th className={rowStyle}>student</th>
                    <th className={rowStyle}>approved</th>
                    <th className={rowStyle}>has investor</th>
                    <th className={rowStyle}>actions</th>
                </tr>

                {list.map((project,index)=>(
                    <tr className='border-b-[1px]  hover:bg-neutral-50 cursor-pointer ' onClick={e=>{setCurrentProject(project)}}>
                            <td key={index} ><div className={rowStyle}>{project.projectName}</div></td>
                            <td key={index} ><div className={rowStyle}>{project.category}</div></td>
                            <td key={index} ><div className={rowStyle}>{project.studentName}</div></td>
                            <td key={index} ><div className={rowStyle}>{String(project.approved)}</div></td>
                            <td key={index} ><div className={rowStyle}>{String(project.hasInvestor)}</div></td>
                            <td key={index} ><div className={rowStyle}><ActionButtons project={project}/></div></td>
                    </tr>
                ))}
            </table>
        </div>

        {currentProject && 
            <Modal>
                <div className='rounded-xl bg-white flex flex-col justify-start p-[1rem]'>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-[1rem] uppercase font-bold'>{currentProject.projectName}</h1>
                        <button className=' hover:bg-neutral-50 rounded-xl p-[.25rem]' onClick={e=>{setCurrentProject(null)}}><Close/></button>
                    </div>
                    <div className='flex flex-col'>
                        <span> Project Name: {currentProject.projectName}</span>
                        <span> Project category: {currentProject.category}</span>
                        <span> Student Name: {currentProject.studentName}</span>
                        <div className='p-[1rem] border w-[1000px] h-[500px] overflow-y-auto'>
                            <Desc description = {currentProject.description}/>
                        </div>
                    </div>
                    <div className='mt-[.5rem]'>
                        <button className=' rounded-lg bg-blue-600 hover:bg-blue-700 text-white p-[.5rem]'> Approve </button>
                        <button className=' ml-[.5rem] hover:bg-red-700 rounded-lg bg-red-600 text-white p-[.5rem]'> Disapprove </button>
                        <button className=' ml-[.5rem] hover:bg-neutral-200 rounded-lg p-[.5rem] p-[.5rem]text-blue-600'> Chat With Student </button>
                    </div>
                </div>
            </Modal>
        } 
    </div>
  )
}
const Projects = () => {
  return (
    <div><Projs/></div>
  )
}

export default Projects