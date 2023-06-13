import React from 'react'
import { Oval } from 'react-loader-spinner'

function Spinner({ size = 50 }) {
    return (
        <div className="text-center">
            <Oval
                height={size}
                width={size}
                color="#f7d5b1"
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#f7d5b1"
                strokeWidth={2}
                strokeWidthSecondary={2}
            />
        </div>
    )
}

export default Spinner
