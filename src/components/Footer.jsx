import React from 'react'
import SocialMedia from './SocialMedia'

function Footer() {
    return (
        <div className="  w-full text-center uppercase text-xs mt-20 mb-6 ">
            <p className="text-details">
                &copy; 2023 Allison Band. All rights reserved.
            </p>
            <SocialMedia />
        </div>
    )
}

export default Footer
