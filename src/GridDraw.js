import React from 'react'
import Node from './Node'

export const gridIdx = (node, numCols) => {
    return ((node.x-1) * numCols) + (node.y-1)
}

export const draw = (visitedPath, sourceNode, targetNode, gridSize, path) => {
    let rows = []
    for (let x = 0; x < gridSize.numRows; x++) {
        let nodes = []
        for (let y = 0; y < gridSize.numCols; y++) {
            const currIdx = gridIdx({x:x+1, y:y+1}, gridSize.numCols)
            const isStartNode = currIdx === gridIdx(sourceNode, gridSize.numCols)
            const isEndNode = currIdx === gridIdx(targetNode, gridSize.numCols)
            const isVisitedNode = visitedPath.has(currIdx)
            const isPathNode = path.has(currIdx)
            nodes.push(<Node isStartNode={isStartNode} isEndNode={isEndNode} isVisitedNode={isVisitedNode} isPathNode={isPathNode}/>)
        }
        rows.push(<tr>{nodes}</tr>)
    }
    return rows;
}