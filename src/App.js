import React, { Component } from "react";
import axios from "axios";

import BattleField from "./BattleField";
import Hand from "./Hand";
import ProgressBar from "./ProgressBar";

import "./App.css";

class App extends Component {
  state = {
    isPlaying: false,
    playerName: "",
    initialPoints: 500,
    deck: [],
    hand: [],
    cardPlayed: {},
    CPUCard: {},
    CPUPV: 500,
    playerPV: 500,
    CPUpurcentage: 100,
    playerPurcentage: 100,
    colorCPU: "#2d8e2a",
    colorPlayer: "#2d8e2a"
  };

  /**
   * @author Thibault
   * @returns {Number} return result of conflict
   * Calcul Damages
   */
  calculDamage = (attWin, defLoose) => {
    const result = Math.floor(attWin - defLoose * 4);
    if (result > 0) {
      return result;
    }
    return 0;
  };

  /**
   * @author Christophe
   * Gets a deck of 100 cards from the API openfoodfacts.
   * The deck is an array containing all the information of every sweet.
   */
  componentDidMount() {
    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=bonbon&search_simple=1&action=process&page_size=100&json=1`;
    axios.get(url).then(res => {
      this.setState({
        deck: res.data.products
      });
    });
  }

  handlePlayerNameChange = e => {
    this.setState({
      playerName: e.target.value
    });
  };

  handleInitialPointsChange = e => {
    this.setState({
      initialPoints: e.target.value,
      CPUPV: e.target.value,
      playerPV: e.target.value
    });
  };

  /**
   * @author Christophe
   * Draws 5 cards from the deck as an inital hand for the player and registers it in the state.
   */
  startGame = e => {
    e.preventDefault();
    const initialHand = [];
    for (let i = 0; i < 5; i++) {
      initialHand.push(this.drawCard()[0]);
    }
    this.setState({
      isPlaying: true,
      hand: initialHand,
      cardPlayed: {},
      CPUCard: {},
      CPUpurcentage: 100,
      playerPurcentage: 100,
      colorCPU: "#2d8e2a",
      colorPlayer: "#2d8e2a"
    });
  };

  return = () => {
    this.setState({
      isPlaying: false,
      playerName: "",
      hand: [],
      cardPlayed: {},
      CPUCard: {},
      CPUPV: 500,
      playerPV: 500,
      CPUpurcentage: 100,
      playerPurcentage: 100
    });
  };

  /**
   * Removes a card from the deck and returns it.
   * @author Christophe
   * @returns {Array} returns the card that has been removed from the deck
   */
  drawCard = () => {
    const drawnCardIndex = Math.floor(Math.random() * this.state.deck.length);
    return this.state.deck.splice(drawnCardIndex, 1);
  };

  playCard = cardProps => {
    const newHand = [...this.state.hand];
    newHand.splice(cardProps.indexInHand, 1, this.drawCard()[0]);
    const newCPUCard = this.drawCard()[0];

    this.setState({
      hand: newHand,
      CPUCard: newCPUCard,
      cardPlayed: cardProps
    });
    if (newCPUCard.nutriments.sugars_100g < cardProps.sugar) {
      const result = this.calculDamage(
        cardProps.sugar,
        newCPUCard.nutriments["saturated-fat_100g"]
      );
      const CPUpurcentage =
        ((this.state.CPUPV - result) * 100) / this.state.initialPoints;
      this.setState({
        CPUPV: this.state.CPUPV - result,
        CPUpurcentage,
        colorCPU: this.getProgressBarColor(CPUpurcentage)
      });
    }
    if (newCPUCard.nutriments.sugars_100g > cardProps.sugar) {
      const result = this.calculDamage(
        newCPUCard.nutriments.sugars_100g,
        cardProps.fat
      );
      const playerPurcentage =
        ((this.state.playerPV - result) * 100) / this.state.initialPoints;
      this.setState({
        playerPV: this.state.playerPV - result,
        playerPurcentage,
        colorPlayer: this.getProgressBarColor(playerPurcentage)
      });
    }
  };

  getProgressBarColor = purcentage => {
    if (purcentage < 20) {
      return "#c90606";
    }
    if (purcentage < 50) {
      return "#ffb12b";
    }
    if (purcentage < 70) {
      return "#f9e500";
    }
    if (purcentage <= 100) {
      return "#2d8e2a";
    }
  };

  render() {
    console.log(this.state.colorCPU, this.state.colorPlayer);

    console.log(this.state.playerPV, this.state.CPUPV);
    console.log("code couleur 2", this.getProgressBarColor(2));

    const {
      cardPlayed,
      CPUCard,
      hand,
      isPlaying,
      playerName,
      initialPoints
    } = this.state;
    if (isPlaying) {
      return (
        <div className="App">
          <button onClick={this.startGame}>Redémarrer</button>
          <button onClick={this.return}>Retour</button>
          <ProgressBar
            playerPurcentage={this.state.playerPurcentage}
            CPUpurcentage={this.state.CPUpurcentage}
            colorPlayer={this.state.colorPlayer}
            colorCPU={this.state.colorCPU}
          />
          <BattleField
            playerName={playerName}
            playerCardProps={cardPlayed}
            CPUCardProps={CPUCard}
          />
          <Hand playCard={this.playCard} drawCard={this.drawCard} hand={hand} />
        </div>
      );
    } else {
      return (
        <div className="App">
          <form>
            <label htmlFor="initialPoints">
              Commencer avec {initialPoints} points
            </label>
            <input
              type="range"
              id="initialPoints"
              min="200"
              max="5000"
              step="100"
              value={initialPoints}
              onChange={this.handleInitialPointsChange}
            />
            <label htmlFor="playerName">Nom : </label>
            <input
              type="text"
              id="playerName"
              onChange={this.handlePlayerNameChange}
              value={playerName}
            />
            <button onClick={this.startGame}>Commencer</button>
          </form>
        </div>
      );
    }
  }
}

export default App;
