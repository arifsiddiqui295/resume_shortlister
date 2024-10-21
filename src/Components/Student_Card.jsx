import React from 'react'
import Button from './Button';
const Student_Card = () => {
    return (
        <div className='px-32 py-10'>
            <div className='w-full flex bg-[#ffffff] shadow-lg px-5 rounded-lg py-16'>
                <div className='flex items-center gap-10'>
                    <div className='flex gap-16 items-center'>
                        <img className='w-32 h-32 rounded-full ' src="https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        <div className='flex flex-col text-left'>
                            <div className='flex items-center gap-2 text-white mb-10'>
                                <h1 className='text-black text-3xl'>Kalyani Singh Rajput</h1>
                                <i className="ri-pencil-line text-[#717B9E] mt-1 text-2xl "></i>
                            </div>
                            <div className='flex gap-5'>
                                <div className='flex flex-col gap-4'>
                                    <div className='flex gap-3 items-center'>
                                        <i class="ri-map-pin-line text-[#717B9E]"></i>
                                        <p className='text-[#275DF5] text-lg font-medium'>Add current location</p>
                                    </div>
                                    <div className='flex gap-3 items-center'>
                                        <i class="ri-men-line text-[#717B9E]"></i>
                                        <p className='text-[#275DF5] text-lg font-medium'>Add Gender</p>
                                    </div>
                                    <div className='flex gap-3 items-center'>
                                        <i class="ri-cake-2-line text-[#717B9E]"></i>
                                        <p className='text-[#275DF5] text-lg font-medium'>Add birthday</p>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <div className='flex items-center gap-2'>
                                        <div className='flex gap-3 items-center'>
                                            <i class="ri-phone-line text-[#717B9E]"></i>
                                            <p className='text-[#717B9E] text-lg font-medium'>8770993602</p>
                                        </div>
                                        <a href="" className='text-[#275DF5] font-bold'>Verify</a>
                                    </div>
                                    <div className='flex items-center'>
                                        <div className='flex gap-3'>
                                            <i class="ri-mail-line text-[#717B9E]"></i>
                                            <p className='text-[#717B9E] text-lg font-medium'>arifsiddiqui2905@gmail.com</p>
                                        </div>
                                        <p><i class="ri-verified-badge-fill p-2 text-green-400"></i></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-96 flex flex-col gap-5 rounded-lg px-7 py-5 bg-[#CEDEFF]'>
                        <div className='flex justify-between items-center '>
                            <div className='flex gap-2 items-center'>
                                <div className='w-12 h-12 rounded-full bg-white flex items-center justify-center'>
                                    <i class="ri-graduation-cap-line text-3xl font-mono text-[#717B9E]"></i>
                                </div>
                                <p className='text-md font-semibold'>Add Education</p>
                            </div>
                            <div className='flex gap-2 bg-white items-center w-20 h-7 px-2 rounded-2xl text-green-400 text-xl'>
                                <i class="ri-arrow-up-line "></i>
                                <p>10%</p>
                            </div>
                        </div>
                        <div className='flex justify-between items-center '>
                            <div className='flex gap-2 items-center'>
                                <div className='w-12 h-12 rounded-full bg-white flex items-center justify-center'>
                                    <i class="ri-mobile-download-line text-3xl font-mono text-[#717B9E]"></i>
                                </div>
                                <p className='text-md font-semibold'>Verify Mobile</p>
                            </div>
                            <div className='flex gap-2 bg-white items-center w-20 h-7 px-2 rounded-2xl text-green-400 text-xl'>
                                <i class="ri-arrow-up-line "></i>
                                <p>10%</p>
                            </div>
                        </div>
                        <div className='flex justify-between items-center '>
                            <div className='flex gap-2 items-center'>
                                <div className='w-12 h-12 rounded-full bg-white flex items-center justify-center'>
                                    <i class="ri-graduation-cap-line text-3xl font-mono text-[#717B9E]"></i>
                                </div>
                                <p className='text-md font-semibold'>Add Details</p>
                            </div>
                            <div className='flex gap-2 bg-white items-center w-20 h-7 px-2 rounded-2xl text-green-400 text-xl'>
                                <i class="ri-arrow-up-line "></i>
                                <p>10%</p>
                            </div>
                        </div>
                        <Button text="Add 16 missing details" className='bg-[#275df5] rounded-2xl py-3 text-white '/>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default Student_Card