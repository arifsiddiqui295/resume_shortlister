import React from "react";
import { useState } from "react";
import request from "../api/request";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const StudentLogin = () => {
    const navigate = useNavigate();
    const [enrollment, setEnrollment] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const loginHandler = async (e) => {
        e.preventDefault();
        console.log(enrollment, password)
        setLoading(true)
        try {
            const res = await request('post', '/login/', { username: enrollment, password: password })
            console.log("res from login: ", res)
            if (res) {
                localStorage.setItem(ACCESS_TOKEN, res.access);
                localStorage.setItem(REFRESH_TOKEN, res.refresh);
                navigate("/profile")
            } else {
                navigate("/student-login")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Navbar />
            <div className="bg-gray-50 font-[sans-serif]">
                <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                    <div className="max-w-md w-full">
                        <a href="">
                            <img
                                src="https://synques-dyn-cdn.s3.ap-south-1.amazonaws.com/oriental/images/logo.webp"
                                alt="logo"
                                className="w-64 md:w-96 mb-8 mx-auto block"
                            />
                        </a>
                        <div className="p-6 md:p-8 rounded-2xl bg-white shadow">
                            <h2 className="text-gray-800 text-center text-2xl font-bold">
                                Login
                            </h2>
                            <form className="mt-6 space-y-4">
                                <div>
                                    <label className="text-gray-800 text-sm mb-2 block">
                                        Enrollment no.
                                    </label>
                                    <div className="relative flex items-center">
                                        <input
                                            value={enrollment}
                                            onChange={(e) => {
                                                setEnrollment(e.target.value)
                                            }}
                                            type="text"
                                            required=""
                                            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                            placeholder="Enter Enrollment no."
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="#bbb"
                                            stroke="#bbb"
                                            className="w-4 h-4 absolute right-4"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle cx={10} cy={7} r={6} data-original="#000000" />
                                            <path
                                                d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                                data-original="#000000"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-gray-800 text-sm mb-2 block">Password</label>
                                    <div className="relative flex items-center">
                                        <input
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value)
                                            }}
                                            type={passwordVisible ? "text" : "password"}
                                            required=""
                                            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                            placeholder="Enter password"
                                        />
                                        {passwordVisible ? (
                                            <img
                                                onClick={() => {
                                                    setPasswordVisible(!passwordVisible)
                                                }}
                                                className="w-4 h-4 absolute right-4 cursor-pointer"
                                                src="https://www.svgrepo.com/show/380007/eye-password-hide.svg" alt="" />
                                        ) : (
                                            <svg
                                                onClick={() => {
                                                    setPasswordVisible(!passwordVisible)
                                                }}
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="#bbb"
                                                stroke="#bbb"
                                                className="w-4 text-b h-4 absolute right-4 cursor-pointer"
                                                viewBox="0 0 128 128"
                                            >
                                                <path
                                                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                                                    data-original="#000000"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label
                                            htmlFor="remember-me"
                                            className="ml-3 block text-sm text-gray-800"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                    <div className="text-sm">
                                        <a
                                            href="jajvascript:void(0);"
                                            className="text-blue-600 hover:underline font-semibold"
                                        >
                                            Forgot your password?
                                        </a>
                                    </div>
                                </div>
                                <div className="!mt-8">
                                    <button
                                        onClick={loginHandler}
                                        type="button"
                                        className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                                    >
                                        {
                                            !loading ? (
                                                <p className="text-lg">Login</p>
                                            ) : (
                                                <>
                                                    <div className="flex space-x-2 justify-center items-center dark:invert">
                                                        <div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.3s]" />
                                                        <div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.3s]" />
                                                        <div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.3s]" />
                                                    </div>
                                                </>
                                            )
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StudentLogin;