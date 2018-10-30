import React, { Component } from 'react';

import Card from './Card';

import './BattleField.css';

class BattleField extends Component {

  componentWillReceiveProps(){
    this.forceUpdate()
  }

  render(){
    const { name, fat, sugar, image } = this.props.playerCardProps
    console.log('CPUProps',this.props.CPUCardProps)
    if(this.props.playerCardProps.name){
      return(
        <div className="BattleField">
          <div className='CPUCard'>
            <Card 
              name={this.props.CPUCardProps.product_name_fr}
              fat={this.props.CPUCardProps.nutriments['saturated-fat_100g']}
              sugar={this.props.CPUCardProps.nutriments.sugars_100g}
              image={this.props.CPUCardProps.image_front_small_url}
              isPlayable={false}
            />
          </div>
          <div className='PlayerCard'>
            <Card 
              name={name}
              fat={fat}
              sugar={sugar}
              image={image}
              isPlayable={false}
            />
          </div>
        </div>
      )
    } else {
      console.log('affiche battlefield vide')
      return(
        <div className="BattleField">
        
        </div>
      )
    }
  }
}
export default BattleField;