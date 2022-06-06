import React , {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { logOut } from '../lib/auth'

const TopNav = () => {
  const { user } = useSelector(state=>state.currentUser)
  return (
      user ?
      <div className={"sticky z-[5] top-0  mb-[.5rem] bg-white border-[1] flex items-center justify-between"}>
        {user && <h1 className='m-[.7rem] p-[.5rem]'>Logged in As {user.firstname + " "+ user.lastname}</h1>}
        <button className='bg-red-500 rounded-lg text-rose-900 p-[.5rem] m-[.7rem]' onClick={logOut}>Logout</button>
      </div>
      :
      <div className={"sticky z-[5] top-0  mb-[.5rem] bg-white border-[1] flex items-center justify-end"}>
        {user && <h1 className='m-[.7rem] p-[.5rem]'>Logged in As {user.firstname + " "+ user.lastname}</h1>}
        <button className='bg-red-500 rounded-lg text-rose-900 p-[.5rem] m-[.7rem]' onClick={logOut}>Logout</button>
      </div>-0
  )
}

export default TopNav