import React, { Component } from "react";

import avatars from "./avatars";
import monsieurSucre from "./monsieurSucre/monsieur-sucre.gif";
import Loading from "./Loading";
import Rules from "./Rules";

import "./Settings.css";

class Settings extends Component {
  state = {
    hideRules: true
  };

  shoRules = (e) => {
    e.preventDefault()
    this.setState({
      hideRules: false
    });
    console.log("va dans sho", this.state.showRules);
  };

  hideRules = () => {
    this.setState({
      hideRules: true
    });
    console.log("va dans hide", this.state.showRules);
  };

  render() {
    const {
      initialPoints,
      handleInitialPointsChange,
      handlePlayerNameChange,
      selectAvatar,
      playerName,
      startGame,
      selectedAvatar
    } = this.props;
    return (
      <div>
        {!this.state.hideRules && <Rules close={this.hideRules} />}
        <div className="Settings">
          {!this.props.isLoaded && <Loading />}
          <div className="versus">
            <img
              src={monsieurSucre}
              alt="avatar monsieur Sucre"
              className="avatarMS"
            />
            <p className="VS">VS</p>
            <img
              src={require(`./avatars/${selectedAvatar}-ghost.png`)}
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
                    src={require(`./avatars/${avatar}-ghost.png`)}
                    alt={avatar}
                    key={i}
                  />
                ))}
              </div>
            </fieldset>
            <button className="rules" onClick={this.shoRules}>
              Règles
            </button>

            <button onClick={startGame}>A l'attaque</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Settings;
