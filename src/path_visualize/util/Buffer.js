export default class Buffer {
    constructor(visited, path) {
        this._visited = visited
        this._path = path
    }

    update(numVisited) {
        this._visited = this._visited.slice(numVisited, this._visited.length)
    }

    consumeVisited() {
        const head = this._visited[0]
        this._visited.shift()
        return head
    }

    consumePath() {
        const head = this._path[0]
        this._path.shift()
        return head
    }

    visitedIsEmpty() {
        return this._visited.length === 0
    }

    pathIsEmpty() {
        return this._path.length === 0
    }

    isEmpty() {
        return this.visitedIsEmpty() && this.pathIsEmpty()
    }
}