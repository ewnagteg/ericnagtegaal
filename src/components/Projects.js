import { ChipIcon } from "@heroicons/react/solid";
import React from "react";
import { Link } from "react-router-dom";
import ReactGA from 'react-ga4';


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
                            <p className="text-white mb-2">
                                Built a web application for a fantasy league &#40;for Valorant ESport&#41; focused on the upcoming Masters tournament. Developed secure user authentication, profile editing, and a dynamic dashboard that tracks player stats over time. Designed and queried a relational SQLite database to aggregate performance data and visualize trends using Chart.js. Backend powered by Node.js and Express, with a responsive frontend in React.
                            </p>
                            <span className="title-font font-medium text-gray-400 text-sm">
                                Tech Stack: React.js, Node.js, SQLite, Auth0, Chart.js
                            </span>
                            <div className="mt-3">
                                <Link
                                    to="/vl"
                                    className="text-blue-400 hover:underline"
                                    onClick={() => {
                                        ReactGA.event({
                                            category: 'Navigation',
                                            action: 'Click Articles Link',
                                            label: 'Home Page'
                                        });
                                    }}
                                > View App </Link>
                            </div>
                        </div>
                    </div>
                    {/* Gift Recommendation App */}
                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="bg-gray-800 rounded flex flex-col p-4 h-full items-start">
                            <h2 className="text-lg font-bold text-white mb-2">Gift Recommendation App</h2>
                            <p className="text-white mb-2">
                                Designed and built an intelligent system that recommends personalized gifts based on users' social media activity. Developed backend in Python and used Selenium to scrape and group Pinterest data. Applied Cosine Similarity to match gift ideas with user preferences. Contributed to a responsive React.js frontend.
                            </p>
                            <span className="title-font font-medium text-gray-400 text-sm">
                                Tech Stack: Python, Selenium, Cosine Similarity, React.js
                            </span>
                        </div>
                    </div>

                    {/* Team Feedback Management Web App */}
                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="bg-gray-800 rounded flex flex-col p-4 h-full items-start">
                            <h2 className="text-lg font-bold text-white mb-2">Team Feedback Management Web App</h2>
                            <p className="text-white mb-2">
                                Developed a full-stack web application to collect and review team feedback using Ruby on Rails and PostgreSQL. Worked in a SCRUM team, adhering to industry practices like code reviews, pull requests, and Trello-based task tracking. Enforced stability via peer-approved merges. Deployed on Heroku and later adopted by the professor as a course template.
                            </p>
                            <span className="title-font font-medium text-gray-400 text-sm">
                                Tech Stack: Ruby on Rails, PostgreSQL, Heroku Deployment
                            </span>
                        </div>
                    </div>

                    {/* D&D Spell Management Web App */}
                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="bg-gray-800 rounded flex flex-col p-4 h-full items-start">
                            <h2 className="text-lg font-bold text-white mb-2">D&D Spell Management Web App</h2>
                            <p className="text-white mb-2">
                                Created a database-driven web application to manage Dungeons & Dragons spells. Designed and implemented a normalized PostgreSQL schema with custom filters and search features. Focused on data modeling, query optimization, and building a user-friendly interface.
                            </p>
                            <span className="title-font font-medium text-gray-400 text-sm">
                                Tech Stack: Ruby on Rails, PostgreSQL, Database Design
                            </span>
                        </div>
                    </div>

                    {/* Python Search Engine */}
                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="bg-gray-800 rounded flex flex-col p-4 h-full items-start">
                            <h2 className="text-lg font-bold text-white mb-2">Search Engine Project – MSCI 541</h2>
                            <p className="text-white mb-2">
                                Built a lightweight Python-based search engine implementing the BM25 ranking algorithm. Explored core concepts in information retrieval and natural language processing. Designed to return relevant search results with minimal overhead.
                            </p>
                            <span className="title-font font-medium text-gray-400 text-sm">
                                Tech Stack: Python, BM25 Ranking
                            </span>
                            <div className="mt-3">
                                <a
                                    href="https://github.com/ewnagteg/Python-Search-Engine"
                                    className="text-blue-400 hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    GitHub
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}