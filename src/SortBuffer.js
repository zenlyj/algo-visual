export default class SortBuffer {
    constructor(diagram, sorted, scan, quickSortPivots) {
        this._diagram = diagram
        this._sorted = sorted
        this._scan = scan
        this._quickSortPivots = quickSortPivots
    }

    consumeDiagram() {
        const head = this._diagram[0]
        this._diagram.shift()
        return head
    }

    consumeSorted() {
        const head = this._sorted[0]
        this._sorted.shift()
        return head
    }

    consumeScan() {
        const head = this._scan[0]
        this._scan.shift()
        return head
    }

    consumePivots() {
        const head = this._quickSortPivots[0]
        this._quickSortPivots.shift()
        return head
    }

    isEmpty() {
        return this._sorted.length === 0
    }
}