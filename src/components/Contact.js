import React from "react";
import { Link } from "react-router-dom";

export default function Contact() {
    return (
        <section id="contact" className="relative">
            <div className="container px-5 py-10 mx-auto">
                <div className="bg-gray-800 p-6 text-left flex-col justify-start space-y-6 border border-gray-800 rounded">

                    <h2 className="text-white sm:text-4xl text-3xl mb-4 font-medium title-font">
                        Contact Me
                    </h2>

                    <div>
                        <h3 className="title-font font-semibold text-white tracking-widest text-xs mb-1">
                            EMAIL
                        </h3>
                        <a className="text-indigo-400 text-lg hover:underline" href="mailto:ewnagteg@outlook.com">
                            ewnagteg@outlook.com
                        </a>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="flex flex-row justify-start gap-4">
                            <Link to="https://github.com/ewnagteg">
                                <div>
                                    <h2 className="sm:text-2xl text-white font-semibold">GitHub</h2>
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" width="60" height="60" alt="GitHub logo" />
                                </div>
                            </Link>
                            <Link to="https://www.linkedin.com/in/eric-nagtegaal-86b490279/">
                                <div>
                                    <h2 className="sm:text-2xl text-white font-semibold">LinkedIn</h2>
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-plain.svg" width="60" height="60" alt="LinkedIn logo" />
                                </div>
                            </Link>
                        </div>
                        {/* Could use existing backend, this is just easier for now */}
                        <form action="https://formspree.io/f/xanjerjj" method="POST" className="w-1/2 bg-gray-900 p-6 rounded-lg shadow-lg space-y-4">
                            <h2 className="text-white text-2xl font-bold">Contact Me</h2>

                            <div>
                                <label className="block text-white text-sm font-medium mb-1" htmlFor="name">Name</label>
                                <input className="w-full p-2 rounded bg-gray-800 text-white" type="text" name="name" required />
                            </div>

                            <div>
                                <label className="block text-white text-sm font-medium mb-1" htmlFor="email">Email</label>
                                <input className="w-full p-2 rounded bg-gray-800 text-white" type="email" name="email" required />
                            </div>

                            <div>
                                <label className="block text-white text-sm font-medium mb-1" htmlFor="message">Message</label>
                                <textarea className="w-full p-2 rounded bg-gray-800 text-white" name="message" rows="5" required></textarea>
                            </div>

                            <button className="inline-flex w-auto items-center text-white bg-green-500 border-0 py-2 px-6 min-w-max focus:outline-none hover:bg-green-600 rounded text-lg" type="submit">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </section>
    );
}