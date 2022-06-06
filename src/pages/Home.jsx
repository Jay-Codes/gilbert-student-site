import React from 'react'
import ProjectsMini from '../components/ProjectsMini'
import MiniMessage from '../components/MiniMessage'
import ProjectInstructor from '../components/ProjectInstructor'
import ProjectInvestor from '../components/ProjectInvestor'
const Home = () => {
  return (
    <div className=' rounded-lg   '>
        <div className="top flex">
            <ProjectsMini/>
            <MiniMessage/>
        </div>
        <div className="bottom flex mt-[.5rem] ">
            <ProjectInstructor/>
            <ProjectInvestor/>
        </div>
    </div>
  )
}

export default Home