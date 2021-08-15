import React from 'react'
import { Nav, NavDropdown } from 'react-bootstrap'
import NavBar from 'react-bootstrap/NavBar'
import './MenuBar.css'

class MenuBar extends React.Component{
    render() {
        return (
            <NavBar bg="dark" variant='dark'>
                <NavBar.Brand> SORTER </NavBar.Brand>
                <NavBar.Collapse id ="responsive-navbar-nav">
                    <Nav>
                        <Nav.Link>
                            <button className='nav_bar_item' onClick={()=>{this.props.generateRandomArray()}}> 
                                    RANDOMIZE ARRAY
                            </button> 
                        </Nav.Link>
                        <NavDropdown title="SELECT ALGORITHM">
                            <NavDropdown.Item> <button className='drop_down_item' onClick={()=>this.props.setAlgo('SELECTION')}> Selection Sort </button></NavDropdown.Item>
                            <NavDropdown.Item> <button className='drop_down_item' onClick={()=>this.props.setAlgo('BUBBLE')}> Bubble Sort </button></NavDropdown.Item>
                            <NavDropdown.Item> <button className='drop_down_item' onClick={()=>this.props.setAlgo('MERGE')}> Merge Sort </button></NavDropdown.Item>
                            <NavDropdown.Item> <button className='drop_down_item' onClick={()=>this.props.setAlgo('QUICK')}> Quick Sort </button></NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link> 
                            <button className='nav_bar_item' onClick={()=> {this.props.isRunning ? this.props.pause() : this.props.start()}}> 
                                {this.props.isRunning ? 'PAUSE' : 'RUN'} 
                            </button> 
                        </Nav.Link>
                    </Nav>
                </NavBar.Collapse>
            </NavBar>
        )
    }
}

export default MenuBar