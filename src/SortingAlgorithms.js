import SortBuffer from './SortBuffer'

export const selectionSort = (arr) => {
    let sorted = []
    let diagram = []
    let scan = []
    let unsorted = arr
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

const swap = (arr, x, y) => {
    const temp = arr[x]
    arr[x] = arr[y]
    arr[y] = temp
}