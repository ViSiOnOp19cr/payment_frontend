import './App.css'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Dashboard } from './pages/Dashboard'
import { SendMoney } from './pages/SendMoney'
import { Profile } from './pages/Profile'
import { Users } from './pages/Users'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/send' element={<SendMoney />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/users' element={<Users />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
