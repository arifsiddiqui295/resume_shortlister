import React, { useState } from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const goToProfile = () => {
        setLoading(true);
        setTimeout(() => {
            navigate('/profile');
        }, 2000);
    };

    return (
        <div className='flex justify-between py-4 items-center px-8'
            style={{
                height: '10vh'
            }}
        >
            <div className="logo text-2xl"><img src="https://synques-dyn-cdn.s3.ap-south-1.amazonaws.com/oriental/images/logo.webp" alt="" /></div>
            <div className="navoptions flex gap-20 text-lg text justify-center">
                <a href="">Jobs</a>
                <a href="">For job seekers</a>
                <a href="">For companies</a>
            </div>
            <div className="flex gap-10">
                <a href='/profile' onClick={goToProfile} >
                    <Button
                        text="Profile"
                        className="w-40 h-10 border border-[#AAB1CE] rounded-xl"
                    />
                </a>

                <Button
                    text="Login for recruiters"
                    className="w-40 h-10 text-white bg-[#2B308B] rounded-xl"
                />

            </div>

        </div>
    );
};

export default Navbar;
