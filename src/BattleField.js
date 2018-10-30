import React, { Component } from 'react';

import Card from './Card';

class BattleField extends Component {

  componentWillReceiveProps(){
    this.forceUpdate()
  }

  render(){
    const { name, fat, sugar, image } = this.props.playerCardProps
    if(this.props.playerCardProps.name){
      return(
        <div className="BattleField">
          {/* <Card /> */}
          <Card 
            name={name}
            fat={fat}
            sugar={sugar}
            image={image}
          />
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