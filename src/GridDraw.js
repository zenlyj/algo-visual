import React from 'react'
import Node from './Node'

export const gridIdx = (node, numCols) => {
    return ((node.x-1) * numCols) + (node.y-1)
}

export const draw = (gridState, nodeModifier) => {
    const numCols = gridState.gridSize.numCols
    const numRows = gridState.gridSize.numRows
    const sourceNode = gridState.sourceNode
    const targetNode = gridState.targetNode
    const visitedPath = gridState.visitedNodes
    const pathToTarget = gridState.pathToTarget

    let rows = []
    for (let x = 0; x < numRows; x++) {
        let nodes = []
        for (let y = 0; y < numCols; y++) {
            const currIdx = gridIdx({x:x+1, y:y+1}, numCols)
            const isSourceNode = currIdx === gridIdx(sourceNode, numCols)
            const isTargetNode = currIdx === gridIdx(targetNode, numCols)
            const isVisitedNode = visitedPath.has(currIdx)
            const isPathNode = pathToTarget.has(currIdx)
            nodes.push(<Node nodeIndex={{x:x+1, y:y+1}} isSourceNode={isSourceNode} isTargetNode={isTargetNode} isVisitedNode={isVisitedNode} isPathNode={isPathNode} nodeModifier={nodeModifier} />)
        }
        rows.push(<tr>{nodes}</tr>)
    }
    return rows;
}