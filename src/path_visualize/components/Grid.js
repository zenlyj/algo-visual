import React from 'react'
import {draw} from '../util/GridDraw'
import Table from 'react-bootstrap/Table'

class Grid extends React.Component {
    render() {
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