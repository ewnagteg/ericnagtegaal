import React from "react";
import { HashLink } from 'react-router-hash-link';

export default function VLNavBar() {
  return (
    <header className="bg-gray-800 md:sticky top-0 z-10">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <div className="title-font font-medium text-white mb-4 md:mb-0">
          <HashLink to="/" className="ml-3 text-xl">
            Home
          </HashLink>
        </div>
        <div className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center">
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
      </div>
    </header>
  );
}