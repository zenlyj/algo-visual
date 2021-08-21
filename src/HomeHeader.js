import React from 'react'
import './HomeHeader.css'

class HomeHeader extends React.Component {
    render() {
        return (
            <div className="header">
                <a href="#0" onClick={()=>this.props.setHomePage()} className="logo">ALGORITHM VISUALIZER</a>
                <div className="header-right">
                    <a href="#0">HOW TO USE</a>
                    <a href="https://github.com/zenlyj/algo-visualizer" rel="noreferrer noopener" target="_blank">VIEW ON GITHUB</a>
                </div>
            </div>
        )
    }
}

export default HomeHeader