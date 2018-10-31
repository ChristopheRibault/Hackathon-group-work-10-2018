import React, { Component } from 'react';
import axios from 'axios';

import BattleField from './BattleField';
import Hand from './Hand';
import Modal from './Modal'
import Settings from './Settings';
import ProgressBar from './ProgressBar';

import './App.css';

class App extends Component {

  state = {
    isPlaying: false,
    playerName: '',
    initialPoints: 500,
    avatar: 'alien',
    deck: [],
    hand: [],
    cardPlayed: {},
    CPUCard: {},
    CPUPV: 500,
    playerPV: 500,
    CPUpurcentage: 100,
    playerPurcentage: 100
  }


  creatDeck = () => {
    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=bonbon&search_simple=1&action=process&page_size=100&json=1`
    return axios.get(url)
      .then(res => {
        this.setState({
          deck: res.data.products,
        })
      })
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

  selectAvatar = (e) => {
    this.setState({
      avatar: e.target.id,
    })
  }

  /**
 * @author Christophe
 * Draws 5 cards from the deck as an inital hand for the player and registers it in the state.
 */

  startGame = async (e) => {
    e.preventDefault()
    await this.creatDeck()
    const initialHand = [];
    for (let i = 0; i < 5; i++) {
      initialHand.push(this.drawCard()[0])
    }
    this.setState({
      isPlaying: true,
      hand: initialHand,
      cardPlayed: {},
      CPUCard: {},
      CPUpurcentage: 100,
      playerPurcentage: 100

    })
  }

  return = () => {
    this.setState({
      isPlaying: false,
      playerName: '',
      hand: [],
      cardPlayed: {},
      CPUCard: {},
      CPUPV: 500,
      playerPV: 500,
      CPUpurcentage: 100,
      playerPurcentage: 100
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
    const newHand = [...this.state.hand];
    newHand.splice(cardProps.indexInHand, 1, this.drawCard()[0]);
    const newCPUCard = this.drawCard()[0];

    this.setState({
      hand: newHand,
      CPUCard: newCPUCard,
      cardPlayed: cardProps,
    })
    if (newCPUCard.nutriments.sugars_100g < cardProps.sugar) {
      const result = this.calculDamage(cardProps.sugar, newCPUCard.nutriments['saturated-fat_100g'])
      this.setState({
        CPUPV: this.state.CPUPV - result,
        CPUpurcentage: this.state.CPUPV * 100 / this.state.initialPoints
      })
    }
    if (newCPUCard.nutriments.sugars_100g > cardProps.sugar) {
      const result = this.calculDamage(newCPUCard.nutriments.sugars_100g, cardProps.fat)
      this.setState({
        playerPV: this.state.playerPV - result,
        playerPurcentage: this.state.playerPV * 100 / this.state.initialPoints
      })
    }
  }

  render() {
    console.log(this.state.playerPV, this.state.CPUPV)
    const { cardPlayed, CPUCard, hand, isPlaying, playerName, initialPoints, avatar } = this.state;
    if (isPlaying) {
      return (
        <div className="App">
          {(this.state.CPUPV <= 0 || this.state.playerPV <= 0 || this.state.deck.length === 1) &&
            <Modal
              CPUPV={this.state.CPUPV}
              playerPV={this.state.playerPV}
              deck={this.state.deck}
              return={this.return}
              creatDeck={this.creatDeck}
            />
          }
          <button onClick={this.startGame}>Redémarrer</button>
          <button onClick={this.return}>Retour</button>
          <ProgressBar
            playerPurcentage={this.state.playerPurcentage}
            CPUpurcentage={this.state.CPUpurcentage}
          />
          <BattleField
            playerName={playerName}
            avatar={avatar}
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
          <Settings
            initialPoints={initialPoints}
            playerName={playerName}
            handleInitialPointsChange={this.handleInitialPointsChange}
            handlePlayerNameChange={this.handlePlayerNameChange}
            selectAvatar={this.selectAvatar}
            startGame={this.startGame}
          />
        </div>
      );
    }
  }
}

export default App;
