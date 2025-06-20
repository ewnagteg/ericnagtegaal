import React, { useState, useEffect, useRef } from "react";
import { HashLink } from 'react-router-hash-link';
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


export default function Notepadnav({ newNote, saveNotes, searchNotes, updateNodes }) {
    const [hamburgToggle, setHamburgToggle] = useState(false);
    const wrapperRef = useRef(null);
    const { setMessage } = useMessage();

    useOutsideAlerter(wrapperRef, () => { setHamburgToggle(false) });
    return (
        <header className="bg-gray-800 md:sticky top-0 z-10">
            <div className="md:hidden flex justify-around p-2 relative">
                <div className="title-font font-medium text-white mb-4 mt-1 md:mb-0">
                    <HashLink to="/#about" className="ml-3 text-xl">
                        Eric Nagtegaal
                    </HashLink>
                </div>
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
                                    <button className="mr-5 hover:text-white"
                                        onClick={() => { newNote() }}>
                                        New Note
                                    </button>
                                </li>
                                <li>
                                    <button className="mr-5 hover:text-white"
                                        onClick={() => { saveNotes() }}>
                                        Save Notes
                                    </button>
                                </li>
                                <li>
                                    <button className="mr-5 hover:text-white"
                                        onClick={() => { searchNotes() }}>
                                        Search
                                    </button>
                                </li>
                                <li>
                                    <button className="mr-5 hover:text-white"
                                        onClick={() => { updateNodes() }}>
                                        Update Graph
                                    </button>
                                </li>
                                {/* {location.pathname in helpContent &&
                                    <li>
                                        <button
                                            onClick={showHelp}
                                            className="text-gray-400 hover:text-white"
                                        >
                                            Help
                                        </button>

                                    </li>
                                } */}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <div className="hidden md:flex flex-grow">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row md:items-center">
                    <div className="title-font font-medium text-white mb-4 md:mb-0">
                        <HashLink to="/#about" className="ml-3 text-xl">
                            Eric Nagtegaal
                        </HashLink>
                    </div>
                    <div className="mr-auto ml-4 py-1 pl-4 border-l border-gray-700 flex flex-wrap items-center text-base justify-center">
                        <button className="mr-5 hover:text-white"
                            onClick={() => { newNote() }}>
                            New Note
                        </button>
                        <button className="mr-5 hover:text-white"
                            onClick={() => { saveNotes() }}>
                            Save Notes
                        </button>
                        <button className="mr-5 hover:text-white"
                            onClick={() => { searchNotes() }}>
                            Search
                        </button>
                        <button className="mr-5 hover:text-white"
                            onClick={() => { updateNodes() }}>
                            Update Graph
                        </button>
                    </div>
                </div>
            </div>
        </header >
    );
}