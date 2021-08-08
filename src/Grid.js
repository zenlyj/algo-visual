import React from 'react'
import Table from 'react-bootstrap/Table'
import {draw} from './GridDraw'

class Grid extends React.Component {
    render() {
        console.log(this.props.gridState)
        return (
            <Table bordered size='sm'>
                <tbody>
                    {draw(this.props.gridState, this.props.nodeModifier)}           
                </tbody>  
            </Table>
        )
    }
}

export default Grid