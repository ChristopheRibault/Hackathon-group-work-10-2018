import React, { Component } from "react";
import { Line } from "rc-progress";

import monsieurSucre from "./monsieurSucre/monsieur-sucre.png";
import "./ProgressBar.css";

class ProgressBar extends Component {


    render() {
        const { avatar, fightResultCPU, CPUpurcentage, colorCPU, pointCPU, pointPlayer, fightResultPlayer, playerPurcentage, colorPlayer, playerName } = this.props
        const fightResultCPUColor = fightResultCPU >= 0 ? 'green' : 'red';
        const fightResultPlayerColor = fightResultPlayer >= 0 ? 'green' : 'red';
        return (
            <div className="ProgressBar">
                <img src={monsieurSucre} alt="avatar monsieur Sucre" className="avatar" />
                <div className='playerCPU'>
                    <div className='pvInfos'>
                        <p className={`fightResult ${fightResultCPUColor}`}>{fightResultCPU}</p>
                        <p className="fontPointCPU">{pointCPU}</p>
                    </div>
                    <Line
                        trailColor="rgba(219, 219, 219, 0.3)"
                        className="ProgressCPU"
                        percent={CPUpurcentage}
                        strokeColor={colorCPU}
                        strokeLinecap="butt"
                        strokeWidth="3"
                    />
                    <p className='playerName'>Monsieur Sucre</p>
                </div>
                <div className='playerInfo'>
                    <div className='pvInfos'>
                        <p className="fontPoint">{pointPlayer}</p>
                        <p className={`fightResult ${fightResultPlayerColor}`}>{fightResultPlayer}</p>
                    </div>
                    <Line
                        trailColor="rgba(219, 219, 219, 0.3)"
                        className="ProgressPlayer"
                        percent={playerPurcentage}
                        strokeColor={colorPlayer}
                        strokeLinecap="butt"
                        strokeWidth="3"
                    />
                    <p className='playerName'>{playerName || 'Joueur anonyme'}</p>
                </div>
                <img className='avatar' src={require(`./avatars/${avatar}-ghost.png`)} alt={avatar} />
            </div>
        )
    }
}

export default ProgressBar;
