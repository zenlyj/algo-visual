import React from 'react'
import PathFinder from './PathFinder'
import Sorter from './Sorter'
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
        if (!this.state.pathFind && !this.state.sorting) {
            return (
                <div>
                <div>
                    Path Finding Algorithms
                    <Button variant="outline-secondary" onClick={()=>this.setState({pathFind:true})}> GO </Button>
                </div>
                <div>
                    Sorting Algorithms
                    <Button variant="outline-secondary" onClick={()=>this.setState({sorting:true})}> GO </Button>
                </div>
                </div>
            )
        } else if (this.state.pathFind) {
            return <PathFinder />
        } else if (this.state.sorting) {
            return <Sorter />
        }
    }
}

export default Main
