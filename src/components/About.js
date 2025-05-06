import React from "react";


export default function About() {
  return (
    <section id="about">
      <div className="container mx-auto flex px-10 py-20 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
            Hi, I'm Eric.
          </h1>
          <p className="mb-8 leading-relaxed">
          <br className="hidden lg:inline-block" /> 
          I'm a passionate technologist with a robust background in data analysis and web development. With a BASc in Management Engineering and hands-on experience from co-op roles, I've honed my skills in transforming complex datasets into actionable insights while building intuitive, user-centered web applications. 
        <br className="hidden lg:inline-block" />
        Whether it's streamlining supply chain processes with automated Python systems at Loblaw or developing dynamic dashboards and full-stack solutions using Angular.js, React.js, and Ruby on Rails, I thrive on merging the precision of data analytics with the creativity of web development.

          </p>
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
          </div>
        </div>
      </div>
    </section>
  );
}