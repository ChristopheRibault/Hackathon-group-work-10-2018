import React, { Component } from "react";
import { Line } from "rc-progress";

import monsieurSucre from "./monsieurSucre/monsieur-sucre.png";
import "./ProgressBar.css";

class ProgressBar extends Component {

    render() {
        const { avatar } = this.props
        return (

            <div className="ProgressBar">
                <img src={monsieurSucre} alt="avatar monsieur Sucre" className="avatar"/>
                <div className='playerCPU'>
                    <Line
                        trailColor="rgba(219, 219, 219, 0.3)"
                        className="ProgressCPU"
                        percent={this.props.CPUpurcentage}
                        strokeColor={this.props.colorCPU}
                        strokeLinecap="butt"
                        strokeWidth="3"
                    />
                    <p>Monsieur Sucre</p>
                </div>
                <p className="fontPointCPU">{this.props.pointCPU}</p>
                <p className="fontPoint">{this.props.pointPlayer}</p>
                <div className='playerInfo'>
                    <Line
                        trailColor="rgba(219, 219, 219, 0.3)"
                        className="ProgressPlayer"
                        percent={this.props.playerPurcentage}
                        strokeColor={this.props.colorPlayer}
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
