import React from 'react'
import '../components/Grid.css';

class Node extends React.Component{
    constructor() {
        super()
        this.mouseDownHandler = this.mouseDownHandler.bind(this)
        this.mouseUpHandler = this.mouseUpHandler.bind(this)
        this.mouseEnterHandler = this.mouseEnterHandler.bind(this)
    }
    
    getNodeBackground() {
        let nodeBackground = 'default'
        if (this.props.isSourceNode) nodeBackground = 'source_node'
        else if (this.props.isTargetNode) nodeBackground = 'target_node'
        else if (this.props.isWallNode) nodeBackground = 'wall_node'
        else if (this.props.isWeakWallNode) nodeBackground = 'weak_wall_node'
        else if (this.props.isPathNode) nodeBackground = 'path_node'
        else if (this.props.isVisitedNode) nodeBackground = 'visited_node'
        return nodeBackground
    }

    mouseDownHandler(e) {
        e.preventDefault()
        const isUpdateSourceNodeMode = this.props.nodeModifier.isUpdateSourceNodeMode
        const isUpdateTargetNodeMode = this.props.nodeModifier.isUpdateTargetNodeMode
        const setUpdateSourceNodeMode = this.props.nodeModifier.setUpdateSourceNodeMode
        const setUpdateTargetNodeMode = this.props.nodeModifier.setUpdateTargetNodeMode
        const setDrawingMode = this.props.nodeModifier.setDrawingMode
        const updateDrawnNodes = this.props.nodeModifier.updateDrawnNodes

        if (this.props.isSourceNode && !isUpdateSourceNodeMode && !isUpdateTargetNodeMode) {
            setUpdateSourceNodeMode()
        }
        else if (this.props.isTargetNode && !isUpdateTargetNodeMode && !isUpdateSourceNodeMode) {
            setUpdateTargetNodeMode()
        }
        else if (!this.props.isSourceNode && !this.props.isTargetNode && !isUpdateSourceNodeMode && !isUpdateTargetNodeMode) {
            setDrawingMode(true)
            if (this.props.isDefaultNode) updateDrawnNodes(this.props.nodeIndex)
        }
    }

    mouseUpHandler() {
        const isUpdateSourceNodeMode = this.props.nodeModifier.isUpdateSourceNodeMode
        const isUpdateTargetNodeMode = this.props.nodeModifier.isUpdateTargetNodeMode
        const isDrawingMode = this.props.nodeModifier.isDrawingMode
        const updateSourceNode = this.props.nodeModifier.updateSourceNode
        const updateTargetNode = this.props.nodeModifier.updateTargetNode
        const setDrawingMode = this.props.nodeModifier.setDrawingMode

        if (isUpdateSourceNodeMode && this.props.isDefaultNode) {
            updateSourceNode(this.props.nodeIndex)
        } 
        else if (isUpdateTargetNodeMode && this.props.isDefaultNode) {
            updateTargetNode(this.props.nodeIndex)
        }
        else if (isDrawingMode) {
            setDrawingMode(false)
        }
    }

    mouseEnterHandler() {
        const isDrawingMode = this.props.nodeModifier.isDrawingMode
        const updateDrawnNodes = this.props.nodeModifier.updateDrawnNodes 
        if (isDrawingMode && this.props.isDefaultNode) {
            updateDrawnNodes(this.props.nodeIndex)
        }
    }


    render() {
        const background = this.getNodeBackground()
        return (
                <td className={background}
                onMouseDown={(e)=>this.mouseDownHandler(e)}
                onMouseUp={(e)=>this.mouseUpHandler()}
                onMouseEnter={(e)=>this.mouseEnterHandler()} 
            >
            </td>
                )

    }
}

export default Node