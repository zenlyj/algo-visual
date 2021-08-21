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
    }

    getHomePage() {
        return (
            <div className='mode_options_container'>
                <div>
                    <h1> SORTING ALGORITHMS </h1>
                    <button onClick={()=>this.setState({sorting:true})}><img src={sortSegment} alt="loading..." /></button>
                </div>
                <div>
                    <h1> PATH FINDING ALGORITHMS </h1>
                    <button onClick={()=>this.setState({pathFind:true})}><img src={pathSegment} alt="loading..." /></button>
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
