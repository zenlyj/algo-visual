import React from 'react'
import { Nav, NavDropdown } from 'react-bootstrap'
import NavBar from 'react-bootstrap/NavBar'
import './MenuBar.css'

class MenuBar extends React.Component{
    render() {
        return (
            <NavBar bg="dark" variant='dark'>
                <NavBar.Brand> PATH-FINDER </NavBar.Brand>
                <NavBar.Collapse id ="responsive-navbar-nav">
                    <Nav>
                        <Nav.Link> <button className='nav_bar_item' onClick={()=>this.props.genMaze()}> 
                            GENERATE MAZE </button> 
                        </Nav.Link>
                        <NavDropdown title="SELECT ALGORITHM">
                            <NavDropdown.Item> <button className='drop_down_item' onClick={()=>this.props.setAlgo('BFS')}> Breadth-First Search </button></NavDropdown.Item>
                            <NavDropdown.Item> <button className='drop_down_item' onClick={()=>this.props.setAlgo('DFS')}> Depth-First Search </button></NavDropdown.Item>
                            <NavDropdown.Item> <button className='drop_down_item' onClick={()=>this.props.setAlgo('DIJKSTRA')}> Dijkstra </button></NavDropdown.Item>
                            <NavDropdown.Item> <button className='drop_down_item' onClick={()=>this.props.setAlgo('ASTAR')}> ASTAR </button> </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="SELECT WALL">
                            <NavDropdown.Item> <button className='drop_down_item' onClick={()=>this.props.setWallType('UNPASSABLE')}> NON-PASSABLE WALL </button> </NavDropdown.Item>
                            <NavDropdown.Item> <button className='drop_down_item' onClick={()=>this.props.setWallType('PASSABLE')}> PASSABLE WALL </button> </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link> <button className='nav_bar_item' onClick={()=> {this.props.isRunning ? this.props.pause() : this.props.start()}}> 
                            {this.props.isRunning ? 'PAUSE' : 'RUN'} </button> 
                        </Nav.Link>
                        {!this.props.isRunning ? <Nav.Link> <button className='nav_bar_item' onClick={()=>this.props.clearVisuals()}> CLEAR VISUALISATIONS </button> </Nav.Link> : null}
                        {!this.props.isRunning ? <Nav.Link> <button className='nav_bar_item' onClick={()=>this.props.reset()}> RESET BOARD </button> </Nav.Link> : null}
                    </Nav>
                </NavBar.Collapse>
            </NavBar>
        )
    }
}

export default MenuBar