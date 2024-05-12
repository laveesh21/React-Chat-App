import { Routes, Route } from 'react-router-dom'
import './App.css'
import LogIn from './components/Auth/Login'
import SignUp from './components/Auth/Signup'
import HomePage from './components/Chat/HomePage'
import Chat from './components/Chat/Chat'

function App() {


  return (
    <Routes>
      <Route path='/login' element={<LogIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/chats' element={<Chat/>}/>
    </Routes>

  )
}

export default App
