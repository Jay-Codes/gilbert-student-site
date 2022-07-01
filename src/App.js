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
// curl https://codeload.github.com/zeit/next.js/tar.gz/master | \
//   tar -xz --strip=2 next.js-master/examples/with-apollo
// curl https://codeload.github.com/Jay-Codes/gilbert-student-site/tar.gz/4b7802265da1bafd00cfdaa6d587af2835bc8813 | \
// tar -xz --strip=2 gilbert-student-site-4b7802265da1bafd00cfdaa6d587af2835bc8813/src/component