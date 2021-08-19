import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css'
import RangeSlider from 'react-bootstrap-range-slider'
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
                        <NavDropdown className='nav_bar_dropdown' title={this.props.selectedAlgo === null ? "SELECT ALGORITHM" : this.props.selectedAlgo}>
                            <NavDropdown.Item> <button className='drop_down_item' onClick={()=>this.props.setAlgo('BREADTH-FIRST SEARCH')}> BREADTH-FIRST SEARCH </button></NavDropdown.Item>
                            <NavDropdown.Item> <button className='drop_down_item' onClick={()=>this.props.setAlgo('DEPTH-FIRST SEARCH')}> DEPTH-FIRST SEARCH </button></NavDropdown.Item>
                            <NavDropdown.Item> <button className='drop_down_item' onClick={()=>this.props.setAlgo('DIJKSTRA\'S SHORTEST PATH')}> DIJKSTRA'S SHORTEST PATH </button></NavDropdown.Item>
                            <NavDropdown.Item> <button className='drop_down_item' onClick={()=>this.props.setAlgo('ASTAR')}> ASTAR </button> </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown className='nav_bar_dropdown' title={this.props.selectedWallType === null ? "SELECT WALL" : this.props.selectedWallType}>
                            <NavDropdown.Item> <button className='drop_down_item' onClick={()=>this.props.setWallType('NON-PASSABLE WALL')}> NON-PASSABLE WALL </button> </NavDropdown.Item>
                            <NavDropdown.Item> <button className='drop_down_item' onClick={()=>this.props.setWallType('WEAK WALL')}> WEAK WALL </button> </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link> <button className='nav_bar_item' onClick={()=> {this.props.isRunning ? this.props.pause() : this.props.start()}}> 
                            {this.props.isRunning ? 'PAUSE' : 'RUN'} </button> 
                        </Nav.Link>
                        <div className='nav_bar_item'>
                            SPEED
                            <RangeSlider 
                                value={(250 - this.props.delay)/50}
                                onChange={changeEvent => {
                                    const delay = 250 - (changeEvent.target.value*50)
                                    this.props.setDelay(delay)}
                                }
                                min={1}
                                max={5}                              
                            />
                        </div>
                        {!this.props.isRunning ? <Nav.Link> <button className='nav_bar_item' onClick={()=>this.props.clearVisuals()}> CLEAR VISUALISATIONS </button> </Nav.Link> : null}
                        {!this.props.isRunning ? <Nav.Link> <button className='nav_bar_item' onClick={()=>this.props.reset()}> RESET BOARD </button> </Nav.Link> : null}
                    </Nav>
                </NavBar.Collapse>
            </NavBar>
        )
    }
}

export default MenuBar