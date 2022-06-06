import logo from './logo.svg';
import React from 'react'
import './lib'
import './App.css';
import {Content,TopNav} from './components'

function App() {
  return (
    <div className="App bg-[rgb(243,243,243)] text-[#404040]">
      <TopNav/>
      <Content/>
    </div>
  );
}

export default App;
