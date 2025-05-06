import React from "react";
import "./Cubes.css"

function getz(row, col) {
    return 0;
}

export default function Cubes() {

    const gridSize = 5; // 5x5 grid
    const gridItems = [];

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const zValue = getz(row, col); // Call getz(row, col) for Z translation

            gridItems.push(
                <div
                    key={`${row}-${col}`}
                    className="grid-item"
                    style={{ transform: `translateZ(${zValue}px)` }}
                ></div>
            );
        }
    }

    return (
        <section id="contact" className="relative">
            <div className="container px-5 py-10 mx-auto">
                <h2 className="text-white sm:text-4xl text-3xl mb-4 font-medium title-font">
                    Demo
                </h2>
                <div className="flex flex-col">
                    <div className="scene">
                        <div className="grid">{gridItems}</div>
                    </div>

                </div>
            </div>
        </section>
    );
}