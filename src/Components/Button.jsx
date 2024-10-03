import React from 'react'

const Button = ({ text, className }) => {
    // console.log(className);
    return (
        <>
            <button className={className}>
                {text}
            </button>
        </>
    )
}

export default Button