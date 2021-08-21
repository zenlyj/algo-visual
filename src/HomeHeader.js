import React from 'react'
import './HomeHeader.css'

class HomeHeader extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="header">
                <a href="javascript:;" onClick={()=>this.props.setHomePage()} className="logo">ALGORITHM VISUALIZER</a>
                <div className="header-right">
                    <a href="#home">HOW TO USE</a>
                    <a href="https://github.com/zenlyj/algo-visualizer" target="_blank">VIEW ON GITHUB</a>
                </div>
            </div>
        )
    }
}

export default HomeHeader