import React from "react";
import "./Graph.css"
// import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
function getEulerAnglesFromVector(x, y, z) {
    const pitch = Math.atan2(y, Math.sqrt(x * x + z * z));  // atan2(y, sqrt(x^2 + z^2))
    const yaw = Math.atan2(-x, z);  // atan2(-x, z)
    const roll = 0;  // No rotation around Z-axis in this case

    // Convert angles to degrees if necessary
    return {
        x: pitch,  // Convert radians to degrees
        y: yaw,
        z: roll
    };
}

var vertices = [
];

const edges = [
];

const str = `# Blender 4.0.2
# www.blender.org
mtllib starlowerpoly.mtl
o Cube
v -0.500000 -0.500000 0.500000
v -0.500000 0.500000 0.500000
v -0.500000 -0.500000 -0.500000
v -0.500000 0.500000 -0.500000
v 0.500000 -0.500000 0.500000
v 0.500000 0.500000 0.500000
v 0.500000 -0.500000 -0.500000
v 0.500000 0.500000 -0.500000
v -0.609568 -0.609568 -0.000000
v -0.609568 -0.000000 0.609568
v -0.609568 0.609568 0.000000
v -0.609568 -0.000000 -0.609568
v 0.000000 -0.609568 -0.609568
v -0.000000 0.609568 -0.609568
v 0.609568 -0.000000 -0.609568
v 0.609568 -0.609568 0.000000
v 0.609568 0.609568 0.000000
v 0.609568 -0.000000 0.609568
v -0.000000 -0.609568 0.609568
v -0.000000 0.609568 0.609568
v -0.839506 0.000000 0.000000
v 0.000000 0.000000 -0.839506
v 0.839506 0.000000 0.000000
v -0.000000 0.000000 0.839506
v 0.000000 -0.839506 0.000000
v -0.000000 0.839506 0.000000
v -3.420609 -1.282170 1.282170
v -3.420609 -1.282170 1.282170
v -3.420609 -1.282170 1.282170
v -3.420609 -1.282170 1.282170
v -3.420609 1.282170 1.282170
v -3.420609 1.282170 1.282170
v -3.420609 1.282170 1.282170
v -3.420609 1.282170 1.282170
v -3.420609 1.282170 -1.282170
v -3.420609 1.282170 -1.282170
v -3.420609 1.282170 -1.282170
v -3.420609 1.282170 -1.282170
v -3.420609 -1.282170 -1.282170
v -3.420609 -1.282170 -1.282170
v -3.420609 -1.282170 -1.282170
v -3.420609 -1.282170 -1.282170
v -1.282170 -1.282170 -3.420609
v -1.282170 -1.282170 -3.420609
v -1.282170 -1.282170 -3.420609
v -1.282170 -1.282170 -3.420609
v -1.282170 1.282170 -3.420609
v -1.282170 1.282170 -3.420609
v -1.282170 1.282170 -3.420609
v -1.282170 1.282170 -3.420609
v 1.282170 1.282171 -3.420609
v 1.282170 1.282171 -3.420609
v 1.282170 1.282171 -3.420609
v 1.282170 1.282171 -3.420609
v 1.282170 -1.282170 -3.420609
v 1.282170 -1.282170 -3.420609
v 1.282170 -1.282170 -3.420609
v 1.282170 -1.282170 -3.420609
v 3.420609 -1.282170 -1.282170
v 3.420609 -1.282170 -1.282170
v 3.420609 -1.282170 -1.282170
v 3.420609 -1.282170 -1.282170
v 3.420609 1.282170 -1.282170
v 3.420609 1.282170 -1.282170
v 3.420609 1.282170 -1.282170
v 3.420609 1.282170 -1.282170
v 3.420609 1.282170 1.282170
v 3.420609 1.282170 1.282170
v 3.420609 1.282170 1.282170
v 3.420609 1.282170 1.282170
v 3.420609 -1.282170 1.282170
v 3.420609 -1.282170 1.282170
v 3.420609 -1.282170 1.282170
v 3.420609 -1.282170 1.282170
v 1.282170 -1.282170 3.420609
v 1.282170 -1.282170 3.420609
v 1.282170 -1.282170 3.420609
v 1.282170 -1.282170 3.420609
v 1.282170 1.282170 3.420609
v 1.282170 1.282170 3.420609
v 1.282170 1.282170 3.420609
v 1.282170 1.282170 3.420609
v -1.282170 1.282170 3.420609
v -1.282170 1.282170 3.420609
v -1.282170 1.282170 3.420609
v -1.282170 1.282170 3.420609
v -1.282170 -1.282170 3.420609
v -1.282170 -1.282170 3.420609
v -1.282170 -1.282170 3.420609
v -1.282170 -1.282170 3.420609
v -1.282171 -3.420609 -1.282170
v -1.282171 -3.420609 -1.282170
v -1.282171 -3.420609 -1.282170
v -1.282171 -3.420609 -1.282170
v 1.282170 -3.420609 -1.282170
v 1.282170 -3.420609 -1.282170
v 1.282170 -3.420609 -1.282170
v 1.282170 -3.420609 -1.282170
v 1.282170 -3.420609 1.282170
v 1.282170 -3.420609 1.282170
v 1.282170 -3.420609 1.282170
v 1.282170 -3.420609 1.282170
v -1.282171 -3.420609 1.282170
v -1.282171 -3.420609 1.282170
v -1.282171 -3.420609 1.282170
v -1.282171 -3.420609 1.282170
v 1.282170 3.420609 -1.282170
v 1.282170 3.420609 -1.282170
v 1.282170 3.420609 -1.282170
v 1.282170 3.420609 -1.282170
v -1.282170 3.420609 -1.282170
v -1.282170 3.420609 -1.282170
v -1.282170 3.420609 -1.282170
v -1.282170 3.420609 -1.282170
v -1.282170 3.420609 1.282170
v -1.282170 3.420609 1.282170
v -1.282170 3.420609 1.282170
v -1.282170 3.420609 1.282170
v 1.282171 3.420609 1.282170
v 1.282171 3.420609 1.282170
v 1.282171 3.420609 1.282170
v 1.282171 3.420609 1.282170
s 0
f 27 28 29 30
f 10 28 27 1
f 21 29 28 10
f 9 30 29 21
f 1 27 30 9
f 31 32 33 34
f 2 32 31 10
f 11 33 32 2
f 21 34 33 11
f 10 31 34 21
f 35 36 37 38
f 11 36 35 21
f 4 37 36 11
f 12 38 37 4
f 21 35 38 12
f 39 40 41 42
f 21 40 39 9
f 12 41 40 21
f 3 42 41 12
f 9 39 42 3
f 43 44 45 46
f 12 44 43 3
f 22 45 44 12
f 13 46 45 22
f 3 43 46 13
f 47 48 49 50
f 4 48 47 12
f 14 49 48 4
f 22 50 49 14
f 12 47 50 22
f 51 52 53 54
f 14 52 51 22
f 8 53 52 14
f 15 54 53 8
f 22 51 54 15
f 55 56 57 58
f 22 56 55 13
f 15 57 56 22
f 7 58 57 15
f 13 55 58 7
f 59 60 61 62
f 15 60 59 7
f 23 61 60 15
f 16 62 61 23
f 7 59 62 16
f 63 64 65 66
f 8 64 63 15
f 17 65 64 8
f 23 66 65 17
f 15 63 66 23
f 67 68 69 70
f 17 68 67 23
f 6 69 68 17
f 18 70 69 6
f 23 67 70 18
f 71 72 73 74
f 23 72 71 16
f 18 73 72 23
f 5 74 73 18
f 16 71 74 5
f 75 76 77 78
f 18 76 75 5
f 24 77 76 18
f 19 78 77 24
f 5 75 78 19
f 79 80 81 82
f 6 80 79 18
f 20 81 80 6
f 24 82 81 20
f 18 79 82 24
f 83 84 85 86
f 20 84 83 24
f 2 85 84 20
f 10 86 85 2
f 24 83 86 10
f 87 88 89 90
f 24 88 87 19
f 10 89 88 24
f 1 90 89 10
f 19 87 90 1
f 91 92 93 94
f 13 92 91 3
f 25 93 92 13
f 9 94 93 25
f 3 91 94 9
f 95 96 97 98
f 7 96 95 13
f 16 97 96 7
f 25 98 97 16
f 13 95 98 25
f 99 100 101 102
f 16 100 99 25
f 5 101 100 16
f 19 102 101 5
f 25 99 102 19
f 103 104 105 106
f 25 104 103 9
f 19 105 104 25
f 1 106 105 19
f 9 103 106 1
f 107 108 109 110
f 14 108 107 8
f 26 109 108 14
f 17 110 109 26
f 8 107 110 17
f 111 112 113 114
f 4 112 111 14
f 11 113 112 4
f 26 114 113 11
f 14 111 114 26
f 115 116 117 118
f 11 116 115 26
f 2 117 116 11
f 20 118 117 2
f 26 115 118 20
f 119 120 121 122
f 26 120 119 17
f 20 121 120 26
f 6 122 121 20
f 17 119 122 6`;

