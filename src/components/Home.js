import React from "react";
import Navbar from "./NavBar";
import Contact from "./Contact";
import About from './About.js';
import Projects from './Projects.js';
import Graph from "./Graph.js";
import { Link } from "react-router-dom";
import ReactGA from 'react-ga4';

export default function Home() {
    return (<main className="text-gray-400 bg-gray-900 body-font">
        <Navbar />
        <div className="max-w-[85%] mx-auto flex justify-center items-start">
            <div className="w-1/2 flex">
                <About />
            </div>
            <div className="w-1/2 flex">
                <Graph />
            </div>
        </div>
        <section id="projects" href="/#projects">
            <Projects />
        </section>
        <section id="articles" className="relative py-10">
            <div className="container mx-auto px-5">
                <h2 className="text-white sm:text-4xl text-3xl mb-4 font-medium title-font">
                    Experiments & Small Projects
                </h2>
                <p className="text-gray-400 mb-6">
                    Just a collection of small projects, experiments, and things I find interesting.
                    Not necessarily groundbreaking, but fun to build and explore.
                </p>

                <Link
                    to="/articles"
                    className="text-indigo-400 hover:underline"
                    onClick={() => {
                        ReactGA.event({
                            category: 'Navigation',
                            action: 'Click Articles Link',
                            label: 'Home Page'
                        });
                    }}
                >
                    View All Articles →
                </Link>
            </div>
        </section>
        <section href="/#contact">
            <Contact />
        </section>

    </main>)
};