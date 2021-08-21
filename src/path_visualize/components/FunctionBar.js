import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css'
import RangeSlider from 'react-bootstrap-range-slider'
import './FunctionBar.css'

class FunctionBar extends React.Component {
    render() {
        return (
            <div className="button_container">
                <button onClick={()=>this.props.genMaze()}> 
                    GENERATE MAZE 
                </button>
                <select onChange={(event)=>this.props.setAlgo(event.target.value)}>
                    <option value="BFS"> BREADTH-FIRST SEARCH </option>
                    <option value="DFS"> DEPTH-FIRST SEARCH </option>
                    <option value="DIJKSTRA"> DIJKSTRA'S ALGORITHM </option>
                    <option value="ASTAR"> ASTAR (MANHATTAN) </option>
                </select>
                <select onChange={(event)=>this.props.setWallType(event.target.value)}>
                    <option value="NON-PASSABLE WALL"> NON-PASSABLE WALL </option>
                    <option value="WEAK WALL"> WEAK WALL - WEIGHT 50</option>
                </select>
                <button onClick={()=>this.props.isRunning ? this.props.pause() : this.props.start()}>
                    {this.props.isRunning ? 'PAUSE' : 'RUN'}
                </button>
                <div>
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
                <button onClick={()=>this.props.reset()}>
                    RESET
                </button>
            </div>
        )
    }
}

export default FunctionBar