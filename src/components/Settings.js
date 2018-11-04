import React, { Component } from "react";
import { connect } from "react-redux";

import {
  handlePlayerNameChange,
  handleInitialPointsChange,
  selectAvatar
} from "../actions/settingsActions";

import { startGame } from "../actions/startGameActions";

import avatars from "../avatars";
import monsieurSucre from "../images/monsieurSucre/monsieur-sucre.gif";
import Loading from "./Loading";

import "./Settings.css";

class Settings extends Component {
  render() {
    const {
      initialPoints,
      playerName,
      startGame,
      selectedAvatar,
      selectAvatar,
      handleInitialPointsChange,
      handlePlayerNameChange
    } = this.props;
    return (
      <div className="Settings">
        {this.props.deckIsLoading && <Loading />}
        <div className="versus">
          <img
            src={monsieurSucre}
            alt="avatar monsieur Sucre"
            className="avatarMS"
          />
          <p className="VS">VS</p>
          <img
            src={require(`../images/avatars/${selectedAvatar}-ghost.png`)}
            alt="avatar selectionné"
            className="avatarMS"
          />
        </div>
        <h1 className="sugarWar">SUGAR WAR</h1>

        <form>
          <fieldset className="pointsFieldset">
            <label htmlFor="initialPoints">
              Resistance de ton foie : {initialPoints} calories
            </label>
            <input
              type="range"
              id="initialPoints"
              min="200"
              max="2000"
              step="100"
              value={initialPoints}
              onChange={handleInitialPointsChange}
            />
          </fieldset>

          <fieldset>
            <label htmlFor="playerName">Pseudo : </label>
            <input
              type="text"
              id="playerName"
              onChange={handlePlayerNameChange}
              value={playerName}
            />
          </fieldset>

          <fieldset>
            <label htmlFor="avatar">Avatar : </label>
            <div className="avatarsList">
              {avatars.map((avatar, i) => (
                <img
                  id={avatar}
                  onClick={selectAvatar}
                  src={require(`../images/avatars/${avatar}-ghost.png`)}
                  alt={avatar}
                  key={i}
                />
              ))}
            </div>
          </fieldset>

          <button onClick={startGame}>A l'attaque</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  playerName: state.settings.playerName,
  initialPoints: state.settings.initialPoints,
  selectedAvatar: state.settings.selectedAvatar,
  deckIsLoading: state.start.deckIsLoading,
});

export default connect(
  mapStateToProps,
  {
    handlePlayerNameChange,
    handleInitialPointsChange,
    selectAvatar,
    startGame,
  }
)(Settings);
