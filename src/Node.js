import React from 'react'
import './Grid.css';

class Node extends React.Component{
    constructor() {
        super()
        this.buttonActionHandler = this.buttonActionHandler.bind(this)
    }
    
    getNodeBackground() {
        let nodeBackground = 'default'
        if (this.props.isStartNode) nodeBackground = 'start_node'
        else if (this.props.isEndNode) nodeBackground = 'end_node'
        else if (this.props.isPathNode) nodeBackground = 'path_node'
        else if (this.props.isVisitedNode) nodeBackground = 'visited_node'
        return nodeBackground
    }

    buttonActionHandler() {
        if (this.props.isStartNode && !this.props.isUpdateSourceNodeMode && !this.props.isUpdateEndNodeMode) {
            this.props.setUpdateSourceNodeMode()
        }
        else if (this.props.isEndNode && !this.props.isUpdateEndNodeMode && !this.props.isUpdateSourceNodeMode) {
            this.props.setUpdateEndNodeMode()
        }
        else if (this.props.isUpdateSourceNodeMode && !this.props.isEndNode) {
            this.props.updateSourceNode(this.props.nodeIndex)
        }
        else if (this.props.isUpdateEndNodeMode && !this.props.isStartNode) {
            this.props.updateEndNode(this.props.nodeIndex)
        }
    }

    render() {
        return (<td className={this.getNodeBackground()}>
            <button className='node_btn' onClick={()=>this.buttonActionHandler()}></button>
        </td>)
    }
}

export default Node