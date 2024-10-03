import React from 'react'

const Feedback = ({text}) => {
    return (
        <div>
            <div className="bg-blue-100 justify-start items-start p-10 rounded-lg w-full h-60 shadow-md flex flex-col">
                <div className="flex justify-start">
                    <i className="ri-double-quotes-r text-blue-500"></i>
                </div>
                <p className="text-gray-700 mt-4 text-xl">{text}</p>
            </div>
        </div>
    )
}

export default Feedback