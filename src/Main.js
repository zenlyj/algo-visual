import React from 'react'
import Grid from './Grid'
import {bfs} from './Algorithm'
import {dfs} from './Algorithm'

class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            visitedNodes:new Set(),
            pathToTarget:new Set(),
            sourceNode:{x:5, y:20},
            targetNode:{x:20, y:30},
            gridSize:{numRows:30, numCols:40}
        }
        this.updateGrid = this.updateGrid.bind(this)
    }

    updateGrid(visitedNodes, pathToTarget) {
        this.setState({visitedNodes:visitedNodes, pathToTarget:pathToTarget})
    }

    render() {
        return (
            <div>
                <Grid gridState={this.state}/>
                <button onClick={()=>bfs(this.updateGrid, this.state.sourceNode, this.state.targetNode, this.state.gridSize)} > RUN BFS </button>
                <button onClick={()=>dfs(this.updateGrid, this.state.sourceNode, this.state.targetNode, this.state.gridSize)} > RUN DFS </button>
                <button onClick={()=>this.setState({visitedNodes:new Set(), pathToTarget:new Set()})}> RESET </button>
            </div>
        )
    }
}

export default Main
