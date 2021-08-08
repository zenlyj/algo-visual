import {gridIdx, idxToNode} from './GridDraw'
import PriorityQueue from './PriorityQueue'

export const bfs = (sourceNode, targetNode, gridSize, wallNodes) => {
    const visitedNodes = new Set()
    const visitedBuffer = []
    const queue = []
    const parents = []
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
                visitedBuffer.push(neighborIdx)
                queue.push(neighbor)
            }
        }
    }
    const pathBuffer = getPath(parents, targetNode, gridSize)
    return {visitedBuffer:visitedBuffer, pathBuffer:pathBuffer}
}

export const dfs = (sourceNode, targetNode, gridSize, wallNodes) => {
    const visitedNodes = new Set()
    const stack = []
    const parents = []
    const visitedBuffer = []
    stack.push(sourceNode)
    visitedNodes.add(gridIdx(sourceNode, gridSize.numCols))
    while(stack.length !== 0 && !visitedNodes.has(gridIdx(targetNode, gridSize.numCols))) {
        const node = stack.pop()
        const currIdx = gridIdx(node, gridSize.numCols)
        if (!visitedNodes.has(currIdx)) {
            visitedNodes.add(currIdx)
            visitedBuffer.push(currIdx)
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
    const pathBuffer = getPath(parents, targetNode, gridSize)
    return {visitedBuffer:visitedBuffer, pathBuffer:pathBuffer}
}

export const dijkstra = (sourceNode, targetNode, gridSize, wallNodes, weakWallNodes) => {
    const dist = []
    const parents = []
    const visitedBuffer = []
    const pq = new PriorityQueue(dist)
    const visitedNodes = new Set()
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
        visitedNodes.add(u)
        visitedBuffer.push(u)
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
    const pathBuffer = getPath(parents, targetNode, gridSize)
    return {visitedBuffer:visitedBuffer, pathBuffer:pathBuffer} 
}

export const astar = (sourceNode, targetNode, gridSize, wallNodes, weakWallNodes) => {
    const dist = []
    const cost = []
    const parents = []
    const visitedBuffer = []
    const closed = new Set()
    const open = new Set()
    const pq = new PriorityQueue(cost)
    const visitedNodes = new Set()
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
        visitedBuffer.push(currNodeIdx)

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
    const pathBuffer = getPath(parents, targetNode, gridSize)
    return {visitedBuffer:visitedBuffer, pathBuffer:pathBuffer}
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

const getPath = (parents, targetNode, gridSize) => {
    let parent = parents[gridIdx(targetNode, gridSize.numCols)]
    let res = []
    while (parent !== undefined) {
        res.push(parent)
        parent = parents[parent]
    }
    return res
}