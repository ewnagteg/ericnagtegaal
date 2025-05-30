// Porter stemmer in Javascript. Few comments, but it's easy to follow against the rules in the original
// paper, in
//
//  Porter, 1980, An algorithm for suffix stripping, Program, Vol. 14,
//  no. 3, pp 130-137,
//
// see also http://www.tartarus.org/~martin/PorterStemmer

// Release 1 be 'andargor', Jul 2004
// Release 2 (substantially revised) by Christopher McKenzie, Aug 2009

var stemmer = (function () {
    var step2list = {
        "ational": "ate",
        "tional": "tion",
        "enci": "ence",
        "anci": "ance",
        "izer": "ize",
        "bli": "ble",
        "alli": "al",
        "entli": "ent",
        "eli": "e",
        "ousli": "ous",
        "ization": "ize",
        "ation": "ate",
        "ator": "ate",
        "alism": "al",
        "iveness": "ive",
        "fulness": "ful",
        "ousness": "ous",
        "aliti": "al",
        "iviti": "ive",
        "biliti": "ble",
        "logi": "log"
    },

        step3list = {
            "icate": "ic",
            "ative": "",
            "alize": "al",
            "iciti": "ic",
            "ical": "ic",
            "ful": "",
            "ness": ""
        },

        c = "[^aeiou]",          // consonant
        v = "[aeiouy]",          // vowel
        C = c + "[^aeiouy]*",    // consonant sequence
        V = v + "[aeiou]*",      // vowel sequence

        mgr0 = "^(" + C + ")?" + V + C,               // [C]VC... is m>0
        meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$",  // [C]VC[V] is m=1
        mgr1 = "^(" + C + ")?" + V + C + V + C,       // [C]VCVC... is m>1
        s_v = "^(" + C + ")?" + v;                   // vowel in stem

    return function (w) {
        var stem,
            suffix,
            firstch,
            re,
            re2,
            re3,
            re4,
            origword = w;

        if (w.length < 3) { return w; }

        firstch = w.substr(0, 1);
        if (firstch == "y") {
            w = firstch.toUpperCase() + w.substr(1);
        }

        // Step 1a
        re = /^(.+?)(ss|i)es$/;
        re2 = /^(.+?)([^s])s$/;

        if (re.test(w)) { w = w.replace(re, "$1$2"); }
        else if (re2.test(w)) { w = w.replace(re2, "$1$2"); }

        // Step 1b
        re = /^(.+?)eed$/;
        re2 = /^(.+?)(ed|ing)$/;
        if (re.test(w)) {
            var fp = re.exec(w);
            re = new RegExp(mgr0);
            if (re.test(fp[1])) {
                re = /.$/;
                w = w.replace(re, "");
            }
        } else if (re2.test(w)) {
            var fp = re2.exec(w);
            stem = fp[1];
            re2 = new RegExp(s_v);
            if (re2.test(stem)) {
                w = stem;
                re2 = /(at|bl|iz)$/;
                re3 = new RegExp("([^aeiouylsz])\\1$");
                re4 = new RegExp("^" + C + v + "[^aeiouwxy]$");
                if (re2.test(w)) { w = w + "e"; }
                else if (re3.test(w)) { re = /.$/; w = w.replace(re, ""); }
                else if (re4.test(w)) { w = w + "e"; }
            }
        }

        // Step 1c
        re = /^(.+?)y$/;
        if (re.test(w)) {
            var fp = re.exec(w);
            stem = fp[1];
            re = new RegExp(s_v);
            if (re.test(stem)) { w = stem + "i"; }
        }

        // Step 2
        re = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
        if (re.test(w)) {
            var fp = re.exec(w);
            stem = fp[1];
            suffix = fp[2];
            re = new RegExp(mgr0);
            if (re.test(stem)) {
                w = stem + step2list[suffix];
            }
        }

        // Step 3
        re = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
        if (re.test(w)) {
            var fp = re.exec(w);
            stem = fp[1];
            suffix = fp[2];
            re = new RegExp(mgr0);
            if (re.test(stem)) {
                w = stem + step3list[suffix];
            }
        }

        // Step 4
        re = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
        re2 = /^(.+?)(s|t)(ion)$/;
        if (re.test(w)) {
            var fp = re.exec(w);
            stem = fp[1];
            re = new RegExp(mgr1);
            if (re.test(stem)) {
                w = stem;
            }
        } else if (re2.test(w)) {
            var fp = re2.exec(w);
            stem = fp[1] + fp[2];
            re2 = new RegExp(mgr1);
            if (re2.test(stem)) {
                w = stem;
            }
        }

        // Step 5
        re = /^(.+?)e$/;
        if (re.test(w)) {
            var fp = re.exec(w);
            stem = fp[1];
            re = new RegExp(mgr1);
            re2 = new RegExp(meq1);
            re3 = new RegExp("^" + C + v + "[^aeiouwxy]$");
            if (re.test(stem) || (re2.test(stem) && !(re3.test(stem)))) {
                w = stem;
            }
        }

        re = /ll$/;
        re2 = new RegExp(mgr1);
        if (re.test(w) && re2.test(w)) {
            re = /.$/;
            w = w.replace(re, "");
        }

        // and turn initial Y back to y

        if (firstch == "y") {
            w = firstch.toLowerCase() + w.substr(1);
        }

        return w;
    }
})();
// end of porter stemmer

