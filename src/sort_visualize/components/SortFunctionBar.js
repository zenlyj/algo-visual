import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css'
import RangeSlider from 'react-bootstrap-range-slider'
import './SortFunctionBar.css'

class SortFunctionBar extends React.Component {
    render() {
        return (
            <div className="sort_button_container">
                <button onClick={()=>this.props.generateRandomArray()}> 
                    SHUFFLE ARRAY
                </button>
                <select onChange={(event)=>this.props.setAlgo(event.target.value)}>
                    <option value="SELECTION"> SELECTION SORT </option>
                    <option value="BUBBLE"> BUBBLE SORT </option>
                    <option value="MERGE"> MERGE SORT </option>
                    <option value="QUICK"> QUICK SORT </option>
                    <option value="GRAVITY"> GRAVITY SORT </option>
                </select>
                <button onClick={()=>this.props.isRunning ? this.props.pause() : this.props.start()}>
                    {this.props.isRunning ? 'PAUSE' : 'RUN'}
                </button>
                <div>
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
            </div>
        )
    }
}

export default SortFunctionBar