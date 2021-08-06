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
            buffer:{visitedBuffer: [], pathBuffer:[]},
            sourceNode:{x:5, y:20},
            targetNode:{x:7, y:30},
            gridSize:{numRows:20, numCols:40},
            isUpdateSourceNodeMode:false,
            isUpdateTargetNodeMode:false,
            selectedAlgo:'',
            isDrawingMode:false,
            selectedWallType:'',
            isRunning:false
        }
        this.updateSourceNode = this.updateSourceNode.bind(this)
        this.setUpdateSourceNodeMode = this.setUpdateSourceNodeMode.bind(this)
        this.updateTargetNode = this.updateTargetNode.bind(this)
        this.setUpdateTargetNodeMode = this.setUpdateTargetNodeMode.bind(this)
        this.setAlgo = this.setAlgo.bind(this)
        this.bufferAlgo = this.bufferAlgo.bind(this)
        this.reset = this.reset.bind(this)
        this.setDrawingMode = this.setDrawingMode.bind(this)
        this.updateDrawnNodes = this.updateDrawnNodes.bind(this)
        this.setWallType = this.setWallType.bind(this)
        this.playback = this.playback.bind(this)
        this.pausePlayback = this.pausePlayback.bind(this)
        this.start = this.start.bind(this)
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

    bufferAlgo() {
        let buffer = {}
        switch(this.state.selectedAlgo) {
            case 'BFS':
                buffer = bfs(this.state.sourceNode, this.state.targetNode, this.state.gridSize, this.state.wallNodes)
                break
            case 'DFS':
                buffer = dfs(this.state.sourceNode, this.state.targetNode, this.state.gridSize, this.state.wallNodes)
                break
            case 'DIJKSTRA':
                buffer = dijkstra(this.state.sourceNode, this.state.targetNode, this.state.gridSize, this.state.wallNodes, this.state.weakWallNodes)
                break
            case 'ASTAR':
                buffer = astar(this.state.sourceNode, this.state.targetNode, this.state.gridSize, this.state.wallNodes, this.state.weakWallNodes)
                break
            default:
                return
        }
        const visitedBuffer = buffer.visitedBuffer
        buffer.visitedBuffer = visitedBuffer.slice(this.state.visitedNodes.size, visitedBuffer.length-1)
        this.setState({buffer:buffer})
    }

    async start() {
        await(new Promise((resolve) => {
            this.bufferAlgo()
            resolve()
        }))
        this.playback()
    }

    playback() {
        if (this.state.buffer.pathBuffer.length === 0 && this.state.buffer.visitedBuffer.length === 0) {
            this.setState({isRunning:false})
            return;
        }
        const createPromise = (visitedNodes, pathToTarget) => {
            let promise = new Promise((resolve) => {
                setTimeout(() => {
                    this.setState({visitedNodes:visitedNodes, pathToTarget:pathToTarget})
                    resolve();
                }, 10)
            })
            return promise
        }
        this.setState({isRunning:true}, async ()=> {
            let visitedNodes = new Set(this.state.visitedNodes)
            let pathToTarget = new Set(this.state.pathToTarget)
            const visitedBuffer = this.state.buffer.visitedBuffer.slice()
            const pathBuffer = this.state.buffer.pathBuffer.slice()
            if (visitedBuffer.length > 0) {
                visitedNodes.add(visitedBuffer[0])
                visitedBuffer.shift()
            } else {
                pathToTarget.add(pathBuffer[0])
                pathBuffer.shift()
            }
            await(createPromise(visitedNodes, pathToTarget))
            this.setState({visitedNodes:visitedNodes, buffer:{visitedBuffer:visitedBuffer, pathBuffer:pathBuffer}}, 
                ()=>this.state.isRunning ? this.playback() : null)
        })
    }

    pausePlayback() {
        this.setState({isRunning:false})
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
                <MenuBar setAlgo={this.setAlgo} start={this.start} pause={this.pausePlayback} reset={this.reset} setWallType={this.setWallType} isRunning={this.state.isRunning}/>
                <div className='table_container'> <Grid gridState={this.state} nodeModifier={nodeModifier}/> </div>
            </div>
        )
    }
}

export default Main
