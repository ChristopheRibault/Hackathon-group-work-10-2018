import React, { Component } from 'react';

import Card from './Card';

import './BattleField.css';

class BattleField extends Component {


  componentWillReceiveProps() {
    this.forceUpdate() 
  }

  render() {
    const { playerCardProps } = this.props
    const { CPUCardProps } = this.props
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
          <div className='PlayerCard'>

            <Card
              name={playerCardProps.name}
              fat={playerCardProps.fat}
              sugar={playerCardProps.sugar}
              image={playerCardProps.image}

              isPlayable={false}
            />
            <p>{this.props.playerName}</p>
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