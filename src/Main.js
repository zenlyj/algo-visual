import React from 'react'
import PathFinder from './path_visualize/PathFinder'
import Sorter from './sort_visualize/Sorter'
import Button from 'react-bootstrap/Button'
import './Main.css'
import HomeHeader from './HomeHeader'

class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            pathFind:false,
            sorting:false
        }
    }

    getHomePage() {
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
    }

    render() {
        return (
            <div>
                <HomeHeader />
                <div className={'app_container'}> 
                    {this.state.pathFind ? <PathFinder />
                        : this.state.sorting ? <Sorter />
                        : this.getHomePage()
                    }
                </div>
            </div>
        )
    }
}

export default Main
