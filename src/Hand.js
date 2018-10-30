import React, { Component } from 'react';

import Card from './Card';

import './Hand.css';

class Hand extends Component {

  state = {
    hand: [],
  }

  /**
   * @author Christophe
   * Draws 5 cards from the deck as an inital hand for the player and registers it in the state.
   */
  startGame = () => {
    const initialHand = [];
    for (let i = 0; i < 5; i++) {
      initialHand.push(this.props.drawCard()[0])
    }
    this.setState({
      hand: initialHand,
    })
  }

  render(){
    const { hand } = this.state;
    const { playCard } = this.props;

    if(this.state.hand.length){
      return(
        <div className='Hand'>
          {hand.map((card, i) => {
            return(
            <Card
              playCard={playCard}
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
        <button onClick={this.startGame}>Commencer partie !</button>
      )
    }
  }
}

export default Hand;
