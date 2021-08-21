import React from 'react'
import {draw} from '../util/GridDraw'
import Table from 'react-bootstrap/Table'
import './Grid.css'

class Grid extends React.Component {
    render() {
        return (
            <div className="table_container">
            <Table bordered size='sm'>
                <tbody>
                    {draw(this.props.gridState, this.props.nodeModifier)}           
                </tbody>  
            </Table>
            </div>
        )
    }
}

export default Grid