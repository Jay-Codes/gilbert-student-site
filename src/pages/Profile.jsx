import React from 'react'

export const TextField = ({label ,type ,placeholder,name}) => {
    return(
        <div className="flex w-[40%] flex-col capitalize items-start font-bold">
            {label}
            <input type={type} placeholder={placeholder} name={name}  className=' border-b-[1px] border-[#454545] mt-[1rem] mb-[1rem] w-[90%]'/>
        </div>
    )
}

const Profile = () => {
  return (
    <div className='bg-white rounded-lg mt-[.5rem]'>
        <div className="header">
           <h1 className='text-left font-bold uppercase pt-[1.7rem] pl-[1.5rem]'>view and edit your details</h1>
        </div>
        <form className=' flex flex-wrap p-[1.5rem] '>
            <TextField label='first name' placeholder='jane' type='text' name='firstname'/>
            <TextField label='last name' placeholder='doe' type='text' name='lastname'/>
            <TextField label='username' placeholder='jane_doe' type='text' name='username'/>
            <TextField label='email address' placeholder='example@gmail.com' type='email' name='email'/>
            <TextField label='password' placeholder='password' type='password' name='password'/>
        </form>

        <div className="bottom flex items-center justify-start pl-[1.5rem] pb-[1.7rem]">
            <button className='rounded-lg bg-blue-700 text-white p-[.75rem]'>Edit Details</button>
            <button className='rounded-lg bg-stone-400 text-black ml-[.2rem] p-[.75rem]'>Contact Us</button>
        </div>
    </div>
  )
}

export default Profile