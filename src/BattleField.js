import React, { Component } from 'react';

import Card from './Card';

import './BattleField.css';

class BattleField extends Component {

  componentWillReceiveProps() {
    this.forceUpdate() 
  }

  render() {
    const { playerCardProps, CPUCardProps, avatar } = this.props;
    if (this.props.playerCardProps.name) {
      return (
        <div className="BattleField">
          <div className='CPUCard'>

            <Card
              name={CPUCardProps.product_name_fr}
              fat={CPUCardProps.nutriments['saturated-fat_100g']}
              sugar={CPUCardProps.nutriments.sugars_100g}
              image={CPUCardProps.image_front_small_url}
              isPlayable={false}
            />
            <p>CPU</p>
          </div>
          <div className='playerCard'>

            <Card
              name={playerCardProps.name}
              fat={playerCardProps.fat}
              sugar={playerCardProps.sugar}
              image={playerCardProps.image}
              isPlayable={false}
            />
            <div className='playerInfo'>
              <p>{this.props.playerName || 'Joueur anonyme'}</p>
              <img src={require(`./avatars/${avatar}-ghost.png`)} alt={avatar}/>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="BattleField">

        </div>
      )
    }
  }
}
export default BattleField;