// k means
function dot(v1, v2) {
    let s = 0;
    for (let i = 0; i < v1.length; i++) {
        s += v1[i] * v2[i];
    }
    return s;
}

function cosSim(v1, v2) {
    const mv1 = Math.sqrt(dot(v1, v1));
    const mv2 = Math.sqrt(dot(v2, v2));
    if (!mv1 || !mv2)
        return 0;
    return dot(v1, v2) / (mv1 * mv2);
}

function kmeans(matrix, k, maxIterations = 100) {
    let centriods = [];
    const N = matrix.length;
    const M = matrix[0].length;
    const clusterMap = new Array(N).fill(-1);
    // pick random data points as centroids
    if (k > N)
        postMessage({ type: 'error', message: 'k cannot be greater than the number of data points' });
    const _usedIndices = new Set();
    while (centriods.length < k) {
        const randomIndex = Math.floor(Math.random() * N);
        if (!_usedIndices.has(randomIndex)) {
            centriods.push([...matrix[randomIndex]]);
            _usedIndices.add(randomIndex);
        }
    }
    for (let iter = 0; iter < maxIterations; iter++) {
        for (let i = 0; i < N; i++) {
            const row = matrix[i];
            let closestCluster = clusterMap[i];
            let score = -Infinity
            for (let j = 0; j < k; j++) {
                const centroid = centriods[j];
                // if u have lots of words cos sim would be a bit slow
                let temp = cosSim(row, centroid);
                closestCluster = temp > score ? j : closestCluster;
                score = temp > score ? temp : score;
            }
            clusterMap[i] = closestCluster;
        }
        const counts = new Array(k).fill(0); // need for average denominator
        // accumalate vectors assigned to each cluster
        // might be better to zero old centroids but this is easier
        const newCentroids = new Array(k).fill(null).map(() => new Array(M).fill(0));;
        for (let i = 0; i < N; i++) {
            const row = matrix[i];
            // cluster current row is assigned to
            const cluster = clusterMap[i];
            for (let j = 0; j < row.length; j++) {
                newCentroids[cluster][j] += row[j];
                counts[cluster]++;
            }
        }
        for (let i = 0; i < k; i++) {
            for (let j = 0; j < M; j++) {
                newCentroids[i][j] /= counts[i] || 1;
            }
        }
        centriods = newCentroids
    }
    return { centroids: centriods, clusters: clusterMap };
}

function euclideanDistance(v1, v2) {
    let s = 0;
    for (let i = 0; i < v1.length; i++) {
        s += (v1[i] - v2[i]) ** 2;
    }
    return Math.sqrt(s);
}

