import React from "react";


export default function About() {
    return (
        <section id="about">
            <div className="container mx-auto flex px-10 py-20 md:flex-row flex-col items-center">
                <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
                        Hi, I'm Eric.
                    </h1>
                    <div className="relative group">
                        <p className="mb-8 leading-relaxed transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0">
                            Software developer with a background in Management Engineering, blending AI, automation, and full-stack development to craft efficient, user-friendly solutions.
                        </p>
                        <p className="mb-8 leading-relaxed transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100">
                            I'm a passionate technologist with a robust background in data analysis and web development. With a BASc in Management Engineering and hands-on experience from co-op roles, I've honed my skills in transforming complex datasets into actionable insights while building intuitive, user-centered web applications.
                            <br />
                            Whether it's streamlining supply chain processes with automated Python systems at Loblaw or developing dynamic dashboards and full-stack solutions using Angular.js, React.js, and Ruby on Rails, I thrive on merging the precision of data analytics with the creativity of web development.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <a
                            href="#contact"
                            className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">
                            Work With Me
                        </a>
                        <a
                            href="#articles"
                            className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">
                            See My Past Work
                        </a>
                        <a
                            href="https://www.linkedin.com/in/eric-nagtegaal-86b490279/"
                            className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">
                            Linkedin
                        </a>
                        <a
                            href="https://github.com/ewnagteg"
                            className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">
                            Github
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}