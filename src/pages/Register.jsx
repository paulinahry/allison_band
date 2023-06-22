import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from 'src/redux/store'
import { Link, useNavigate } from 'react-router-dom'
import piano from '../assets/images/piano.jpg'

function Register() {
    const dispatch = useDispatch()
    const authError = useSelector((s) => s.auth.error)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const inputStyle = {
        color: 'black ',
        borderRadius: '2px',
        margin: '4px',
        width: '90%',
        height: '42px',
        border: '1px solid black ',
    }

    const submitRegister = (e) => {
        e.preventDefault()
        dispatch(authActions.register({ email, password })).catch(authError)
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
                    className=" bg-cover bg-center sm:w-[50%] h-full"
                    style={{ backgroundImage: `url(${piano})` }}
                ></div>

                <div className="w-full sm:w-[50%] h-full  ">
                    <form
                        className="  h-full bg-wite text-main border-2 border-gray flex flex-col justify-center items-center sm: p-1  "
                        onSubmit={submitRegister}
                    >
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
                        {authError && (
                            <p
                                key={authError.error}
                                className="mt-1 text-red-600  px-5 text-sm"
                            >
                                {authError.error}
                            </p>
                        )}
                        <div className="w-full px-5 flex justify-end">
                            <Link
                                to={'/login'}
                                className="underline text-sm cursor-pointer "
                            >
                                or login here
                            </Link>
                        </div>

                        <div className="m-2 w-[75%] sm:w-[90%]">
                            <input
                                type="submit"
                                value="Register"
                                className=" bg-details w-full  text-main  h-11 rounded-full cursor-pointer"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
