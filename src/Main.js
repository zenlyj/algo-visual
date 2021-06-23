import React from 'react'
import Grid from './Grid'
import MenuBar from './MenuBar'
import {bfs} from './Algorithm'
import {dfs} from './Algorithm'
import './Grid.css'

class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            visitedNodes:new Set(),
            pathToTarget:new Set(),
            sourceNode:{x:5, y:20},
            targetNode:{x:7, y:30},
            gridSize:{numRows:20, numCols:40},
            isUpdateSourceNodeMode:false,
            isUpdateTargetNodeMode:false,
            selectedAlgo:''
        }
        this.updateGrid = this.updateGrid.bind(this)
        this.updateSourceNode = this.updateSourceNode.bind(this)
        this.setUpdateSourceNodeMode = this.setUpdateSourceNodeMode.bind(this)
        this.updateTargetNode = this.updateTargetNode.bind(this)
        this.setUpdateTargetNodeMode = this.setUpdateTargetNodeMode.bind(this)
        this.setBFSMode = this.setBFSMode.bind(this)
        this.setDFSMode = this.setDFSMode.bind(this)
        this.executeAlgo = this.executeAlgo.bind(this)
        this.reset = this.reset.bind(this)
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

    setDFSMode() {
        this.setState({selectedAlgo:'DFS'})
    }
    
    setBFSMode() {
        this.setState({selectedAlgo:'BFS'})
    }

    executeAlgo() {
        if (this.state.selectedAlgo === 'BFS') {
            bfs(this.updateGrid, this.state.sourceNode, this.state.targetNode, this.state.gridSize)
        }
        else if (this.state.selectedAlgo === 'DFS') {
            dfs(this.updateGrid, this.state.sourceNode, this.state.targetNode, this.state.gridSize)
        }
    }

    reset() {
        this.setState({visitedNodes:new Set(), pathToTarget:new Set()})
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
                <MenuBar setBFSMode={this.setBFSMode} setDFSMode={this.setDFSMode} executeAlgo={this.executeAlgo} reset={this.reset}/>
                <div className='table_container'> <Grid gridState={this.state} nodeModifier={nodeModifier}/> </div>
            </div>
        )
    }
}

export default Main
