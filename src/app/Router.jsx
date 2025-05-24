import { Routes, Route } from 'react-router-dom'
import Home from '../views/Home'
import Login from '../views/Login'
import Navbar from '../components/Navbar'

const Router = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default Router
