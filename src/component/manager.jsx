import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import {toast, ToastContainer} from "react-toastify"

const Manager = () => {
    const ref = useRef()
    const passwordref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordarray, setpasswordarray] = useState([])
    const showpassword = () => {
        if (ref.current.src.includes("eye.svg")) {
            ref.current.src = "eyecross.svg"
            passwordref.current.type = "text"
        }
        else {
            ref.current.src = "eye.svg"
            passwordref.current.type = "password"
        }
    }
    //for database
    const getpassword=async ()=>{
       let req= await fetch("http://localhost:3000/")
       let passwords=await req.json()

       setpasswordarray(passwords)

    }

    useEffect(() => {
        getpassword()
        // for localStorage

        // let passwords = localStorage.getItem("passwords")
        // if (passwords) {
        //     setpasswordarray(JSON.parse(passwords))
        // }
    }, [])

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })

    }
    const savepassword =async () => {
        console.log(form)
       
        await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-type":"application/json"},body:JSON.stringify({id:form.id})})
        setpasswordarray(passwordarray => [...passwordarray, {...form,id:uuidv4()}])
    await fetch("http://localhost:3000/",{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify({...form,id:uuidv4()})})
    setform({ site: "", username: "", password: "" })
    toast.success("Password saved")

        // localStorage.setItem("passwords", JSON.stringify([...passwordarray,{...form,id:uuidv4()}]))

    }
    useEffect(() => {
        console.log(passwordarray)
    }, [passwordarray])
    const copytext = (text) => {
        navigator.clipboard.writeText(text)
        toast.success("Copied to clipboard")
    }
    const handledelete =async(id)=>{
        let a=confirm("are you sure to delete")
        if(a){
            let newpasswordarry= passwordarray.filter((item)=>{
                return item.id!==id
            })
            setpasswordarray(newpasswordarry)
            let data=JSON.stringify({id})
            console.log(data)
            // localStorage.setItem("passwords", JSON.stringify(newpasswordarry))
            await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-type":"application/json"},body:JSON.stringify({id})})
        }
    }
    const handleedit=async(id)=>{
        setform({...passwordarray.filter(item=>item.id===id)[0],id:id})
        setpasswordarray(passwordarray.filter(item=>item.id!==id))
        
    }

    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full
     bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

            <div className="px-2 md:mycontainer my-10">
                <div className="main md:px-35">

                    <div className="logo font-bold text-2xl text-center"><span className='text-green-400'>&lt;</span>
                        <span>Pass</span><span className='text-green-400'>Op/&gt;</span></div>
                    <div className='text-lg text-green-500 text-center'>Your own password manager</div>
                    <div className="flex-col flex gap-5 my-2 items-center">
                        <input value={form.site} name='site' onChange={handlechange} placeholder='Enter Website URL' className=' border-green-500 border-2 rounded-4xl
                         text-black px-5 py-1 w-full' type="text" />
                        <div className='flex sm:flex-row flex-col gap-5 justify-between w-full'>
                            <input value={form.username} name='username' onChange={handlechange} placeholder='Enter Username' className='border-2 border-green-500 rounded-4xl
                             text-black px-5 py-1 w-full' type="text" />
                            <div className='relative w-full'>

                                <input ref={passwordref} value={form.password} name='password' onChange={handlechange} placeholder='Enter Password' className='border-2 border-green-500 rounded-4xl
                             text-black px-5 py-1 w-full' type="password" />
                                <span onClick={showpassword} className='absolute top-1 px-1 py-[1px] cursor-pointer right-1'>
                                    <img ref={ref} src="eye.svg" alt="eye" /></span>
                            </div>
                        </div>
                        <button disabled={form.password.length<3 || form.site.length<3 || form.username.length<3} onClick={savepassword} className='flex items-center bg-green-400 hover:bg-green-500 w-fit px-2 py-1 rounded-4xl'>
                            <lord-icon src="https://cdn.lordicon.com/sbnjyzil.json" trigger="hover" stroke="bold">
                            </lord-icon>Save</button>
                    </div>
                    <div className="password lg:px-20">
                        <h1 className='font-bold text-2xl py-3'>Your Passwords</h1>
                        {passwordarray.length === 0 && <div>No passwords to show</div>}
                        {passwordarray.length != 0 && <table className="table-auto w-full rounded-lg overflow-hidden mb-20 pb-10">
                            <thead className='bg-green-500 py-2 h-10'>
                                <tr className=''>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>

                                </tr>
                            </thead>
                            <tbody className='bg-green-100' >
                                {passwordarray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='text-center border border-white py-1 '>
                                            <div className='flex justify-center items-center'>
                                                <a href={item.site} target='_blank' >{item.site}</a>
                                                <div className='copytext cursor-pointer' onClick={() => { copytext(item.site) }}>
                                                    <img className='px-1 h-5' src="copy.svg" alt="" />
                                                </div>
                                            </div>
                                        </td>

                                        <td className='text-center border border-white py-1'>
                                            <div className='flex justify-center items-center'>

                                                <span>{item.username}</span>
                                                <div className='copytext cursor-pointer' onClick={() => { copytext(item.username) }}>
                                                    <img className='px-1 h-5' src="copy.svg" alt="" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center border border-white py-1'>
                                            <div className='flex items-center justify-center'>

                                                <span>{"*".repeat(item.password.length)}</span>
                                                <div className='copytext cursor-pointer' onClick={() => { copytext(item.password) }}>

                                                    <img className='px-1 h-5' src="copy.svg" alt="" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center justify-center border border-white py-1'>
                                            <span className='cursor-pointer px-1' onClick={()=>{handleedit(item.id)}}>

                                            <lord-icon
                                                src="https://cdn.lordicon.com/exymduqj.json"
                                                trigger="hover" style={{width:"25px",height:"25px"}}>

                                            </lord-icon>
                                                    </span>
                                                    <span className='cursor-pointer px-1'onClick={()=>{handledelete(item.id)}} >

                                            <lord-icon
                                                src="https://cdn.lordicon.com/hwjcdycb.json"
                                            trigger="hover" style={{width:"25px",height:"25px"}}>
                                                    
                                            </lord-icon>
                                                    </span>

                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                        }
                    </div>
                </div>
                <ToastContainer/>
            </div>
        </>
    )
}

export default Manager