import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

export default function HeroSection() {
    return (
        <div>

            <div className="flex flex-col md:flex-row h-fit px-4 py-2  bg-gray-50">
                {/* Left Section */}
                <div className="md:w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-12 rounded-r-[3rem] rounded-l-[3rem] shadow-xl">
                    <div className="max-w-lg">
                        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                            Find <span className="text-blue-300">Talent</span>
                        </h1>
                        <p className="mt-6 text-lg text-blue-200">
                            Aggregates job opportunities from multiple sources.
                        </p>

                        {/* Feature Highlights */}
                        <div className="mt-12 space-y-5">
                            {[
                                "Seamless Application Process",
                                "Personalized Job Alerts",
                                "Salary Insights",
                                "Company Reviews"
                            ].map((text, idx) => (
                                <div
                                    key={idx}
                                    className={`p-5 rounded-xl backdrop-blur-sm hover:scale-105 transition-transform
                                    ${idx % 2 === 0 ? 'bg-blue-500/30' : 'bg-indigo-500/30'}`}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-3 h-3 rounded-full ${idx % 2 === 0 ? 'bg-blue-300' : 'bg-indigo-300'}`} />
                                        <span className="text-lg font-medium">{text}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="md:w-1/2 flex flex-col justify-center items-center p-12">
                    <div className="max-w-md w-full text-center">
                        <h2 className="text-5xl font-bold text-gray-800 leading-snug">
                            Transforming <br /> <span className="text-blue-600">Job Search</span> Experience
                        </h2>
                        <p className="mt-5 text-lg text-gray-600">
                            Explore an extensive database of jobs from top companies.
                        </p>

                        {/* Search Bar */}
                        <div className="mt-8 relative">
                            <div className="relative flex items-center bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow">
                                <input
                                    type="text"
                                    placeholder="Occupation, company, or role..."
                                    className="flex-grow pl-6 pr-4 py-3 focus:outline-none text-gray-800 placeholder-gray-400"
                                />
                                <button className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                                    <IoSearch size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-8 flex space-x-4">
                            <button className="flex-1 px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition">
                                Get Vacancy
                            </button>
                            <button className="flex-1 px-8 py-4 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition">
                                Upload Resume
                            </button>
                        </div>

                        {/* Social Icons */}
                        <div className="mt-12 flex justify-center space-x-6 text-gray-500">
                            <FaFacebook size={28} className="hover:text-blue-600 transition" />
                            <FaInstagram size={28} className="hover:text-pink-600 transition" />
                            <FaLinkedin size={28} className="hover:text-blue-800 transition" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
