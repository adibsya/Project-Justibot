import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Document from './pages/Document'
import Chatbot from './pages/Chatbot'
import Header from './components/Header'
import Lawyer from './pages/Lawyer'


const App = () => {
  return (
    <div className='w-full h-full absolute'>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/document' element={<Document/>} />
        <Route path='/chatbot' element={<Chatbot/>} />
        <Route path='/lawyer' element={<Lawyer/>}/>
      </Routes>
    </div>
  )
}

export default App