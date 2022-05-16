import React from 'react'
import {TopNav} from '.'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Profile from '../pages/Profile'
import ProjectSubmission from '../pages/ProjectSubmission'
import Home from '../pages/Home'
const Content = () => {
  return (
    <div className='flex-[4] h-[100vh] ml-[.25rem] pl-[1.5rem] mr-[.5rem] '>
      <BrowserRouter>
        <TopNav/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/submission' element={<ProjectSubmission/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Content