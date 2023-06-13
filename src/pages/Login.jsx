import React from 'react'
import { useState } from 'react'
import { useData } from '../context/UseContext'
import { useNavigate } from 'react-router-dom'
import heroPic from '../assets/images/pexels-brett-sayles-2479312.jpg'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { user } = useData

    const inputStyle = {
        color: 'black ',
        borderRadius: '2px',
        margin: '4px',
        width: '90%',
        height: '42px',
        border: '1px solid black ',
    }

    const submitLogin = (e) => {
        e.preventDefault()
        console.log('user logged in', email, ':', password)
        navigate('/profil')
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    return (
        <div className=" flex justify-center items-center bg-white h-screen">
            <div
                className="flex 
             flex-col-reverse w-[80%] h-[80%] 
            sm:flex-row sm:w-[70%] sm:h-[70%]"
            >
                <div
                    className=" cover bg-center sm:w-[50%] h-full"
                    style={{ backgroundImage: `url(${heroPic})` }}
                ></div>

                <div className="w-full sm:w-[50%] h-full  ">
                    <form
                        className="  h-full bg-wite text-main border border-gray flex flex-col justify-center items-center sm: p-1  "
                        onSubmit={submitLogin}
                    >
                        {/* <h2 className="font-mono">Welcome</h2> */}

                        <div className="w-full  flex flex-col justify-center items-center">
                            <label htmlFor="username">Email</label>
                            <input
                                onChange={handleEmail}
                                type="email"
                                style={inputStyle}
                            />

                            <label htmlFor="current-password">Password</label>
                            <input
                                onChange={handlePassword}
                                type="password"
                                style={inputStyle}
                            />
                        </div>

                        <div className="m-2 w-[75%] sm:w-[90%]">
                            <input
                                type="submit"
                                value="Log in"
                                className=" bg-details w-full  text-main  h-11 rounded-full "
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
