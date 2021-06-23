import React from 'react'
import Table from 'react-bootstrap/Table'
import {draw} from './GridDraw'

class Grid extends React.Component {
    render() {
        return (
            <Table bordered>
                <tbody>
                    {draw(this.props.gridState, this.props.nodeModifier)}           
                </tbody>  
            </Table>
        )
    }
}

export default Grid