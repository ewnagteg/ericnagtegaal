import { ChipIcon } from "@heroicons/react/solid";
import React from "react";
import { Link } from "react-router-dom";
import ReactGA from "react-ga4";


export default function Projects() {
    return (
        <section id="skills" href="/#projects">
            <div className="container px-5 py-10 mx-auto">
                <div className="text-center mb-20">
                    <ChipIcon className="w-10 inline-block mb-4" />
                    <h1 className="sm:text-4xl text-3xl font-medium title-font text-white mb-4">
                        Projects &amp; Experience
                    </h1>
                    {/* <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
                       
                    </p> */}
                </div>
                <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
                    {/* Multiplayer Stats Dashboard */}
                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="bg-gray-800 rounded flex flex-col p-4 h-full items-start">
                            <h2 className="text-lg font-bold text-white mb-2">Fantasy League</h2>
                            <img
                                src="vldemo.gif"
                                alt="Notepad Demo"
                                className="rounded mb-4 w-full"
                            />
                            <ul className="text-white text-sm space-y-1 mb-4 leading-relaxed list-disc list-inside">
                                <li>Fantasy web app for Valorant Masters tournament</li>
                                <li>Secure login & user profiles (Auth0)</li>
                                <li>Interactive player stats & dashboards (Chart.js)</li>
                                <li>SQLite backend queried via Node/Express API</li>
                                <li>Fully responsive React frontend</li>
                            </ul>

                            <span className="text-gray-400 text-xs mb-3">
                                Tech: React, Node.js, SQLite, Chart.js, Auth0
                            </span>
                            <div className="mt-3">
                                <Link
                                    to="/vl"
                                    className="text-blue-400 hover:underline"
                                    onClick={() => {
                                        ReactGA.event({
                                            category: "Navigation",
                                            action: "Click VL Link",
                                            label: "VL"
                                        });
                                    }}
                                > View App </Link>
                                <Link
                                    to="https://github.com/ewnagteg/ericnagtegaal/tree/main/src/components/vl"
                                    className="ml-3 text-blue-400 hover:underline"
                                > github </Link>
                            </div>
                        </div>
                    </div>
                    {/* Notepad App */}
                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="bg-gray-800 rounded flex flex-col p-4 h-full items-start">
                            <h2 className="text-lg font-bold text-white mb-2">Notepad App</h2>
                            <img
                                src="notepaddemo.gif"
                                alt="Notepad Demo"
                                className="rounded mb-4 w-full"
                            />
                            <ul className="text-white text-sm space-y-1 mb-4 leading-relaxed list-disc list-inside">
                                <li>Drag-and-drop notepad with 2D layout</li>
                                <li>Full CRUD, search, and persistence (SQLite)</li>
                                <li>TF-IDF + K-means clustering of notes</li>
                                <li>Real-time particle simulation for cluster layout</li>
                                <li>Secured with Auth0</li>
                            </ul>

                            <span className="text-gray-400 text-xs mb-3">
                                Tech: React, Node.js, SQLite, Auth0, React Flow
                            </span>
                            <div className="mt-3 flex flex-row">
                                <Link
                                    to="/notepad"
                                    className="text-blue-400 hover:underline"
                                    onClick={() => {
                                        ReactGA.event({
                                            category: "Navigation",
                                            action: "Click Notepad Link",
                                            label: "Notepad"
                                        });
                                    }}
                                > View App </Link>
                                <Link
                                    to="https://github.com/ewnagteg/ericnagtegaal/tree/main/src/components/notepad"
                                    className="ml-3 text-blue-400 hover:underline"
                                > github </Link>
                            </div>
                        </div>
                    </div>
                    {/* Gift Recommendation App */}
                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="bg-gray-800 rounded flex flex-col p-4 h-full items-start">
                            <h2 className="text-lg font-bold text-white mb-2">Gift Recommendation App</h2>
                            <ul className="text-white text-sm space-y-1 mb-4 leading-relaxed list-disc list-inside">
                                <li>Personalized gift suggestions from social media patterns</li>
                                <li>Scraped and categorized Pinterest data with Selenium</li>
                                <li>Used Cosine Similarity to match gifts to user interests</li>
                                <li>Built backend in Python with a responsive React UI</li>
                            </ul>

                            <span className="text-gray-400 text-xs">
                                Tech: Python, Selenium, Cosine Similarity, React.js
                            </span>
                            <div className="mt-3 flex flex-row">
                                <Link
                                    to="https://github.com/vatsalbora/GiftGuru"
                                    className="ml-3 text-blue-400 hover:underline"
                                > github </Link>
                            </div>
                        </div>
                    </div>

                    {/* Team Feedback Management Web App */}
                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="bg-gray-800 rounded flex flex-col p-4 h-full items-start">
                            <h2 className="text-lg font-bold text-white mb-2">Team Feedback Management Web App</h2>
                            <ul className="text-white text-sm space-y-1 mb-4 leading-relaxed list-disc list-inside">
                                <li>Collected and reviewed peer feedback via full-stack app</li>
                                <li>Built with Ruby on Rails and PostgreSQL</li>
                                <li>Collaborated in a SCRUM team with code reviews & PRs</li>
                                <li>Tracked tasks using Trello, deployed on Heroku</li>
                                <li>Adopted as a course template by the instructor</li>
                            </ul>

                            <span className="text-gray-400 text-xs">
                                Tech: Ruby on Rails, PostgreSQL, Heroku
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}