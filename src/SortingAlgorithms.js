import SortBuffer from './SortBuffer'

export const selectionSort = (arr) => {
    let sorted = []
    let diagram = []
    let scan = []
    let unsorted = arr.slice(0, arr.length)
    for (let i = 0; i < arr.length; i++) {
        let min = unsorted[i]
        let idx = i
        let scanThru = []
        for (let j = i; j < arr.length; j++) {
            scanThru.push(j)
            if (unsorted[j] < min) {
                min = unsorted[j]
                idx = j
            }
        }
        scan.push(scanThru)
        sorted.push(i)
        unsorted = unsorted.slice(0, arr.length)
        swap(unsorted, i, idx)
        diagram.push(unsorted)
    }
    return new SortBuffer(diagram,sorted,scan)
}

export const bubbleSort = (arr) => {
    let sorted = []
    let diagram = []
    let scan = []
    let unsorted = arr.slice(0, arr.length)
    for (let i = 0; i < arr.length-1; i++) {
        const scanThru = []
        const diagramFrame = []
        for (let j = 0; j < arr.length-1-i; j++) {
            scanThru.push(j)
            if (unsorted[j] > unsorted[j+1]) {
                swap(unsorted, j, j+1)
            }
            diagramFrame.push(unsorted)
            unsorted = unsorted.slice(0, arr.length)
        }
        scan.push(scanThru)
        diagram.push(diagramFrame)
        sorted.push(arr.length-1-i)
    }
    sorted.push(0)
    return new SortBuffer(diagram,sorted,scan)
}

export const mergeSort = (arr) => {
    const res = arr.slice(0, arr.length)
    const diagram = []
    const scan = []
    const sorted = []
    mergeSortHelper(diagram, scan, res, 0, arr.length-1)
    for (let i = 0; i < arr.length; i++) sorted.push(i)
    console.log(sorted)
    return new SortBuffer(diagram, sorted, scan)
}

const mergeSortHelper = (diagram, scan, arr, left, right) => {
    if (left >= right) return;
    const mid = Math.floor((left+right)/2)
    mergeSortHelper(diagram, scan, arr, left, mid)
    mergeSortHelper(diagram, scan, arr, mid+1, right)
    merge(diagram, scan, arr, left, right, mid)
}

const merge = (diagram, scan, arr, left, right, mid) => {
    const n1 = mid - left + 1
    const n2 = right - mid

    const tempLeft = []
    const tempRight = []

    for (let i = 0; i < n1; i++) {
        tempLeft[i] = arr[left+i]
    }
    for (let i = 0; i < n2; i++) {
        tempRight[i] = arr[mid+1+i]
    }

    let i = 0
    let j = 0
    let k = left
    const scanThru = []
    while (i < tempLeft.length && j < tempRight.length) {
        scanThru.push(k)
        if (tempLeft[i] < tempRight[j]) {
            arr[k++] = tempLeft[i++]
        } else {
            arr[k++] = tempRight[j++]
        }
    }

    while (i < tempLeft.length) {
        scanThru.push(k)
        arr[k++] = tempLeft[i++]
    }
    while (j < tempRight.length) {
        scanThru.push(k)
        arr[k++] = tempRight[j++]
    }
    diagram.push(arr.slice(0, arr.length))
    scan.push(scanThru)
}

export const quickSort = (arr) => {
    const res = arr.slice(0, arr.length)
    const diagram = []
    const sorted = []
    const scan = []
    const pivots = []
    quickSortHelper(pivots, diagram, scan, res, 0, res.length-1)
    for (let i = 0; i < arr.length; i++) sorted.push(i)
    return new SortBuffer(diagram, sorted, scan, pivots)
}

const quickSortHelper = (pivots, diagram, scan, arr, left, right) => {
    if (left >= right) return
    let pivotIdx = partition(pivots, diagram, scan, arr, left, right)
    quickSortHelper(pivots, diagram, scan, arr, left, pivotIdx-1)
    quickSortHelper(pivots, diagram, scan, arr, pivotIdx+1, right)
}

const partition = (pivots, diagram, scan, arr, left, right) => {
    const pivot = arr[right]
    let i = left - 1
    const scanThru = []
    for (let j = left; j < right; j++) {
        scanThru.push(j)
        if (arr[j] < pivot) {
            swap(arr, ++i, j)
        }
    }
    swap(arr, i+1, right)
    diagram.push(arr.slice(0, arr.length))
    scan.push(scanThru)
    pivots.push({before:right, after:i+1})
    return i+1
}

export const gravitySort = (arr) => {
    const abacus = []
    const diagram = []
    const sorted = []
    diagram.push(arr.slice(0, arr.length))
    let max = Number.MIN_VALUE
    for (let i = 0; i < arr.length; i++) {
        sorted[i] = i
        if (arr[i] > max) max = arr[i]
    }

    for (let i = 0; i < arr.length; i++) {
        const abacusRow = []
        for (let j = 0; j < max; j++) {
            abacusRow.push(j < arr[i] ? 1 : 0)
        }
        abacus.push(abacusRow)
    }

    let isDone = false
    while (!isDone) {
        isDone = true
        for (let i = 0; i < abacus.length-1; i++) {
            for (let j = 0; j < max; j++) {
                if (abacus[i][j] === 1 && abacus[i+1][j] === 0) {
                    abacus[i][j] = 0
                    abacus[i+1][j] = 1
                    isDone = false
                }
            }
        }
        const diagramState = []
        for (let i = 0; i < abacus.length; i++) {
            const row = abacus[i]
            diagramState.push(row.reduce((accumulated, currentVal) => accumulated + currentVal))
        }
        diagram.push(diagramState)
    }

    return new SortBuffer(diagram, sorted, null, null)
}

const swap = (arr, x, y) => {
    const temp = arr[x]
    arr[x] = arr[y]
    arr[y] = temp
}