import React from 'react'
import Table from 'react-bootstrap/Table'
import {draw} from './GridDraw'

class Grid extends React.Component {
    render() {
        return (
            <Table bordered>
                <tbody>
                    {draw(this.props.gridState.visitedNodes, this.props.gridState.sourceNode, this.props.gridState.targetNode, this.props.gridState.gridSize, this.props.gridState.pathToTarget)}           
                </tbody>  
            </Table>
        )
    }
}

export default Grid