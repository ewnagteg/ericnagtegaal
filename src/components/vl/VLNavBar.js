import React, { useState, useEffect, useRef } from "react";
import { HashLink } from 'react-router-hash-link';
import { useLocation } from "react-router-dom";
import { useMessage } from "../MessageProvider";

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
    const { setMessage } = useMessage();
    const location = useLocation(); // current route
    const helpContent = {
        "/team-stats":
            <div>
                This page breaks down each player's team's points by each Valorant player they have.
            </div>
        ,
        "/stats":
            <div>
                <p className="mb-2">
                    The Leaderboard page displays rankings and points per player.
                </p>
                <p className="mb-2">
                    <strong>Projected Fantasy Point Distribution</strong> shows a histogram of possible simulated outcomes for the tournament.
                    <br />
                    For example, more bars to the right mean it’s more likely that player will win.
                </p>
                <p>
                    <strong>Fantasy Points Standings Over Time</strong> shows a line graph of the number of points each player got at each match.
                </p>
            </div>
        ,
        "/profile":
            <div>
                This page allows you to change your username that will be displayed.
            </div>

    };

    const showHelp = () => {
        const curPath = location.pathname;
        const helpMessage = helpContent[curPath] || "";
        if (helpMessage)
            setMessage(helpMessage); // Display the help message in the modal
    };

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
                                    <HashLink to="/edit-team#top" className="mr-5 hover:text-white">
                                        Edit Team
                                    </HashLink>
                                </li>
                                <li>
                                    <HashLink to="/team-stats#top" className="hover:text-blue-600">
                                        Teams
                                    </HashLink>
                                </li>
                                <li>
                                    <HashLink to="/stats#top" className="hover:text-blue-600">
                                        Leaderboard
                                    </HashLink>
                                </li>
                                <li>
                                    <HashLink to="/profile#top" className="hover:text-blue-600">
                                        Profile
                                    </HashLink>
                                </li>
                                <li>
                                    <HashLink to="/vl/group" className="mr-5 hover:text-white">
                                        Groups
                                    </HashLink>
                                </li>
                                {location.pathname in helpContent &&
                                    <li>
                                        <button
                                            onClick={showHelp}
                                            className="text-gray-400 hover:text-white"
                                        >
                                            Help
                                        </button>

                                    </li>
                                }
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
                    <div className="mr-auto ml-4 py-1 pl-4 border-l border-gray-700 flex flex-wrap items-center text-base justify-center">
                        <HashLink to="/vl" className="mr-5 hover:text-white">
                            VL Home
                        </HashLink>
                        <HashLink to="/edit-team#top" className="mr-5 hover:text-white">
                            Edit Team
                        </HashLink>
                        <HashLink to="/team-stats#top" className="mr-5 hover:text-white">
                            Teams
                        </HashLink>
                        <HashLink to="/stats#top" className="mr-5 hover:text-white">
                            Leaderboard
                        </HashLink>
                        <HashLink to="/profile#top" className="mr-5 hover:text-white">
                            Profile
                        </HashLink>
                        <HashLink to="/vl/group" className="mr-5 hover:text-white">
                            Groups
                        </HashLink>
                        {location.pathname in helpContent &&
                            <button
                                onClick={showHelp}
                                className="border-l border-gray-700 pl-4 text-gray-400 hover:text-white ml-4"
                            >
                                Help
                            </button>
                        }
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