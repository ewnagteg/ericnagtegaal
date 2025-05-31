import React from "react";

export default function Contact() {
    return (
        <section id="contact" className="relative">
            <div className="container px-5 py-10 mx-auto">
                <h2 className="text-white sm:text-4xl text-3xl mb-4 font-medium title-font">
                    Contact Me
                </h2>
                <div className="flex flex-col">
                    <h3 className="title-font font-semibold text-white tracking-widest text-xs mb-1">
                        EMAIL
                    </h3>
                    <a className="text-indigo-400 text-lg hover:underline" href="mailto:ewnagteg@outlook.com">
                        ewnagteg@outlook.com
                    </a>
                </div>
            </div>
        </section>
    );
}