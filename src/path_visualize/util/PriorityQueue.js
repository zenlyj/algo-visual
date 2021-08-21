export default class PriorityQueue {
    constructor(dist) {
        this._heap = []
        this._dist = dist
        this._root = 0
    }

    comparator(x, y) {
        return this._dist[x] < this._dist[y]
    }

    parent(i) {
        return ((i+1)>>>1)-1
    }

    left(i) {
        return (i<<1)+1
    }

    right(i) {
        return (i+1)<<1
    }

    isEmpty() {
        return this._heap.length === 0
    }

    peek() {
        return this._heap[this._root]
    }

    size() {
        return this._heap.length
    }

    enqueue(val) {
        this._heap.push(val)
        this.siftUp()
    }

    dequeue() {
        const res = this.peek()
        const bottom = this.size() - 1
        if (bottom > this._root) {
            this.swap(this._root, bottom)
        }
        this._heap.pop()
        this.siftDown()
        return res
    }

    lesser(x, y) {
        return this.comparator(this._heap[x], this._heap[y])
    }

    swap(x, y) {
        const temp = this._heap[x]
        this._heap[x] = this._heap[y]
        this._heap[y] = temp 
    }

    siftDown() {
        let node = this._root
        while ((this.left(node) < this.size() && this.lesser(this.left(node), node)) || (this.right(node) < this.size() && this.lesser(this.right(node), node))) {
            let minChild = (this.right(node) < this.size() && this.lesser(this.right(node), this.left(node))) ? this.right(node) : this.left(node)
            this.swap(node, minChild)
            node = minChild
        }
    }

    siftUp() {
        let node = this.size() - 1
        while (node > this._root && this.lesser(node, this.parent(node))) {
            this.swap(node, this.parent(node))
            node = this.parent(node)
        }
    }
}