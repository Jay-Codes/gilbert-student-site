import { BrowserRouter , Routes ,Route } from 'react-router-dom'
import { SideNav } from './components'
import { Dashboard , Projects ,Chat } from './pages'

function App() {
  return (
    <div className=" flex bg-[rgb(243,243,243)] text-[#404040]">
      <SideNav/>
      <div className='flex-[4] h-[100vh] ml-[.25rem] pl-[1.5rem] mr-[.5rem] '>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/my-projects' element={<Projects/>}/>
            <Route path='/chat' element={<Chat/>}/>
          </Routes>
        </BrowserRouter>
      </div>
      
    </div>
  );
}

export default App;
