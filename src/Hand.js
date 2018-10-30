import React, { Component } from 'react';

import Card from './Card';

import './Hand.css';

class Hand extends Component {

  state = {
    hand: [],
  }

  /**
   * @author Christophe
   * Draws 5 cards from the deck as an inital hand for the player et registers it in the state.
   */
  componentDidMount(){
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
    console.log(this.state.hand)

    return(
      this.state.hand.length &&
      <div className='Hand'>
        {hand.map(card => {
          return(
          <Card
            key={card.id}
            name={card.product_name_fr}
            image={card.image_front_small_url}
            sugar={card.nutriments.sugars_100g}
            fat={card.nutriments['saturated-fat_100g']}
          />
          )
          }
        )}
      </div>
    );
  }
}

export default Hand;
