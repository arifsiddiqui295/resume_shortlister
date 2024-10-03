import React from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const Feature_Calculator = () => {
    return (
        <div className="relative bg-[#2B308B] text-white rounded-xl p-6 w-1/2 overflow-hidden">
        <div className="text-lg font-semibold uppercase mb-2">Get Featured</div>
        <h2 className="text-3xl font-bold mb-28">Let us show you off</h2>
        <div className="flex justify-between items-start">
          <div className="flex flex-col items-start justify-start w-3/4">
            <p className="text-md mb-6 text-left">
              Apply to be featured and let the opportunities come to you. We'll highlight your profile to top recruiters and companies searching for your skills.
            </p>
            <p className="text-sm mb-6">Oh, it's also 100% free.</p>
          </div>
          <div className="flex mt-20 gap-10 items-center justify-center relative cursor-pointer">
            <a href="#" className="text-white text-sm underline mr-10">Learn more</a>
            <div className="absolute right-[-50px] top-[-10px] w-16 h-16 p-2 bg-[#5a80fa] rounded-full items-center justify-start flex shadow-lg">
              <ArrowForwardIcon />
            </div>
          </div>
        </div>
      </div>
      
    )
}

export default Feature_Calculator