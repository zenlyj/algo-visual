import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css'
import RangeSlider from 'react-bootstrap-range-slider'
import { Nav, NavDropdown } from 'react-bootstrap'
import NavBar from 'react-bootstrap/NavBar'
import './SortingMenuBar.css'

class MenuBar extends React.Component{
    render() {
        return (
            <NavBar bg="dark" variant='dark'>
                <NavBar.Brand> SORTER </NavBar.Brand>
                <NavBar.Collapse id ="responsive-navbar-nav">
                    <Nav>
                        <Nav.Link>
                            <button className='nav_bar_item' onClick={()=>{this.props.generateRandomArray()}}> 
                                    SHUFFLE ARRAY
                            </button> 
                        </Nav.Link>
                        <NavDropdown className='nav_bar_dropdown' title={this.props.selectedAlgo === null ? "SELECT ALGO" : this.props.selectedAlgo}>
                            <NavDropdown.Item> <button className='drop_down_item' onClick={()=>this.props.setAlgo('SELECTION SORT')}> SELECTION SORT </button></NavDropdown.Item>
                            <NavDropdown.Item> <button className='drop_down_item' onClick={()=>this.props.setAlgo('BUBBLE SORT')}> BUBBLE SORT </button></NavDropdown.Item>
                            <NavDropdown.Item> <button className='drop_down_item' onClick={()=>this.props.setAlgo('MERGE SORT')}> MERGE SORT </button></NavDropdown.Item>
                            <NavDropdown.Item> <button className='drop_down_item' onClick={()=>this.props.setAlgo('QUICK SORT')}> QUICK SORT </button></NavDropdown.Item>
                            <NavDropdown.Item> <button className='drop_down_item' onClick={()=>this.props.setAlgo('GRAVITY SORT')}> GRAVITY SORT </button></NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link> 
                            <button className='nav_bar_item' onClick={()=> {this.props.isRunning ? this.props.pause() : this.props.start()}}> 
                                {this.props.isRunning ? 'PAUSE' : 'RUN'} 
                            </button> 
                        </Nav.Link>
                        <div className='nav_bar_item'>
                            SPEED
                            <RangeSlider 
                                value={(300 - this.props.delay)/50}
                                onChange={changeEvent => {
                                    const delay = 300 - (changeEvent.target.value*50)
                                    this.props.setDelay(delay)}
                                }
                                min={1}
                                max={5}                              
                            />
                        </div>
                    </Nav>
                </NavBar.Collapse>
            </NavBar>
        )
    }
}

export default MenuBar