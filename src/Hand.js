import React, { Component } from 'react';

import Card from './Card';

import './Hand.css';

class Hand extends Component {

  render(){
    const { playCard, hand } = this.props;

    if(this.props.hand.length){
      return(
        <div className='Hand'>
          {hand.map((card, i) => {
            return(          
              <Card
                playCard={playCard}
                indexInHand={i}
                key={card.id || i}
                name={card.product_name_fr}
                image={card.image_front_small_url}
                sugar={card.nutriments.sugars_100g}
                fat={card.nutriments['saturated-fat_100g']}
              />
            );
          })}
          
        </div>
      )
    } else {
      return(
        <div></div>
      )
    }
  }
}

export default Hand;
