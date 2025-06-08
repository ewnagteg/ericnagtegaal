import React, { useState, useEffect, useRef } from "react";
import { HashLink } from 'react-router-hash-link';

function useOutsideAlerter(ref, callback = () => { }) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

export default function VLNavBar() {
    const [hamburgToggle, setHamburgToggle] = useState(false);
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, () => { setHamburgToggle(false) });
    return (
        <header className="bg-gray-800 md:sticky top-0 z-10">
            <div ref={wrapperRef} className="md:hidden flex justify-around p-2 relative">
                <div className="title-font font-medium text-white mb-4 mt-1 md:mb-0">
                    <HashLink to="/" className="ml-3 text-xl">
                        Home
                    </HashLink>
                </div>
                {/* hamburger */}
                <div className="relative inline-block">

                    <button
                        type="button"
                        onClick={() => setHamburgToggle(!hamburgToggle)}
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>

                    {/* drop menu */}
                    {hamburgToggle && (
                        <div className="absolute top-14 right-0 w-40 bg-gray-600 border-gray-900 border rounded shadow-md z-50">
                            <ul className="flex flex-col p-2 space-y-2">
                                <li>
                                    <HashLink to="/vl" className="mr-5 hover:text-white">
                                        VL App
                                    </HashLink>
                                </li>
                                <li>
                                    <HashLink to="/edit-team" className="mr-5 hover:text-white">
                                        Edit Team
                                    </HashLink>
                                </li>
                                <li>
                                    <HashLink to="/stats" className="hover:text-blue-600">
                                        Leaderboard
                                    </HashLink>
                                </li>
                                <li>
                                    <HashLink to="/profile" className="hover:text-blue-600">
                                        Profile
                                    </HashLink>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <div className="hidden md:flex flex-grow">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row md:items-center">
                    <div className="title-font font-medium text-white mb-4 md:mb-0">
                        <HashLink to="/#about" className="ml-3 text-xl">
                            Home
                        </HashLink>
                    </div>
                    <div className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700 flex flex-wrap items-center text-base justify-center">
                        <HashLink to="/vl" className="mr-5 hover:text-white">
                            VL Home
                        </HashLink>
                        <HashLink to="/edit-team" className="mr-5 hover:text-white">
                            Edit Team
                        </HashLink>
                        <HashLink to="/stats" className="mr-5 hover:text-white">
                            Leaderboard
                        </HashLink>
                        <HashLink to="/profile" className="mr-5 hover:text-white">
                            Profile
                        </HashLink>
                    </div>
                    <a
                        href="/#contact"
                        className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
                        Hire Me
                    </a>
                </div>
            </div>
        </header>
    );
}