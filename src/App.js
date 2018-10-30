import React, { Component } from 'react';
import axios from 'axios';

import BattleField from './BattleField';
import Hand from './Hand';

import './App.css';

class App extends Component {



  state = {
    deck: [],
    cardPlayed: {},
    CPUCard: {},
    CPUPV: 1000,
    playerPV: 1000,

  }


  /**
   * @author Thibault
   * @returns {Number} return result of conflict
   * Calcul Damages 
   */
  calculDamage = (attWin, defLoose) => {
    const result = Math.floor(attWin - defLoose * 4)
    if (result > 0) {
      return result
    }
    return 0
  }

  /**
   * @author Christophe
   * Gets a deck of 100 cards from the API openfoodfacts.
   * The deck is an array containing all the information of every sweet.
   */
  componentDidMount() {
    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=bonbon&search_simple=1&action=process&page_size=100&json=1`
    axios.get(url)
      .then(res => {
        this.setState({
          deck: res.data.products,
        })
      })
  }

  /**
   * Removes a card from the deck and returns it.
   * @author Christophe
   * @returns {Array} returns the card that has been removed from the deck
   */
  drawCard = () => {
    const drawnCardIndex = Math.floor(Math.random() * this.state.deck.length);
    return this.state.deck.splice(drawnCardIndex, 1);
  }

  playCard = (cardProps) => {
    const CPUCard = this.drawCard()[0];
    this.setState({
      cardPlayed: cardProps,
      CPUCard: CPUCard,
    })
    if (CPUCard.nutriments.sugars_100g < cardProps.sugar){
      const result = this.calculDamage(cardProps.sugar,CPUCard.nutriments['saturated-fat_100g'])   
      this.setState({
        CPUPV: this.state.CPUPV - result,
      })
    } else {
      const result = this.calculDamage(CPUCard.nutriments.sugars_100g,cardProps.fat)
      this.setState({
        playerPV: this.state.playerPV - result,
      })
    }
  }

  render() {
    return (
      this.state.deck.length &&
      <div className="App">

        <BattleField
          playerCardProps={this.state.cardPlayed}
          CPUCardProps={this.state.CPUCard}
        />
        <Hand
          playCard={this.playCard}
          drawCard={this.drawCard}
          playedCardIndex={this.state.cardPlayed.indexInHand}
        />
      </div>
    );
  }
}

export default App;
