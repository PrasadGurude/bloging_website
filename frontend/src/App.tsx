import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Blog from './pages/Blog'
import Blogs from './pages/Blogs'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Publish from './pages/Publish'

function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element ={<Signup/>} ></Route>
        <Route path='/signup' element={<Signup/>} ></Route>
        <Route path='/signin' element={<Signin/>} ></Route>
        <Route path='/blog/:id' element={<Blog/>} ></Route>
        <Route path='/blogs' element={<Blogs />} ></Route>
        <Route path='/publish' element={<Publish />} ></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
