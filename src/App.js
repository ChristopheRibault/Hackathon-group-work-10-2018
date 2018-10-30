import React, { Component } from 'react';
import axios from 'axios'

import Hand from './Hand';

import './App.css';

class App extends Component {

  state = {
    deck: [],
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
    const card = Math.floor(Math.random()*100);
    return this.state.deck.splice(card,1);
  }

  render() {
    const { deck } = this.state;
    console.log(deck)
    return (
        this.state.deck.length &&
        <div className="App">
          <Hand 
            drawCard={this.drawCard}
          />          
        </div>
    );
  }
}

export default App;