function positionNodes(matrix, centroids, clusterMap, maxIterations = 100, lambda = 10) {
    const clusterPositions = new Array(centroids.length).fill(null).map(() => ({ x: 0, y: 0 }));
    let forces = new Array(centroids.length).fill(null).map(() => ({ x: 0, y: 0 }));
    // TODO: this does go double the iters since it calculaces force from i to j and then from j to i
    for (let i = 0; i < maxIterations; i++) {
        for (let j = 0; j < centroids.length; j++) {
            forces[j].x = 0;
            forces[j].y = 0;
            for (let k = 0; k < centroids.length; k++) {
                if (j === k) continue;
                let dist = euclideanDistance(centroids[j], centroids[k]);
                // force nodes appart regardless of if they have same coords
                if (dist === 0) dist = Math.random() + 0.1; // avoid division by zero
                const forceMagnitude = (1 / dist) * cosSim(centroids[j], centroids[k]);
                // direction vec  centroid j - k
                let directionX = clusterPositions[k].x - clusterPositions[j].x;
                let directionY = clusterPositions[k].y - clusterPositions[j].y;
                directionX = directionX || Math.random() + 0.1; 
                directionY = directionY || Math.random() + 0.1; 
                // norm
                const directionLength = Math.sqrt(directionX ** 2 + directionY ** 2);
                const normalizedDirectionX = directionX / directionLength;
                const normalizedDirectionY = directionY / directionLength;
                // apply force
                forces[j].x += normalizedDirectionX * forceMagnitude;
                forces[j].y += normalizedDirectionY * forceMagnitude;
            }
        }
        for (let j = 0; j < centroids.length; j++) {
            clusterPositions[j].x += lambda * forces[j].x;
            clusterPositions[j].y += lambda * forces[j].y;
        }
    }

    const nodePositions = new Array(matrix.length).fill(null).map(() => ({ x: 0, y: 0 }));
    for (let i = 0; i < matrix.length; i++) {
        const cluster = clusterMap[i];
        nodePositions[i].x = clusterPositions[cluster].x;
        nodePositions[i].y = clusterPositions[cluster].y;
    }
    let nodeforces = new Array(matrix.length).fill(null).map(() => ({ x: 0, y: 0 }));
    for (let i = 0; i < maxIterations; i++) {
        for (let j = 0; j < nodePositions.length; j++) {
            nodeforces[j].x = 0;
            nodeforces[j].y = 0;
            for (let k = 0; k < nodePositions.length; k++) {
                if (clusterMap[j] !== clusterMap[k]) continue;

                let dist = euclideanDistance(nodePositions[j], nodePositions[k]);
                if (dist === 0) dist = Math.random() + 0.1; // avoid division by zero

                const forceMagnitude = (1 / dist) * cosSim(matrix[j], matrix[k]);

                let directionX = nodePositions[k].x - nodePositions[j].x;
                let directionY = nodePositions[k].y - nodePositions[j].y;
                directionX = directionX || Math.random() + 0.1; 
                directionY = directionY || Math.random() + 0.1; 

                const directionLength = Math.sqrt(directionX ** 2 + directionY ** 2);
                const normalizedDirectionX = directionX / directionLength;
                const normalizedDirectionY = directionY / directionLength;
                nodeforces[j].x += normalizedDirectionX * forceMagnitude;
                nodeforces[j].y += normalizedDirectionY * forceMagnitude;
            }
        }
        for (let j = 0; j < nodePositions.length; j++) {
            nodePositions[j].x += lambda * nodeforces[j].x;
            nodePositions[j].y += lambda * nodeforces[j].y;
        }
    }
    return nodePositions;
}

