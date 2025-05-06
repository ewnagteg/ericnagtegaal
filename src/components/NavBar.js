import React from "react";
import { HashLink } from 'react-router-hash-link';
export default function Navbar() {
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
        </div>
        <a
          href="/#contact"
          className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
          Hire Me
        </a>
      </div>
    </header>
  );
}