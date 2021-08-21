import {gridIdx} from './GridDraw'

export const mazeRecursiveDiv = (gridSize, sourceNode, targetNode) => {
    const wallNodes = []
    const gaps = new Set()
    mazeHelper(gaps, wallNodes, 1, gridSize.numRows, 1, gridSize.numCols, gridSize, gridIdx(sourceNode, gridSize.numCols), gridIdx(targetNode, gridSize.numCols))
    return wallNodes
}

const randInt = (low, high) => {
    const min = Math.ceil(low)
    const max = Math.floor(high)
    return Math.floor(Math.random() * (max-min+1)+min)
}

const getWallOrientation = (vertStart, vertEnd, horizStart, horizEnd) => {
    const width = horizEnd - horizStart
    const height = vertEnd - vertStart

    if (width > height) {
        return 'VERTICAL'
    } else if (height > width) {
        return 'HORIZONTAL'
    } else {
        return randInt(1,2) === 1 ? 'VERTICAL' : 'HORIZONTAL' 
    }
}

const getVerticalGap = (gaps, slicePoint, vertStart, vertEnd, gridSize) => {
    const topBoundary = {x:vertStart-1, y:slicePoint}
    const btmBoundary = {x:vertEnd+1, y:slicePoint}
    const vertGaps = new Set()
    const isTopBoundaryGap = gaps.has(gridIdx(topBoundary, gridSize.numCols))
    const isBtmBoundaryGap = gaps.has(gridIdx(btmBoundary, gridSize.numCols))
    if (isTopBoundaryGap) {
        vertGaps.add(gridIdx({x:vertStart, y:slicePoint}, gridSize.numCols))
    } 
    if (isBtmBoundaryGap) {
        vertGaps.add(gridIdx({x:vertEnd, y:slicePoint}, gridSize.numCols))
    } 
    if (!isTopBoundaryGap && !isBtmBoundaryGap){
        const x = randInt(vertStart, vertEnd)
        vertGaps.add(gridIdx({x:x, y:slicePoint}, gridSize.numCols))
    }
    return vertGaps
}

const getHorizontalGap = (gaps, slicePoint, horizStart, horizEnd, gridSize) => {
    const leftBoundary = {x:slicePoint, y:horizStart-1}
    const rightBoundary = {x:slicePoint, y:horizEnd+1}
    const horizGaps = new Set()
    const isLeftBoundaryGap = gaps.has(gridIdx(leftBoundary, gridSize.numCols))
    const isRightBoundaryGap = gaps.has(gridIdx(rightBoundary, gridSize.numCols))
    if (isLeftBoundaryGap) {
        horizGaps.add(gridIdx({x:slicePoint, y:horizStart}, gridSize.numCols))
    } 
    if (isRightBoundaryGap) {
        horizGaps.add(gridIdx({x:slicePoint, y:horizEnd}, gridSize.numCols))
    } 
    if (!isLeftBoundaryGap && !isRightBoundaryGap) {
        const y = randInt(horizStart, horizEnd)
        horizGaps.add(gridIdx({x:slicePoint, y:y}, gridSize.numCols))
    }
    return horizGaps
}

const mazeHelper = (gaps, wallNodes, vertStart, vertEnd, horizStart, horizEnd, gridSize, sourceIdx, targetIdx) => {
    if (vertEnd - vertStart < 2 || horizEnd - horizStart < 2) return;
    const orientation = getWallOrientation(vertStart, vertEnd, horizStart, horizEnd)
    if (orientation === 'HORIZONTAL') {
        const slicePoint = randInt(vertStart+1, vertEnd-1)
        const horizGaps = getHorizontalGap(gaps, slicePoint, horizStart, horizEnd, gridSize)
        for (let i = horizStart; i <= horizEnd; i++) {
            const currentIdx = gridIdx({x:slicePoint, y:i}, gridSize.numCols)
            if (horizGaps.has(currentIdx) || currentIdx === sourceIdx || currentIdx === targetIdx) continue
            wallNodes.push(currentIdx)
        }
        for (let gap of horizGaps) gaps.add(gap)
        mazeHelper(gaps, wallNodes, vertStart, slicePoint-1, horizStart, horizEnd, gridSize, sourceIdx, targetIdx)
        mazeHelper(gaps, wallNodes, slicePoint+1, vertEnd, horizStart, horizEnd, gridSize, sourceIdx, targetIdx)
    } else if (orientation === 'VERTICAL') {
        const slicePoint = randInt(horizStart+1, horizEnd-1)
        const vertGaps = getVerticalGap(gaps, slicePoint, vertStart, vertEnd, gridSize)
        for (let i = vertStart; i <= vertEnd; i++) {
            const currentIdx = gridIdx({x:i, y:slicePoint}, gridSize.numCols)
            if (vertGaps.has(currentIdx) || currentIdx === sourceIdx || currentIdx === targetIdx) continue
            wallNodes.push(currentIdx)
        }
        for (let gap of vertGaps) gaps.add(gap)
        mazeHelper(gaps, wallNodes, vertStart, vertEnd, horizStart, slicePoint-1, gridSize, sourceIdx, targetIdx)
        mazeHelper(gaps, wallNodes, vertStart, vertEnd, slicePoint+1, horizEnd, gridSize, sourceIdx, targetIdx)
    } else {}

}