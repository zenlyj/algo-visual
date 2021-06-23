import React from 'react'
import './Grid.css';

class Node extends React.Component{
    constructor() {
        super()
        this.buttonActionHandler = this.buttonActionHandler.bind(this)
    }
    
    getNodeBackground() {
        let nodeBackground = 'default'
        if (this.props.isSourceNode) nodeBackground = 'source_node'
        else if (this.props.isTargetNode) nodeBackground = 'target_node'
        else if (this.props.isPathNode) nodeBackground = 'path_node'
        else if (this.props.isVisitedNode) nodeBackground = 'visited_node'
        return nodeBackground
    }

    buttonActionHandler() {
        const isUpdateSourceNodeMode = this.props.nodeModifier.isUpdateSourceNodeMode
        const isUpdateTargetNodeMode = this.props.nodeModifier.isUpdateTargetNodeMode
        const setUpdateSourceNodeMode = this.props.nodeModifier.setUpdateSourceNodeMode
        const setUpdateTargetNodeMode = this.props.nodeModifier.setUpdateTargetNodeMode
        const updateSourceNode = this.props.nodeModifier.updateSourceNode
        const updateTargetNode = this.props.nodeModifier.updateTargetNode

        if (this.props.isSourceNode && !isUpdateSourceNodeMode && !isUpdateTargetNodeMode) {
            setUpdateSourceNodeMode()
        }
        else if (this.props.isTargetNode && !isUpdateTargetNodeMode && !isUpdateSourceNodeMode) {
            setUpdateTargetNodeMode()
        }
        else if (isUpdateSourceNodeMode && !this.props.isTargetNode) {
            updateSourceNode(this.props.nodeIndex)
        }
        else if (isUpdateTargetNodeMode && !this.props.isSourceNode) {
            updateTargetNode(this.props.nodeIndex)
        }
    }

    render() {
        return (<td className={this.getNodeBackground()}>
            <button className='node_btn' onClick={()=>this.buttonActionHandler()}></button>
        </td>)
    }
}

export default Node