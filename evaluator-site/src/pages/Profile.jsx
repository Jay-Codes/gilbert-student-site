import React ,{useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setProfile } from '../redux/ProfileState'
import { setUser } from '../redux/userReducer'
import { updateProfileInfo } from '../lib/profile'

export const TextField = ({label ,type ,placeholder,name,onChange,id}) => {
    return(
        <div className="flex w-[40%] flex-col capitalize items-start font-bold">
            {label}
            <input id={id} type={type} placeholder={placeholder} name={name} onChange={onChange}  className=' border-b-[1px] border-[#454545] mt-[1rem] mb-[1rem] w-[90%]'/>
        </div>
    )
}



const Profile = () => {
    const { user } = useSelector(state=>state.currentUser)
    const dispatch = useDispatch()

    

    async function handleSubmit(){
        const data = {}
        const firstname = document.getElementById('firstname').value
        const lastname = document.getElementById('lastname').value
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const phone = document.getElementById('phone').value.value

        if(firstname) data.firstname = firstname
        if(lastname) data.lastname =lastname
        if(email) data.email = email
        if(phone) data.phone = phone

        dispatch(setProfile(data))
        dispatch(setUser({...user,...data}))

        await updateProfileInfo(data,password,user)

    }
  return (
    <div className='bg-white rounded-lg '>
        <div className="header">
           <h1 className='text-left font-bold uppercase pt-[1.7rem] pl-[1.5rem]'>view and edit your details</h1>
        </div>
        <form className=' flex flex-wrap p-[1.5rem] '>
            <TextField id='firstname' label='first name' placeholder = {user ? user.firstname :'John'} type='text' name='firstname'/>
            <TextField id='lastname' label='last name' placeholder = {user ? user.lastname : 'don'} type='text' name='lastname'/>
            <TextField id='phone' label='phone number' placeholder = {user ? user.phone :'+265897654290'} type='text' name='username'/>
            <TextField id='email' label='email address' placeholder = {user ? user.email:'johndoe@gmail.com'} type='email' name='email'/>
            <TextField id='password' label='password' placeholder = 'password' type='password' name='password'/>
        </form>

        <div className="bottom flex items-center justify-start pl-[1.5rem] pb-[1.7rem]">
            <button className='rounded-lg bg-blue-700 text-white p-[.75rem]' onClick={handleSubmit}>Edit Details</button>
            <button className='rounded-lg bg-stone-400 text-black ml-[.2rem] p-[.75rem]'>Contact Us</button>
        </div>
    </div>
  )
}

export default Profile