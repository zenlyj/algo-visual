import React from 'react'
import Node from './Node'

export const gridIdx = (node, numCols) => {
    return ((node.x-1) * numCols) + (node.y-1)
}

export const draw = (visitedPath, sourceNode, targetNode, gridSize, path, setUpdateSourceNodeMode, isUpdateSourceNodeMode, updateSourceNode, setUpdateEndNodeMode, isUpdateEndNodeMode, updateEndNode) => {
    let rows = []
    for (let x = 0; x < gridSize.numRows; x++) {
        let nodes = []
        for (let y = 0; y < gridSize.numCols; y++) {
            const currIdx = gridIdx({x:x+1, y:y+1}, gridSize.numCols)
            const isStartNode = currIdx === gridIdx(sourceNode, gridSize.numCols)
            const isEndNode = currIdx === gridIdx(targetNode, gridSize.numCols)
            const isVisitedNode = visitedPath.has(currIdx)
            const isPathNode = path.has(currIdx)
            nodes.push(<Node nodeIndex={{x:x+1, y:y+1}} isStartNode={isStartNode} isEndNode={isEndNode} isVisitedNode={isVisitedNode} isPathNode={isPathNode} setUpdateSourceNodeMode={setUpdateSourceNodeMode} isUpdateSourceNodeMode={isUpdateSourceNodeMode} updateSourceNode={updateSourceNode} setUpdateEndNodeMode={setUpdateEndNodeMode} isUpdateEndNodeMode={isUpdateEndNodeMode} updateEndNode={updateEndNode}/>)
        }
        rows.push(<tr>{nodes}</tr>)
    }
    return rows;
}