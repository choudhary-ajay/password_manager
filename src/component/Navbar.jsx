import React from 'react'

const Navbar = () => {
  return (
    <nav className='  bg-slate-800 text-white w-full'>
        <div className="md:mycontainer md:px-40 px-1 justify-between items-center flex h-14">

        <div className="logo font-bold text-2xl"><span className='text-green-400'>&lt;</span>
        <span>Pass</span><span className='text-green-400'>Op/&gt;</span></div>
        <button className='flex gap-1 bg-green-400 rounded-lg p-1 justify-center items-center'><a href="https://github.com/choudhary-ajay/"><img className='w-5'  src='github.png'></img></a><div className='font-bold'>Github</div></button>
        </div>
    </nav>
  )
}

export default Navbar 