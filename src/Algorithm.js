import {gridIdx} from './GridDraw'
import { idxToNode } from './GridDraw'
import PriorityQueue from './PriorityQueue'

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
    let pq = new PriorityQueue(dist)
    let visitedNodes = new Set()
    let pathToTarget = new Set()
    const numCells = gridSize.numRows * gridSize.numCols
    for (let i = 0; i < numCells; i++) {
        if (i === gridIdx(sourceNode, gridSize.numCols)) {
            dist[i] = 0
            pq.enqueue(gridIdx(sourceNode, gridSize.numCols))
        } 
        else {
            dist[i] = Number.MAX_VALUE
        }
    }   
    while (visitedNodes.size < numCells && !visitedNodes.has(gridIdx(targetNode, gridSize.numCols)) && !pq.isEmpty()) {
        const u = pq.dequeue()
        console.log(u)
        visitedNodes.add(u)
        await(createPromise(updateGrid, visitedNodes, pathToTarget))
        let neighbors = getNeighbors(idxToNode(u, gridSize.numCols), gridSize)
        for (const neighbor of neighbors) {
            const neighborIdx = gridIdx(neighbor, gridSize.numCols) 
            const edgeWeight = getWeightBetweenNodes(neighborIdx, wallNodes, weakWallNodes)
            if (!visitedNodes.has(neighborIdx) && edgeWeight != Number.MAX_VALUE && dist[u] + edgeWeight < dist[neighborIdx]) {
                parents[neighborIdx] = u
                dist[neighborIdx] = dist[u] + edgeWeight
                pq.enqueue(neighborIdx)
            }
        }
    }
    printPath(parents, targetNode, gridSize, visitedNodes, pathToTarget, updateGrid)
}

export const astar = async (updateGrid, sourceNode, targetNode, gridSize, wallNodes, weakWallNodes) => {
    let dist = []
    let cost = []
    let parents = []
    let closed = new Set()
    let open = new Set()
    let pq = new PriorityQueue(cost)
    let visitedNodes = new Set()
    let pathToTarget = new Set()
    const numCells = gridSize.numCols * gridSize.numRows

    const sourceIdx = gridIdx(sourceNode, gridSize.numCols)
    const targetIdx = gridIdx(targetNode, gridSize.numCols)

    for (let i = 0; i < numCells; i++) {
        if (i === sourceIdx) {
            dist[sourceIdx] = 0
            cost[sourceIdx] = dist[sourceIdx] + heuristic(sourceNode, targetNode)
            pq.enqueue(i)
        } else {
            dist[i] = Number.MAX_VALUE
            cost[i] = Number.MAX_VALUE
        }
    }
    pq.enqueue(sourceIdx)
    open.add(sourceIdx)

    while (!pq.isEmpty()) {
        const currNodeIdx = pq.dequeue()
        open.delete(currNodeIdx)
        closed.add(currNodeIdx)
        visitedNodes.add(currNodeIdx)
        await(createPromise(updateGrid, visitedNodes, pathToTarget))

        if (currNodeIdx === targetIdx) break
        const neighbors = getNeighbors(idxToNode(currNodeIdx, gridSize.numCols), gridSize)
        for (const neighbor of neighbors) {
            const neighborIdx = gridIdx(neighbor, gridSize.numCols)
            // ignore node if it is in closed list or if it is a unpassable wall node
            if (closed.has(neighborIdx) || wallNodes.has(neighborIdx)) continue
            parents[neighborIdx] = currNodeIdx 
            const edgeWeight = getWeightBetweenNodes(neighborIdx, wallNodes, weakWallNodes)
            const totalWeight = dist[currNodeIdx] + edgeWeight
            dist[neighborIdx] = totalWeight
            cost[neighborIdx] = totalWeight + heuristic(neighbor, targetNode)
            if (open.has(neighborIdx) && (totalWeight > dist[currNodeIdx])) continue
            pq.enqueue(neighborIdx)
            open.add(neighborIdx)
        }

    }
    printPath(parents, targetNode, gridSize, visitedNodes, pathToTarget, updateGrid)
}

const heuristic = (from, to) => {
    // manhattan distance
    return Math.abs(from.x - to.x) + Math.abs(from.y - to.y)
}

const getWeightBetweenNodes = (neighborIdx, wallNodes, weakWallNodes) => {
    if (wallNodes.has(neighborIdx)) {
        return Number.MAX_VALUE
    } else if (weakWallNodes.has(neighborIdx)) {
        return 50
    } else {
        return 1
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