import React from 'react'
import Info from '../components/Info'

function NotFound() {
    return (
        <div className="min-h-screen max-h-full flex justify-center flex-col text-main ">
            <p className=" text-4xl extrabold text-center py-32 ">
                <span className="block">upps....</span>
                404 Page Not Found
            </p>

            <p className=" text-xl extrabold text-center pb-20">
                But look around to find something for you
            </p>
            <Info />
        </div>
    )
}

export default NotFound
