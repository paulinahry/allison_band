import React from 'react'
import { Oval } from 'react-loader-spinner'

function Spinner({
    size = 50,
    color = 'text-main',
    secondaryColor = 'text-details',
}) {
    return (
        <div className="text-center">
            <Oval
                height={size}
                width={size}
                color={color}
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor={secondaryColor}
                strokeWidth={2}
                strokeWidthSecondary={2}
            />
        </div>
    )
}

export default Spinner
