import React from 'react'
import './Grid.css';

class Node extends React.Component{

    getNodeBackground() {
        let nodeBackground = 'default'
        if (this.props.isStartNode) nodeBackground = 'start_node'
        else if (this.props.isEndNode) nodeBackground = 'end_node'
        else if (this.props.isPathNode) nodeBackground = 'path_node'
        else if (this.props.isVisitedNode) nodeBackground = 'visited_node'
        return nodeBackground
    }

    render() {
        return (<td className={this.getNodeBackground()}>
                </td>)
    }
}

export default Node