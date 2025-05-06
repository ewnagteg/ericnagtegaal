
function height(x, y, z) {
    return Math.sqrt(x * x + y * y + z * z);
}

function getVertexHeight(vertex, positions) {
    return height(positions[3*vertex], positions[3*vertex + 1], positions[3*vertex + 2]);
}


function getDist(x1, y1, z1, x2, y2, z2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) + (z1 - z2) * (z1 - z2));
}

function setRain(waterbuffer, water, rainfall) {
    for (let vertex in waterbuffer) {
        water[vertex] += waterbuffer[vertex] + rainfall;
        waterbuffer[vertex] = 0;
    }
}

function getSlope(positions, v1, v2, water) {
    let h1 = getVertexHeight(v1, positions) + water[v1];
    let x1 = positions[3*v1] / h1;
    let y1 = positions[3*v1 + 1] / h1;
    let z1 = positions[3*v1 + 2] / h1;

    let h2 = getVertexHeight(v2, positions) + water[v2];
    let x2 = positions[3*v2] / h2;
    let y2 = positions[3*v2 + 1] / h2;
    let z2 = positions[3*v2 + 2] / h2;

    let base = getDist(x1, y1, z1, x2, y2, z2);
    return (h1 - h2) / base;
}

function stepRain(waterbuffer, water, slopes, flowbuffer, positions, vertexConnections) {
    for (let vertex in waterbuffer) {
        let max = -Infinity;
        let cons = vertexConnections[vertex];
        let target = cons[0];
        for (let con of cons) {
            let slope = getSlope(positions, vertex, con, water);
            if (slope > max) {
                max = slope;
                target = con;
            }
        }
        if (max > 0) {
            let flow = water[vertex]/2;
            waterbuffer[target] += flow;
            waterbuffer[vertex] -= flow;
            flowbuffer[vertex] = flow;
        } else {
            waterbuffer[target] = 0;
            waterbuffer[vertex] = 0;
            flowbuffer[vertex] = 0;

        }
        if (water[vertex] > 0.1)
            water[vertex] = 0.1;
        slopes[vertex] = max;
    }
}

function stepErrosion(slopes, flowbuffer, positions) {
    for (let vertex in flowbuffer) {
        let delta = -0.05 * Math.pow(flowbuffer[vertex], 0.8) * Math.pow(slopes[vertex]/2, 2.);
        if (!isNaN(delta)) {
            let h = getVertexHeight(vertex, positions);
            let adjust = (h + delta/15) / h;

            positions[3 * vertex] *= adjust;
            positions[3 * vertex + 1] *= adjust;
            positions[3 * vertex + 2] *= adjust;
        }
    }
}

self.onmessage = function (event) {
    const { positions, indices } = event.data;
    function getVertexConnections(positions, indices) {
        const vertexConnections = {};
        // init verts
        for (let i = 0; i < positions.length / 3; i++) {
            vertexConnections[i] = new Set(); // Use a Set to avoid duplicate entries
        }
        // Iterate over each triangle (each group of 3 indices)
        for (let i = 0; i < indices.length; i += 3) {
            const v1 = indices[i];
            const v2 = indices[i + 1];
            const v3 = indices[i + 2];

            // Map each vertex to its connected vertices
            vertexConnections[v1].add(v2);
            vertexConnections[v1].add(v3);

            vertexConnections[v2].add(v1);
            vertexConnections[v2].add(v3);

            vertexConnections[v3].add(v1);
            vertexConnections[v3].add(v2);
        }

        // Convert Sets to Arrays for easier manipulation
        for (let key in vertexConnections) {
            vertexConnections[key] = Array.from(vertexConnections[key]);
        }

        return vertexConnections;
    }

    // for (let i=0; i<=positions.length-3; i+=3) {
    //     let h = getVertexHeight(i/3, positions);
    //     positions[i] /= h;
    //     positions[i+1] /= h;
    //     positions[i+2] /= h;

    // }

    // You could add additional processing with `indices` here if needed
    const allVertexConnections = getVertexConnections(positions, indices);
    let water = {};
    let waterbuffer = {};
    let slopes = {};
    let flowbuffer = {};
    for (let i = 0; i <= positions.length - 3; i += 3) {
        water[i/3] = 0.;
        waterbuffer[i/3] = 0;
        slopes[i/3] = 0;
        flowbuffer[i/3] = 0;
    }
    for (let rnd=0; rnd<150; rnd++) {
        setRain(waterbuffer, water, 0.05);
        stepRain(waterbuffer, water, slopes, flowbuffer, positions, allVertexConnections);
        stepErrosion(slopes, flowbuffer, positions);
    }
    // for (let i = 0; i <= positions.length - 3; i += 3) {
    //     let h = getVertexHeight(i/3, positions);
    //     positions[i] *= (h+water[i/3])/h;
    //     positions[i+1] *= (h+water[i/3])/h;
    //     positions[i+2] *= (h+water[i/3])/h;
    // }
    self.postMessage({ positions: positions });
};