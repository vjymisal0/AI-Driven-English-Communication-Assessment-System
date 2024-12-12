import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Landing = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-white flex items-center justify-center relative py-16">
            <div className="grid max-w-screen-xl px-6 mx-auto lg:grid-cols-12 gap-8">
                {/* Left Content */}
                <div className="flex flex-col items-start justify-center lg:col-span-7 text-gray-800">
                    <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-indigo-600 sm:text-6xl md:text-7xl mb-4">
                        AI-Driven Interview Assistant
                    </h1>
                    <p className="mt-4 text-lg font-light sm:text-xl md:text-2xl text-gray-700 opacity-90">
                        Ace your interviews with cutting-edge AI tools that offer personalized preparation, mock interviews, and insightful feedback tailored just for you.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-6">
                        <button
                            onClick={() => navigate('/assessment')}
                            className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition-all duration-300"
                        >
                            Get Started
                            <svg
                                className="w-5 h-5 ml-2 -mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                       
                    </div>
                </div>

                {/* Right Content (Image with rounded edges) */}
                <div className="relative hidden lg:flex items-center justify-center lg:col-span-5">
                    <img
                        src="../ai_interview.png"
                        alt="AI Interview Assistant"
                        className="object-cover w-full h-full rounded-xl shadow-xl"
                    />
                </div>
            </div>
        </div>
    );
};
