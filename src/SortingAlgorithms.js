import SortBuffer from './SortBuffer'

export const selectionSort = (arr) => {
    let sorted = []
    let diagram = []
    let scan = []
    let unsorted = arr.slice(0, arr.length)
    diagram.push(arr)
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
        // if (i===0) {
        //     diagramFrame.push(unsorted)
        //     unsorted = unsorted.slice(0, arr.length)
        // } 
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

const swap = (arr, x, y) => {
    const temp = arr[x]
    arr[x] = arr[y]
    arr[y] = temp
}