function normalizePositions(nodePositions, desiredAverageDistance) {
    let totalDistance = 0;
    let count = 0;
    for (let i = 0; i < nodePositions.length; i++) {
        for (let j = i + 1; j < nodePositions.length; j++) {
            const dist = euclideanDistance(nodePositions[i], nodePositions[j]);
            totalDistance += dist;
            count++;
        }
    }
    const currentAverageDistance = totalDistance / count;
    const scalingFactor = desiredAverageDistance / currentAverageDistance;
    return nodePositions.map((pos) => ({
        x: pos.x * scalingFactor,
        y: pos.y * scalingFactor,
    }));
}

function normalizePositions(nodePositions, desiredAverageDistance, desiredCenter = { x: 50, y: 0 }) {
    let totalDistance = 0;
    let count = 0;
    let totalX = 0;
    let totalY = 0;
    for (let i = 0; i < nodePositions.length; i++) {
        totalX += nodePositions[i].x;
        totalY += nodePositions[i].y;
        for (let j = i + 1; j < nodePositions.length; j++) {
            const dist = euclideanDistance(nodePositions[i], nodePositions[j]);
            totalDistance += dist;
            count++;
        }
    }

    const currentAverageDistance = totalDistance / count;
    const scalingFactor = desiredAverageDistance / currentAverageDistance;

    const currentCenter = {
        x: totalX / nodePositions.length,
        y: totalY / nodePositions.length,
    };

    const offset = {
        x: desiredCenter.x - currentCenter.x,
        y: desiredCenter.y - currentCenter.y,
    };

    return nodePositions.map((pos) => ({
        x: pos.x * scalingFactor + offset.x,
        y: pos.y * scalingFactor + offset.y,
    }));
}

onmessage = async (e) => {
    if (e.data.type == 'process') {
        try {
            e.data.data = typeof e.data.data === 'string' ? JSON.parse(e.data.data) : e.data.data;
        } catch (error) {
            postMessage({ type: 'error', message: 'Invalid JSON data' });
            return;
        }
        const N = e.data.data.length;
        const k = e.data.k || 2; // default to 2 clusters if not specified
        if (N < k) {
            postMessage({ type: 'error', message: 'k must be less than the number of data points' });
            return;
        }
        const nt = {};
        const idf = {};
        for (let i = 0; i < N; i++) {
            const node = e.data.data[i];
            const tf = {};
            if (!node.data.notes && !node.data.label) {
                continue; // skip nodes without text
            }
            let text = node.data.notes + ' ' + node.data.label;
            let words = text.split(/\W+/).filter(word => word.length > 0);
            // remove stop words and apply porter stemmer
            const stopWords = new Set(['the', 'and', 'is', 'in', 'at', 'of', 'on', 'a', 'to']);
            const stemmedWords = words
                .map(word => stemmer(word.toLowerCase()))
                .filter(word => !stopWords.has(word));
            // const stemmedWords = words.map(word => stemmer(word.toLowerCase()));
            for (const word of stemmedWords) {
                if (tf[word]) {
                    tf[word]++;
                } else {
                    tf[word] = 1;
                }
            }
            for (const word in tf) {
                tf[word] /= words.length;
            }
            for (const word in tf) {
                if (nt[word]) {
                    nt[word] += 1;
                } else {
                    nt[word] = 1;
                }
            }
            idf[node.id] = tf;
        }
        // calculate tf * idf
        for (const id in idf) {
            const tf = idf[id];
            for (const word in tf) {
                tf[word] *= (Math.log(N / (nt[word] + 1)) + 1); // Calculate IDF
            }
        }
        const matrix = [];
        for (let i = 0; i < N; i++) {
            const node = e.data.data[i];
            const tf = idf[node.id];
            const row = [];
            for (const word in nt) {
                row.push(tf[word] || 0); // fill with 0 if word not in tf
            }
            matrix.push(row);
        }
        const cluster = kmeans(matrix, 2);
        const positions = positionNodes(matrix, cluster.centroids, cluster.clusters, 150, 14);
        
        postMessage({ type: 'result', data: positions, clusters: cluster.clusters, centroids: cluster.centroids, nt: nt });
    }
}