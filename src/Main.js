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
            gridSize:{numRows:30, numCols:40},
            isUpdateSourceNodeMode:false,
            isUpdateEndNodeMode:false
        }
        this.updateGrid = this.updateGrid.bind(this)
        this.updateSourceNode = this.updateSourceNode.bind(this)
        this.setUpdateSourceNodeMode = this.setUpdateSourceNodeMode.bind(this)
        this.updateEndNode = this.updateEndNode.bind(this)
        this.setUpdateEndNodeMode = this.setUpdateEndNodeMode.bind(this)
    }

    updateGrid(visitedNodes, pathToTarget) {
        this.setState({visitedNodes:visitedNodes, pathToTarget:pathToTarget})
    }

    updateSourceNode(sourceNode) {
        this.setState({sourceNode:sourceNode, isUpdateSourceNodeMode:false})
    }

    updateEndNode(targetNode) {
        this.setState({targetNode:targetNode, isUpdateEndNodeMode:false})
    }

    setUpdateSourceNodeMode() {
        this.setState({isUpdateSourceNodeMode:true})
    }

    setUpdateEndNodeMode() {
        this.setState({isUpdateEndNodeMode:true})
    }

    render() {
        return (
            <div>
                <div className='table_container'> <Grid gridState={this.state} setUpdateSourceNodeMode={this.setUpdateSourceNodeMode} updateSourceNode={this.updateSourceNode} setUpdateEndNodeMode={this.setUpdateEndNodeMode} updateEndNode={this.updateEndNode}/> </div>
                <button onClick={()=>bfs(this.updateGrid, this.state.sourceNode, this.state.targetNode, this.state.gridSize)} > RUN BFS </button>
                <button onClick={()=>dfs(this.updateGrid, this.state.sourceNode, this.state.targetNode, this.state.gridSize)} > RUN DFS </button>
                <button onClick={()=>this.setState({visitedNodes:new Set(), pathToTarget:new Set()})}> RESET </button>
            </div>
        )
    }
}

export default Main
