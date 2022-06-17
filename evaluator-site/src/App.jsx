import './lib'
import { BrowserRouter , Routes ,Route ,useNavigate } from 'react-router-dom'
import { SideNav , TopNav } from './components'
import { Dashboard , Projects, Chat, Profile  } from './pages'

// const Redirect = ()=>{
//   const domain = window.location.host;
//   if (window.location.href!== 'http://'+domain+'/evaluator/') window.location.href = '/evaluator/'
//   console.log('hello')
// }
function App() {
  return (
    <div className=" flex flex-col bg-[rgb(243,243,243)] text-[#404040]">
      <BrowserRouter>
        <TopNav/>
        <div className='flex'>
          <SideNav/>
          <div className='flex-[4] h-[100vh] ml-[.25rem] pl-[.5rem] mr-[.5rem] '>
              <Routes>
                <Route path='/evaluator/' element={<Dashboard/>}/>
                <Route path='/evaluator/my-projects' element={<Projects/>}/>
                <Route path='/evaluator/chat' element={<Chat/>}/>
                <Route path='/evaluator/settings' element={<Profile/>}/>
                {/* <Route  element={<Redirect/>}/> */}
              </Routes>         
          </div>
        </div>
      </BrowserRouter>    
    </div>
  );
}

export default App;