const separateLines = str.split(/\r?\n|\r|\n/g);
for (let line of separateLines) {
    let data = line.split(/\s/g);
    // vertex
    if (data[0] == "v") {
        vertices.push({
            x: parseFloat(data[3]) * 30,
            y: parseFloat(-data[2]) * 30,
            z: parseFloat(data[1]) * 30
        });
    } else if (data[0] === "f") {
        const face = data.slice(1).map(v => Number(v) - 1); // Convert indices to 0-based
        if (face.length === 3) {
            // Triangle face (3 edges)
            edges.push([face[0], face[1]], [face[1], face[2]], [face[2], face[0]]);
        } else if (face.length === 4) {
            // Quad face (4 edges)
            edges.push([face[0], face[1]], [face[1], face[2]], [face[2], face[3]], [face[3], face[0]]);
        }
    }


    // else if (data[0] == "f") {
    //     const face = data.slice(-4).map(v => Number(v) - 1);
    //     edges.push([face[1], face[0]], [face[2], face[1]], [face[3], face[2], [face[0], face[3]]]);
    // }
}

export default function Graph() {

    return (
        <HashLink to="/articles#3dgraph" className="w-1/2 flex">
            <div className="max-w-full mx-auto flex flex-col items-center">

                <div className="scene">
                    <div className="graph">
                        {/* Render Vertices */}
                        {/* {vertices.map((v, i) => (
                    <div
                    key={i}
                    className="vertex"
                    style={{
                        transform: `translate3d(${v.x}px, ${v.y}px, ${v.z}px)`,
                        }}
                        ></div>
                        ))} */}

                        {/* Render Edges */}
                        {edges.map(([start, end], i) => {
                            const v1 = vertices[start];
                            const v2 = vertices[end];
                            const v3 = {
                                x: v2.x - v1.x,
                                y: v2.y - v1.y,
                                z: v2.z - v1.z
                            };
                            // Midpoint of the edge
                            const midX = (v1.x + v2.x) / 2;
                            const midY = (v1.y + v2.y) / 2;
                            const midZ = (v1.z + v2.z) / 2;

                            // Edge length (distance between points)
                            const distance = Math.sqrt(
                                (v2.x - v1.x) ** 2 + (v2.y - v1.y) ** 2 + (v2.z - v1.z) ** 2
                            );


                            // Calculate angles
                            const angleY = Math.atan2(v2.z - v1.z, v2.x - v1.x);
                            const angleX = Math.atan2(v2.y - v1.y, Math.sqrt((v2.x - v1.x) ** 2 + (v2.z - v1.z) ** 2));

                            return (
                                <div
                                    key={i}
                                    className="edge"
                                    style={{
                                        width: `${distance}px`,
                                        transform: `
                                translate3d(${midX}px, ${midY}px, ${midZ}px)
                                rotateY(${-angleY}rad)
                                rotateZ(${angleX}rad)
                                translateX(-50%)`, // Keeps it centered
                                    }}
                                ></div>
                            );
                        })}
                    </div>
                </div>
                <h2>Rendered with just divs and css</h2>
            </div>
        </HashLink>
    );
}