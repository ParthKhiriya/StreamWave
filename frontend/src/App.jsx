import React from 'react'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/HomePage/Home'
import Video from './pages/VideoPage/Video'
import Navbar from './components/Navbar/Navbar'

const App = () => {

  const [sidebar, setSidebar] = useState(true);

  return (
    <div>
      <Navbar setSidebar={setSidebar} />
      <Routes>
        <Route path='/' element={<Home sidebar={sidebar} />} />
        <Route path='/video/:categoryId/:videoId' element={<Video />} />
      </Routes>
    </div>
  )
}

export default App
