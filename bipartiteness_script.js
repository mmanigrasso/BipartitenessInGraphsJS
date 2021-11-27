/**
 * @file Excercise16_bipartiteness
 * @author Marco Manigrasso (mamanigrasso@edu.aau.at)
 * @brief This programm will check the bipartiteness of a given graph by coloring the vertices with two different colors.
 * @version 1.0
 * @date 2021-11-27
 * 
 * @copyright Copyright (c) 2021
 * 
 */

let NUM_OF_VERTICES = 5;
let NOT_COLORED = -1;
let BLUE = 0;
let RED = 1;

// define a graph as a 2-dimensional array -> 1 denotes an edge from the current vertex to the vertex and corresponding index
let Graph = [
    [0, 1, 0, 1, 0],
    [1, 0, 0, 0, 1],
    [0, 0, 0, 1, 0],
    [1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0]
]

/**
 * Checks whether the passed vertices are adjacent to one another in the given graph.
 * @param {*} Graph Graph with vertices
 * @param {*} vertex1 vertex A
 * @param {*} vertex2 vertex B
 * @returns true if vertices are neighbours, false otherwise
 */
 function areNeighbours(vertex1, vertex2) {
    return Graph[vertex1][vertex2] == 1;
}

/**
 * Gets the inverted color.
 * @param {*} color either BLUE or RED
 * @returns RED if BLUE is passed, or BLUE if RED is passed
 */
function getInvertedColor(color) {
    // we can reduce inversion of color to just 1 - color, since we only use 0 and 1 for colors
    return 1 - color;
}

/**
 * Checks whether the graph is bipartite.
 * @returns true if the graph is bipartite, false otherwise
 */
function isGraphBipartite() {
    
    // define and init a colorValues array to store info on which color was assigned to which vertex
    var colorValues = [];
    for (var i = 0; i < NUM_OF_VERTICES; i++) {
        colorValues[i] = NOT_COLORED;
    }

    // color the first vertex
    colorValues[0] = BLUE;

    // Create a queue to traverse all vertices and push the first vertex
    var verticesQueue = [];
    verticesQueue.push(0);

    // do for all vertices
    while (verticesQueue.length > 0) {

        // pop the next element to check and color
        var vertexToCheck = verticesQueue.shift();

        // vertex is a neighbour of itself -> bipartiteness not possible
        if (areNeighbours(vertexToCheck, vertexToCheck)) return false;

        // iterate over all neighbours of vertextToColor
        for (var neighbourIndex = 0; neighbourIndex < NUM_OF_VERTICES; neighbourIndex++) {

            if (areNeighbours(vertexToCheck, neighbourIndex)) {

                if (colorValues[neighbourIndex] == NOT_COLORED) {

                    // if vertexToCheck and neighbourIndex are neighbours then color the neighbour and enqueue it to be checked next
                    verticesQueue.push(neighbourIndex);
                    colorValues[neighbourIndex] = getInvertedColor(colorValues[vertexToCheck]);

                } else if (colorValues[neighbourIndex] == colorValues[vertexToCheck]) {

                    // two neighbours have the same color! -> no bipartiteness
                    return false;
                }
            }
        }
    }

    // all vertices were colored without coloring two neighbours the same -> graph is bipartite
    return true;
}

function testBipartiteness() {
    if (isGraphBipartite()) alert("The selected graph is bipartite!");
    else alert("The selected graph is NOT bipartite!");
}