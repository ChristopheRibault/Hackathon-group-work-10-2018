import React, { Component } from 'react';
import axios from 'axios';

import BattleField from './BattleField';
import Hand from './Hand';

import './App.css';

class App extends Component {



  state = {
    isPlaying: false,
    playerName: '',
    initialPoints: 500,
    deck: [],
    hand: [],
    cardPlayed: {},
    CPUCard: {},
    CPUPV: 500,
    playerPV: 500,

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

  handlePlayerNameChange = (e) => {
    this.setState({
      playerName: e.target.value,
    })
  }

  handleInitialPointsChange = (e) => {
    this.setState({
      initialPoints: e.target.value,
      CPUPV: e.target.value,
      playerPV: e.target.value,
    })
  }

    /**
   * @author Christophe
   * Draws 5 cards from the deck as an inital hand for the player and registers it in the state.
   */
  startGame = () => {
    const initialHand = [];
    for (let i = 0; i < 5; i++) {
      initialHand.push(this.drawCard()[0])
    }
    this.setState({
      isPlaying: true,
      hand: initialHand,
      cardPlayed: {},
      CPUCard: {},
      CPUPV: 500,
      playerPV: 500,
    })
  }

  return = () => {
    this.setState({
      isPlaying: false,
      playerName: '',
      deck: [],
      hand: [],
      cardPlayed: {},
      CPUCard: {},
      CPUPV: 500,
      playerPV: 500,
    })
  }

  /**
   * Removes a card from the deck and returns it.
   * @author Christophe
   * @returns {Array} returns the card that has been removed from the deck
   */
  drawCard = () => {
    const drawnCardIndex = Math.floor(Math.random()*this.state.deck.length);
    return this.state.deck.splice(drawnCardIndex,1);
  }

  playCard = (cardProps) =>{
    const newHand = [...this.state.hand];
    newHand.splice(cardProps.indexInHand,1,this.drawCard()[0]);
    const newCPUCard = this.drawCard()[0];

    this.setState({
      hand: newHand,
      CPUCard: newCPUCard,
      cardPlayed: cardProps,
    })
    if (newCPUCard.nutriments.sugars_100g < cardProps.sugar){
      const result = this.calculDamage(cardProps.sugar,newCPUCard.nutriments['saturated-fat_100g'])   
      this.setState({
        CPUPV: this.state.CPUPV - result,
      })
    } 
    if (newCPUCard.nutriments.sugars_100g > cardProps.sugar) {
      const result = this.calculDamage(newCPUCard.nutriments.sugars_100g,cardProps.fat)
      this.setState({
        playerPV: this.state.playerPV - result,
      })
    } 
  }

  render() {
    console.log(this.state.playerPV,this.state.CPUPV)
    const { cardPlayed, CPUCard, hand, isPlaying, playerName, initialPoints } = this.state;
    if(isPlaying){
      return (
        <div className="App">
        <button onClick={this.startGame}>Redémarrer</button>
        <button onClick={this.return}>Retour</button>
          <BattleField
            playerName={playerName}
            playerCardProps={cardPlayed}
            CPUCardProps={CPUCard}
          />
          <Hand
            playCard={this.playCard}
            drawCard={this.drawCard}
            hand={hand}
          />          
        </div>
      );
    } else {
      return (
        <div className='App'>
          <label htmlFor='initialPoints'>Commencer avec {initialPoints} points</label>
          <input type='range' id='initialPoints' min='200' max='5000' step='100' value={initialPoints} onChange={this.handleInitialPointsChange} />
          <label htmlFor='playerName'>Nom : </label>
          <input type='text' id='playerName' onChange={this.handlePlayerNameChange} value={playerName} />
          <button onClick={this.startGame}>Commencer</button>
        </div>
      );
    }
  }
}

export default App;
