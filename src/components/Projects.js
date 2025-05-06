import { ChipIcon } from "@heroicons/react/solid";
import React from "react";




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
                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="bg-gray-800 rounded flex flex-col p-4 h-full items-start">
                            <h2 className="text-lg font-bold text-white mb-2">
                                Gift Recommendation App
                            </h2>
                            <p className="text-white mb-2">
                                A personalized gift recommendation system that analyzes social media data to suggest gifts using Cosine Similarity.
                            </p>
                            <span className="title-font font-medium text-gray-400 text-sm">
                                Tech Stack: Python, MySQL, Cosine Similarity, Web Scraping
                            </span>
                        </div>
                    </div>

                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="bg-gray-800 rounded flex flex-col p-4 h-full items-start">
                            <h2 className="text-lg font-bold text-white mb-2">
                                Team Feedback Management Web App
                            </h2>
                            <p className="text-white mb-2">
                                A web app built for managing team feedback, developed in a SCRUM team. Used by a professor as a template for future classes.
                            </p>
                            <span className="title-font font-medium text-gray-400 text-sm">
                                Tech Stack: Ruby on Rails, PostgreSQL, Heroku Deployment
                            </span>
                        </div>
                    </div>

                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="bg-gray-800 rounded flex flex-col p-4 h-full items-start">
                            <h2 className="text-lg font-bold text-white mb-2">
                                D&D Spell Management Web App
                            </h2>
                            <p className="text-white mb-2">
                                A database-driven web app for managing D&D spells, built as a final project in Software and Database Design.
                            </p>
                            <span className="title-font font-medium text-gray-400 text-sm">
                                Tech Stack: PostgreSQL, Web Development
                            </span>
                        </div>
                    </div>

                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="bg-gray-800 rounded flex flex-col p-4 h-full items-start">
                            <h2 className="text-lg font-bold text-white mb-2">
                                Search Engine Project – MSCI 541
                            </h2>
                            <p className="text-white mb-2">
                                Implemented a Python-based search engine using BM25 ranking to generate search results.
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