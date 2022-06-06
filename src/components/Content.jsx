import React from 'react'
import {TopNav,SideNav} from '.'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Profile from '../pages/Profile'
import ProjectSubmission from '../pages/ProjectSubmission'
import Home from '../pages/Home'
import AllProjects from '../pages/Dashboard'
const Content = () => {
  return (
    <div className='flex'>
      <BrowserRouter>
        <SideNav/>
        <Routes>
            <Route path='/' element={<Hodler><Home/></Hodler>}/>
            <Route path='/profile' element={<Hodler><Profile/></Hodler>}/>
            <Route path='/submission' element={<Hodler><ProjectSubmission/></Hodler>}/>
            <Route path='/all-projects' element={<Hodler><AllProjects/></Hodler>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

const Hodler = ({children})=>(
  <div className='flex-[5] h-[100vh] overflow-y-auto ml-[.25rem]  mr-[.5rem] '>
    {children}
  </div>
)

export default Content