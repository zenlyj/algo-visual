import React from 'react'
import PathFinder from './path_visualize/PathFinder'
import Sorter from './sort_visualize/Sorter'
import Button from 'react-bootstrap/Button'

class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            pathFind:false,
            sorting:false
        }
    }

    render() {
        return (
        (!this.state.pathFind && !this.state.sorting) ?
                (<body style={{height:'100vh', background:'black'}}>
                <div style={{background:'inherit'}}>
                    Path Finding Algorithms
                    <Button variant="outline-secondary" onClick={()=>this.setState({pathFind:true})}> GO </Button>
                </div>
                <div>
                    Sorting Algorithms
                    <Button variant="outline-secondary" onClick={()=>this.setState({sorting:true})}> GO </Button>
                </div>
                </body>) :
        (this.state.pathFind) ? 
            (<PathFinder />) : 
        (this.state.sorting) ?
            (<Sorter />) : null)
    }
}

export default Main
