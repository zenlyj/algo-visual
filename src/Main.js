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
            isUpdateTargetNodeMode:false
        }
        this.updateGrid = this.updateGrid.bind(this)
        this.updateSourceNode = this.updateSourceNode.bind(this)
        this.setUpdateSourceNodeMode = this.setUpdateSourceNodeMode.bind(this)
        this.updateTargetNode = this.updateTargetNode.bind(this)
        this.setUpdateTargetNodeMode = this.setUpdateTargetNodeMode.bind(this)
    }

    updateGrid(visitedNodes, pathToTarget) {
        this.setState({visitedNodes:visitedNodes, pathToTarget:pathToTarget})
    }

    updateSourceNode(sourceNode) {
        this.setState({sourceNode:sourceNode, isUpdateSourceNodeMode:false})
    }

    updateTargetNode(targetNode) {
        this.setState({targetNode:targetNode, isUpdateTargetNodeMode:false})
    }

    setUpdateSourceNodeMode() {
        this.setState({isUpdateSourceNodeMode:true})
    }

    setUpdateTargetNodeMode() {
        this.setState({isUpdateTargetNodeMode:true})
    }

    render() {
        const nodeModifier = {
            setUpdateSourceNodeMode:this.setUpdateSourceNodeMode,
            setUpdateTargetNodeMode:this.setUpdateTargetNodeMode,
            updateSourceNode:this.updateSourceNode,
            updateTargetNode:this.updateTargetNode,
            isUpdateSourceNodeMode:this.state.isUpdateSourceNodeMode,
            isUpdateTargetNodeMode:this.state.isUpdateTargetNodeMode
        }
        return (
            <div>
                <Grid gridState={this.state} nodeModifier={nodeModifier}/>
                <button onClick={()=>bfs(this.updateGrid, this.state.sourceNode, this.state.targetNode, this.state.gridSize)} > RUN BFS </button>
                <button onClick={()=>dfs(this.updateGrid, this.state.sourceNode, this.state.targetNode, this.state.gridSize)} > RUN DFS </button>
                <button onClick={()=>this.setState({visitedNodes:new Set(), pathToTarget:new Set()})}> RESET </button>
            </div>
        )
    }
}

export default Main
