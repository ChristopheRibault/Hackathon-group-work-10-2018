import React, { Component } from 'react';

import { Line } from 'rc-progress';
import './ProgressBar.css';
 
class ProgressBar extends Component{

    state={
        colorCPU: "#2d8e2a",
        colorPlayer: "#2d8e2a"
    }

    componentWillReceiveProps(){
        if(this.props.playerPurcentage < 70){
            this.setState({
                colorPlayer:"#f9e500"
            })
        }if(this.props.playerPurcentage < 50){
            this.setState({
                colorPlayer:"#ffb12b"
            })
        }if(this.props.playerPurcentage < 20){
            this.setState({
                colorPlayer:"#c90606"
            })
        }if(this.props.CPUpurcentage < 70){
            this.setState({
                colorCPU:"#f9e500"
            })
        }if(this.props.CPUpurcentage < 50){
            this.setState({
                colorCPU:"#ffb12b"
            })
        }if(this.props.CPUpurcentage < 20){
            this.setState({
                colorCPU:"#c90606"
            })
        }
    }

    render(){
        
        return(

            <div className="ProgressBar">
                <div>Avatar</div>
                    <Line
                        trailColor="rgba(219, 219, 219, 0.3)"
                        className="ProgressCPU"
                        percent={this.props.CPUpurcentage}
                        strokeColor={this.state.colorCPU}
                        strokeLinecap="butt"
                        strokeWidth="3"
                    />
                
                    <Line
                        trailColor="rgba(219, 219, 219, 0.3)"
                        className="ProgressPlayer"
                        percent={this.props.playerPurcentage}
                        strokeColor={this.state.colorPlayer}
                        strokeLinecap="butt"
                        strokeWidth="3"
                    />
                <div>Avatar</div>
            </div>
        )
    }
}

export default ProgressBar;