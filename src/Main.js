import React from 'react'
import Grid from './Grid'
import MenuBar from './MenuBar'
import {astar, bfs} from './Algorithm'
import {dfs} from './Algorithm'
import {dijkstra} from './Algorithm'
import './Grid.css'
import {gridIdx} from './GridDraw'

class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            visitedNodes:new Set(),
            pathToTarget:new Set(),
            wallNodes:new Set(),
            weakWallNodes:new Set(),
            sourceNode:{x:5, y:20},
            targetNode:{x:7, y:30},
            gridSize:{numRows:20, numCols:40},
            isUpdateSourceNodeMode:false,
            isUpdateTargetNodeMode:false,
            selectedAlgo:'',
            isDrawingMode:false,
            selectedWallType:''
        }
        this.updateGrid = this.updateGrid.bind(this)
        this.updateSourceNode = this.updateSourceNode.bind(this)
        this.setUpdateSourceNodeMode = this.setUpdateSourceNodeMode.bind(this)
        this.updateTargetNode = this.updateTargetNode.bind(this)
        this.setUpdateTargetNodeMode = this.setUpdateTargetNodeMode.bind(this)
        this.setAlgo = this.setAlgo.bind(this)
        this.executeAlgo = this.executeAlgo.bind(this)
        this.reset = this.reset.bind(this)
        this.setDrawingMode = this.setDrawingMode.bind(this)
        this.updateDrawnNodes = this.updateDrawnNodes.bind(this)
        this.setWallType = this.setWallType.bind(this)
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

    setAlgo(algo) {
        this.setState({selectedAlgo:algo})
    }

    executeAlgo() {
        switch(this.state.selectedAlgo) {
            case 'BFS':
                bfs(this.updateGrid, this.state.sourceNode, this.state.targetNode, this.state.gridSize, this.state.wallNodes)
                break
            case 'DFS':
                dfs(this.updateGrid, this.state.sourceNode, this.state.targetNode, this.state.gridSize, this.state.wallNodes)
                break
            case 'DIJKSTRA':
                dijkstra(this.updateGrid, this.state.sourceNode, this.state.targetNode, this.state.gridSize, this.state.wallNodes, this.state.weakWallNodes)
                break
            case 'ASTAR':
                astar(this.updateGrid, this.state.sourceNode, this.state.targetNode, this.state.gridSize, this.state.wallNodes, this.state.weakWallNodes)
                break
        }
    }

    setDrawingMode(isDrawingMode) {
        this.setState({isDrawingMode:isDrawingMode})
    }

    updateDrawnNodes(nodeIndex) {
        let updatedWallNodes = this.state.selectedWallType === 'UNPASSABLE' ? new Set(this.state.wallNodes) : new Set(this.state.weakWallNodes)
        updatedWallNodes.add(gridIdx(nodeIndex, this.state.gridSize.numCols))
        let updatedState = this.state.selectedWallType === 'UNPASSABLE' ? {wallNodes:updatedWallNodes} : {weakWallNodes:updatedWallNodes}
        this.setState(updatedState)
    }

    reset() {
        this.setState({visitedNodes:new Set(), pathToTarget:new Set(), wallNodes:new Set(), weakWallNodes:new Set()})
    }

    setWallType(wallType) {
        this.setState({selectedWallType:wallType})
    }

    render() {
        const nodeModifier = {
            setUpdateSourceNodeMode:this.setUpdateSourceNodeMode,
            setUpdateTargetNodeMode:this.setUpdateTargetNodeMode,
            updateSourceNode:this.updateSourceNode,
            updateTargetNode:this.updateTargetNode,
            isUpdateSourceNodeMode:this.state.isUpdateSourceNodeMode,
            isUpdateTargetNodeMode:this.state.isUpdateTargetNodeMode,
            setDrawingMode:this.setDrawingMode,
            isDrawingMode:this.state.isDrawingMode,
            updateDrawnNodes:this.updateDrawnNodes
        }
        return (
            <div>
                <MenuBar setAlgo={this.setAlgo} executeAlgo={this.executeAlgo} reset={this.reset} setWallType={this.setWallType}/>
                <div className='table_container'> <Grid gridState={this.state} nodeModifier={nodeModifier}/> </div>
            </div>
        )
    }
}

export default Main
