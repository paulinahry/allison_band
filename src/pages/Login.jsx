import React from 'react'
import { useState } from 'react'
import { useData } from '../context/UseContext'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { user } = useData

    const inputStyle = {
        border: '0.5px solid black',
        color: 'black ',
        borderRadius: '2px',
        margin: '4px',
        width: '60%',
        height: '35px',
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
        <div className="flex flex-col justify-center items-center bg-white h-screen">
            <form
                className="  w-[300px] h-[300px] bg-main flex flex-col justify-center items-center rounded "
                onSubmit={submitLogin}
            >
                <h2>Log in to your account</h2>

                <p></p>
                <div className="w-full text-center">
                    <label htmlFor="username"></label>
                    <input
                        onChange={handleEmail}
                        type="email"
                        placeholder="email"
                        style={inputStyle}
                    />
                </div>

                <div className="w-full text-center">
                    <label htmlFor="current-password"> </label>
                    <input
                        onChange={handlePassword}
                        type="password"
                        placeholder="password"
                        style={inputStyle}
                    />
                </div>
                <div>
                    <input
                        type="submit"
                        value="Log in"
                        className=" bg-details text-main w-[150px] h-8 rounded"
                    />
                </div>
            </form>
        </div>
    )
}

export default Login
