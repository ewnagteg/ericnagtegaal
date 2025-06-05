import React from "react";


export default function About() {
    return (
        <section id="about">
            <div className="container mx-auto flex px-10 py-20 md:flex-row flex-col items-center">
                <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
                        Hi, I'm Eric.
                    </h1>
                    <div>
                        <p className="mb-8 leading-relaxed">
                            Software developer with a background in Management Engineering, blending AI, automation, and full-stack development to craft efficient, user-friendly solutions.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <a
                            href="#contact"
                            className="inline-flex w-auto items-center text-white bg-green-500 border-0 py-2 px-6 min-w-max focus:outline-none hover:bg-green-600 rounded text-lg">
                            Work With Me
                        </a>
                        <a
                            href="#articles"
                            className="inline-flex w-auto items-center text-gray-400 bg-gray-800 border-0 min-w-max py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">
                            See My Past Work
                        </a>
                        <a
                            href="https://www.linkedin.com/in/eric-nagtegaal-86b490279/"
                            className="inline-flex w-auto items-center text-gray-400 bg-gray-800 border-0 min-w-max py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">
                            Linkedin
                        </a>
                        <a
                            href="https://github.com/ewnagteg"
                            className="inline-flex w-auto items-center text-gray-400 bg-gray-800 border-0 min-w-max py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">
                            Github
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}