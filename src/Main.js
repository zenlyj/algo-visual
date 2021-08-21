import React from 'react'
import PathFinder from './path_visualize/PathFinder'
import Sorter from './sort_visualize/Sorter'
import './Main.css'
import HomeHeader from './HomeHeader'
import sortSegment from './resources/sortSegment.gif'
import pathSegment from './resources/pathSegment.gif'

class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            pathFind:false,
            sorting:false
        }
        this.setHomePage = this.setHomePage.bind(this)
    }

    getHomePage() {
        return (
            <div className='mode_options_container'>
                <div>
                    <h1> SORTING ALGORITHMS </h1>
                    <button onClick={()=>this.setState({sorting:true, pathFind:false})}>
                        <img src={sortSegment} alt="loading..." />
                    </button>
                </div>
                <div>
                    <h1> PATH FINDING ALGORITHMS </h1>
                    <button onClick={()=>this.setState({pathFind:true, sorting:false})}>
                        <img src={pathSegment} alt="loading..." />
                    </button>
                </div>
            </div>
        )
    }

    setHomePage() {
        this.setState({pathFind:false, sorting:false})
    }

    render() {
        return (
            <div>
                <HomeHeader setHomePage={this.setHomePage}/>
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
