import './App.css'
import Topbar from './components/Topbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import MyProfile from './pages/MyProfile'
import Login from './pages/Login'
import Register from './pages/Register'
import BookDetail from './pages/BookDetail'
import InsertBook from './pages/InsertBook'
import './index.css';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Home />} />
        <Route path='/libro:id' element={<BookDetail />} />
        <Route path='/register' element={<Register />} />
        <Route path='/myprofile' element={<MyProfile />} />
        <Route path='/insertbook' element={<InsertBook />} />
      </Routes>
    </>
  )
}

export default App
