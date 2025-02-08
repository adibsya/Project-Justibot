import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Chatbot from './pages/Chatbot'
import Service from './pages/Service'
import GenerateDoc from './pages/GenerateDoc'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ChatBot' element={<Chatbot />} />
        <Route path='/GenerateDoc' element={<GenerateDoc />} />
        <Route path='/Service' element={<Service />} />
      </Routes>
    </div>
  )
}

export default App