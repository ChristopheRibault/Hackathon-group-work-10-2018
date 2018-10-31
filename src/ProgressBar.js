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
                <img src={monsieurSucre} alt="avatar monsieur Sucre" className="avatar"/>
                <div className='playerCPU'>
                    <p className={`fightResult ${fightResultCPUColor}`}>{fightResultCPU}</p>
                    <Line
                        trailColor="rgba(219, 219, 219, 0.3)"
                        className="ProgressCPU"
                        percent={CPUpurcentage}
                        strokeColor={colorCPU}
                        strokeLinecap="butt"
                        strokeWidth="3"
                    />
                    <p>Monsieur Sucre</p>
                </div>
                <p className="fontPointCPU">{pointCPU}</p>
                <p className="fontPoint">{pointPlayer}</p>
                <div className='playerInfo'>
                    <p className={`fightResult ${fightResultPlayerColor}`}>{fightResultPlayer}</p>
                    <Line
                        trailColor="rgba(219, 219, 219, 0.3)"
                        className="ProgressPlayer"
                        percent={playerPurcentage}
                        strokeColor={colorPlayer}
                        strokeLinecap="butt"
                        strokeWidth="3"
                    />
                    <p>{playerName || 'Joueur anonyme'}</p>
                </div>
                <img className='avatar' src={require(`./avatars/${avatar}-ghost.png`)} alt={avatar} />
            </div>
        )
    }
}

export default ProgressBar;
