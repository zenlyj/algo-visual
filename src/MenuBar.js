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
                        <NavDropdown title="SELECT ALGORITHM">
                            <NavDropdown.Item> <button className='drop_down_item' onClick={()=>this.props.setAlgo('BFS')}> Breadth-First Search </button></NavDropdown.Item>
                            <NavDropdown.Item> <button className='drop_down_item' onClick={()=>this.props.setAlgo('DFS')}> Depth-First Search </button></NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="SELECT WALL">
                            <NavDropdown.Item> <button className='drop_down_item' onClick={()=>this.props.setWallType('UNPASSABLE')}> NON-PASSABLE WALL </button> </NavDropdown.Item>
                            <NavDropdown.Item> <button className='drop_down_item' onClick={()=>this.props.setWallType('PASSABLE')}> PASSABLE WALL </button> </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link> <button className='nav_bar_item' onClick={()=>this.props.executeAlgo()}> RUN </button> </Nav.Link>
                        <Nav.Link> <button className='nav_bar_item' onClick={()=>this.props.reset()}> RESET </button> </Nav.Link>
                    </Nav>
                </NavBar.Collapse>
            </NavBar>
        )
    }
}

export default MenuBar