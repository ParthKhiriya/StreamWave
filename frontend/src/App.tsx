// import React from 'react'
// import ReactDOM from 'react-dom/client'
import { Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
import Subscriptions from './pages/Subscriptions'
import Login from './pages/Login'
import Register from './pages/Register'
import History from './pages/History'
import Playlists from './pages/Playlists'
import Playlist from './pages/Playlist'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/subscriptions' element={<Subscriptions />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/history' element={<History />} />
        <Route path='/playlists' element={<Playlists />} />
        <Route path='/playlist' element={<Playlist />} />
      </Routes>
    </div>
  )
}

export default App
