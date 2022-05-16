import logo from './logo.svg';
import './App.css';
import {SideNav,Content,TopNav} from './components'
function App() {
  return (
    <div className="App bg-[rgb(243,243,243)] text-[#404040]">
      <div className="flex m-[0] p-0">
        <SideNav/>
        <Content/>
      </div>
    </div>
  );
}

export default App;
