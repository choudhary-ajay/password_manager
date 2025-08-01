import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './component/Navbar'
import Manager from './component/manager'
import Footer from './component/Footer'

function App() {

  return (
    <>
     <Navbar/>
     <div className=''>
     <div className="absolute bg-repeat-y inset-0 -z-10 h-full w-full
     bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
     <Manager/>
     </div>
     <Footer/>
    </>
  )
}

export default App
