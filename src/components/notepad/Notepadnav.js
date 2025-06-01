import React from "react";
import { HashLink } from "react-router-hash-link";
export default function Notepadnav({ newNote, saveNotes, searchNotes, updateNodes }) {
    return (
        <header className="bg-gray-800 md:sticky top-0 z-10">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <div className="title-font font-medium text-white mb-4 md:mb-0">
                    <HashLink to="/#about" className="ml-3 text-xl">
                        Eric Nagtegaal
                    </HashLink>
                </div>
                <div className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center">
                    <HashLink to="/#projects" className="mr-5 hover:text-white">
                        Past Work
                    </HashLink>
                    <HashLink to="/vl" className="mr-5 hover:text-white">
                        VL App
                    </HashLink>
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
        </header>
    );
}