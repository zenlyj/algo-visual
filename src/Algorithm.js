import {gridIdx} from './GridDraw'
import { idxToNode } from './GridDraw'

export const bfs = async (updateGrid, sourceNode, targetNode, gridSize, wallNodes) => {
    let visitedNodes = new Set()
    let pathToTarget = new Set()
    let queue = []
    let parents = []
    queue.push(sourceNode)
    visitedNodes.add(gridIdx(sourceNode, gridSize.numCols))
    while (queue.length !== 0 && !visitedNodes.has(gridIdx(targetNode, gridSize.numCols))) {
        const node = queue[0]
        queue.shift()
        let neighbors = getNeighbors(node, gridSize)
        for (const neighbor of neighbors) {
            const neighborIdx = gridIdx(neighbor, gridSize.numCols)
            if (!visitedNodes.has(neighborIdx) && !wallNodes.has(neighborIdx)) {
                parents[neighborIdx] = gridIdx(node, gridSize.numCols)
                visitedNodes.add(neighborIdx)
                await(createPromise(updateGrid, visitedNodes, pathToTarget))
                queue.push(neighbor)
            }
        }
    }
    printPath(parents, targetNode, gridSize, visitedNodes, pathToTarget, updateGrid)
}

export const dfs = async (updateGrid, sourceNode, targetNode, gridSize, wallNodes) => {
    let visitedNodes = new Set()
    let pathToTarget = new Set()
    let stack = []
    let parents = []
    stack.push(sourceNode)
    visitedNodes.add(gridIdx(sourceNode, gridSize.numCols))
    while(stack.length !== 0 && !visitedNodes.has(gridIdx(targetNode, gridSize.numCols))) {
        const node = stack.pop()
        const currIdx = gridIdx(node, gridSize.numCols)
        if (!visitedNodes.has(currIdx)) {
            visitedNodes.add(currIdx)
            await(createPromise(updateGrid, visitedNodes, pathToTarget))
        }
        const neighbors = getNeighbors(node, gridSize)
        for (const neighbor of neighbors) {
            const neighborIdx = gridIdx(neighbor, gridSize.numCols)
            if (!visitedNodes.has(neighborIdx) && !wallNodes.has(neighborIdx)) {
                parents[neighborIdx] = currIdx
                stack.push(neighbor)
            }
        }
    }
    printPath(parents, targetNode, gridSize, visitedNodes, pathToTarget, updateGrid)
}

export const dijkstra = async (updateGrid, sourceNode, targetNode, gridSize, wallNodes, weakWallNodes) => {
    let dist = []
    let parents = []
    let sptSet = new Set()
    let pathToTarget = new Set()
    const numCells = gridSize.numRows * gridSize.numCols
    for (let i = 0; i < numCells; i++) {
        if (i === gridIdx(sourceNode, gridSize.numCols)) {
            dist[i] = 0
        } 
        else {
            dist[i] = Number.MAX_VALUE
        }
    }
    while (sptSet.size < numCells && !sptSet.has(gridIdx(targetNode, gridSize.numCols))) {
        let u = minDistance(dist, sptSet)
        console.log('processed' + u)
        console.log(idxToNode(u, gridSize.numCols))
        if (u === -1) break
        sptSet.add(u)
        await(createPromise(updateGrid, sptSet, pathToTarget))
        let neighbors = getNeighbors(idxToNode(u, gridSize.numCols), gridSize)
        console.log(neighbors)
        for (const neighbor of neighbors) {
            const neighborIdx = gridIdx(neighbor, gridSize.numCols) 
            const edgeWeight = getWeightBetweenNodes(neighborIdx, wallNodes, weakWallNodes)
            if (!sptSet.has(neighborIdx) && edgeWeight != Number.MAX_VALUE && dist[u] + edgeWeight < dist[neighborIdx]) {
                parents[neighborIdx] = u
                dist[neighborIdx] = dist[u] + edgeWeight
            }
        }
    }
    printPath(parents, targetNode, gridSize, sptSet, pathToTarget, updateGrid)
}

const minDistance = (dist, sptSet) => {
    let i = -1
    let minVal = Number.MAX_VALUE
    for (let x = 0; x < dist.length; x++) {
        if (dist[x] < minVal && !sptSet.has(x)) {
            minVal = dist[x]
            i = x
        }
    }
    return i
}

const getWeightBetweenNodes = (neighborIdx, wallNodes, weakWallNodes) => {
    if (wallNodes.has(neighborIdx)) {
        return Number.MAX_VALUE
    } else if (weakWallNodes.has(neighborIdx)) {
        return 100
    } else {
        return 10
    }
}


const createPromise = (updateGrid, visitedNodes, pathToTarget) => {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            updateGrid(visitedNodes, pathToTarget);
            resolve();
        }, 10)
    })
    return promise
}

const getNeighbors = (node, gridSize) => {
    let neighbors = []
    const topNode = {x:(node.x-1), y:(node.y)}
    if (topNode.x > 0) neighbors.push(topNode)
    const rightNode = {x:(node.x), y:(node.y+1)}
    if (rightNode.y <= gridSize.numCols) neighbors.push(rightNode)
    const btmNode = {x:(node.x+1), y:(node.y)}
    if (btmNode.x <= gridSize.numRows) neighbors.push(btmNode)
    const leftNode = {x:(node.x), y:(node.y-1)}
    if (leftNode.y > 0) neighbors.push(leftNode)
    return neighbors
}

const printPath = async (parents, targetNode, gridSize, visitedNodes, pathToTarget, updateGrid) => {
    let parent = parents[gridIdx(targetNode, gridSize.numCols)]
    while (parent !== undefined) {
        pathToTarget.add(parent)
        await(createPromise(updateGrid, visitedNodes, pathToTarget))
        parent = parents[parent]
    }
}