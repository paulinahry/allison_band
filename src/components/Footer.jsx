import React from 'react'
import SocialMedia from './SocialMedia'

function Footer() {
    return (
        <div className=" bg-main  w-full text-center uppercase text-xs pt-20 pb-6 ">
            <p className="text-details">
                &copy; 2023 Allison Band. All rights reserved.
            </p>
            <SocialMedia />
        </div>
    )
}

export default Footer
