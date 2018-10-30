import React, { Component } from 'react';
import axios from 'axios';

import BattleField from './BattleField';
import Hand from './Hand';

import './App.css';

class App extends Component {

  state = {
    deck: [],
    cardPlayed: {}
  }

  /**
   * @author Christophe
   * Gets a deck of 100 cards from the API openfoodfacts.
   * The deck is an array containing all the information of every sweet.
   */
  componentDidMount(){
    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=bonbon&search_simple=1&action=process&page_size=100&json=1`
    axios.get(url)
    .then(res => {
      this.setState({
      deck: res.data.products,
    })})
  }

  /**
   * Removes a card from the deck and returns it.
   * @author Christophe
   * @returns {Array} returns the card that has been removed from the deck
   */
  drawCard = () =>{
    const drawnCardIndex = Math.floor(Math.random()*this.state.deck.length);
    return this.state.deck.splice(drawnCardIndex,1);
  }

  playCard = (cardProps) =>{
    this.setState({
      cardPlayed: cardProps
    })
  }

  render() {
    return (
        this.state.deck.length &&
        <div className="App">
          <BattleField 
            playerCardProps={this.state.cardPlayed}
          />
          <Hand
            playCard={this.playCard}
            drawCard={this.drawCard}
          />          
        </div>
    );
  }
}

export default App;
