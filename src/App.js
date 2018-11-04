import React, { Component } from "react";
import { connect } from "react-redux";
import { startGame } from "./actions/startGameActions";
import {
  handlePlayerNameChange,
  handleInitialPointsChange,
  selectAvatar
} from "./actions/settingsActions";

import BattleField from "./components/BattleField";
import Hand from "./components/Hand";
import Modal from "./components/Modal";
import Settings from "./components/Settings";
import ProgressBar from "./components/ProgressBar";
import Loading from "./components/Loading";

import "./App.css";

class App extends Component {
  state = {
    isPlaying: false,
    deck: [],
    hand: [],
    cardPlayed: {},
    CPUCard: {},
    CPUpurcentage: 100,
    playerPurcentage: 100,
    colorCPU: "#2d8e2a",
    colorPlayer: "#2d8e2a",
    fightResultPlayer: 0,
    fightResultCPU: 0,
    isLoaded: true
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
      let result = this.calculDamage(
        cardProps.sugar,
        newCPUCard.nutriments["saturated-fat_100g"]
      );
      if (newCPUCard.nutriments.sugars_100g == 0) {
        result = -Math.floor(result / 4);
      }
      const CPUPV = Math.min(
        this.state.CPUPV - result,
        this.state.initialPoints
      );
      const CPUpurcentage = (CPUPV * 100) / this.state.initialPoints;
      this.setState({
        CPUPV,
        CPUpurcentage,
        colorCPU: this.getProgressBarColor(CPUpurcentage),
        fightResultCPU: -result
      });
    }

    if (newCPUCard.nutriments.sugars_100g > cardProps.sugar) {
      let result = this.calculDamage(
        newCPUCard.nutriments.sugars_100g,
        cardProps.fat
      );
      if (cardProps.sugar == 0) {
        result = -Math.floor(result / 4);
      }
      const playerPV = Math.min(
        this.state.playerPV - result,
        this.state.initialPoints
      );
      const playerPurcentage = (playerPV * 100) / this.state.initialPoints;
      this.setState({
        playerPV,
        playerPurcentage,
        colorPlayer: this.getProgressBarColor(playerPurcentage),
        fightResultPlayer: -result
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
    const {
      cardPlayed,
      CPUCard,
      hand,
      isPlaying,
      playerName,
      initialPoints,
      avatar
    } = this.props;
    if (isPlaying) {
      return (
        <div className="App">
          {!this.state.isLoaded && <Loading />}
          {(this.state.CPUPV <= 0 ||
            this.state.playerPV <= 0 ||
            this.state.deck.length === 1) && (
            <Modal
              CPUPV={this.state.CPUPV}
              playerPV={this.state.playerPV}
              deck={this.state.deck}
              startGame={this.startGame}
              creatDeck={this.creatDeck}
            />
          )}
          <div className="test">
            <button className="redemarer" onClick={this.startGame}>
              Redémarrer une partie
            </button>
            <button className="retour" onClick={this.return}>
              Retour à l'acceuil
            </button>
          </div>
          <ProgressBar
            playerPurcentage={this.state.playerPurcentage}
            CPUpurcentage={this.state.CPUpurcentage}
            avatar={avatar}
            playerName={playerName}
            colorPlayer={this.state.colorPlayer}
            colorCPU={this.state.colorCPU}
            pointPlayer={this.state.playerPV}
            pointCPU={this.state.CPUPV}
            fightResultPlayer={this.state.fightResultPlayer}
            fightResultCPU={this.state.fightResultCPU}
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
          <Settings />
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  playerName: state.settings.playerName,
  initialPoints: state.settings.initialPoints,
  selectedAvatar: state.settings.selectedAvatar,
  deckIsLoading: state.start.deckIsLoading
});

export default connect(
  mapStateToProps,
  {
    handlePlayerNameChange,
    handleInitialPointsChange,
    selectAvatar,
    startGame
  }
)(App);
