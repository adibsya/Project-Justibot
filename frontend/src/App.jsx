import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Document from './pages/Document'
import Chatbot from './pages/Chatbot'
import Header from './components/Header'


const App = () => {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/document' element={<Document/>} />
        <Route path='/chatbot' element={<Chatbot/>} />
      </Routes>
    </div>
  )
}

export default App