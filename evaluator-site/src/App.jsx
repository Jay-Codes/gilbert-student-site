import './lib'
import { BrowserRouter , Routes ,Route } from 'react-router-dom'
import { SideNav , TopNav } from './components'
import { Dashboard , Projects, Chat, Profile  } from './pages'


function App() {
  return (
    <div className=" flex flex-col bg-[rgb(243,243,243)] text-[#404040]">
      <BrowserRouter>
        <TopNav/>
        <div className='flex'>
          <SideNav/>
          <div className='flex-[4] h-[100vh] ml-[.25rem] pl-[1.5rem] mr-[.5rem] '>
              <Routes>
                <Route path='/' element={<Dashboard/>}/>
                <Route path='/my-projects' element={<Projects/>}/>
                <Route path='/chat' element={<Chat/>}/>
                <Route path='/settings' element={<Profile/>}/>
              </Routes>         
          </div>
        </div>
      </BrowserRouter>    
    </div>
  );
}

export default App;
