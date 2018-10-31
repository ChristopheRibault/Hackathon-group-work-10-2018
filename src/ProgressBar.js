import React, { Component } from "react";
import { Line } from "rc-progress";
import "./ProgressBar.css";

class ProgressBar extends Component {

    render() {
        const { avatar } = this.props
        return (

            <div className="ProgressBar">
                <div>Avatar</div>
                <div className='playerCPU'>
                    <Line
                        trailColor="rgba(219, 219, 219, 0.3)"
                        className="ProgressCPU"
                        percent={this.props.CPUpurcentage}
                        strokeColor={this.state.colorCPU}
                        strokeLinecap="butt"
                        strokeWidth="3"
                    />
                    <p>CPU</p>
                </div>

                <div className='playerInfo'>
                    <Line
                        trailColor="rgba(219, 219, 219, 0.3)"
                        className="ProgressPlayer"
                        percent={this.props.playerPurcentage}
                        strokeColor={this.state.colorPlayer}
                        strokeLinecap="butt"
                        strokeWidth="3"
                    />
                    <p>{this.props.playerName || 'Joueur anonyme'}</p>
                </div>
                <img className='avatar' src={require(`./avatars/${avatar}-ghost.png`)} alt={avatar} />
            </div>
        )
    }
}

export default ProgressBar;
