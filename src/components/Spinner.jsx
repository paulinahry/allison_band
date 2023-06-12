import React from 'react'
import { Oval } from 'react-loader-spinner'

function Spinner({ size = 50 }) {
    return (
        <div className="text-center">
            <Oval
                height={size}
                width={size}
                color="#ca5534"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#ca5534"
                strokeWidth={2}
                strokeWidthSecondary={2}
            />
        </div>
    )
}

export default Spinner
