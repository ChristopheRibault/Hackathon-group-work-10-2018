import React, { Component } from 'react';

import avatars from './avatars';

import './Settings.css';

class Settings extends Component {
  render(){
    const { initialPoints, handleInitialPointsChange, handlePlayerNameChange, selectAvatar, playerName, startGame } = this.props
    return(
      <div className='Settings'>
        <h1>SUGAR WAR</h1>
        <form>
          <fieldset className='pointsFieldset'>
            <label htmlFor='initialPoints'>Commencer à {initialPoints} points</label>
            <input type='range' id='initialPoints' min='200' max='5000' step='100' value={initialPoints} onChange={handleInitialPointsChange} />
          </fieldset>
          <fieldset>
            <label htmlFor='playerName'>Nom : </label>
            <input type='text' id='playerName' onChange={handlePlayerNameChange} value={playerName} />
          </fieldset>
          <fieldset>
            <label htmlFor='avatar'>Avatar : </label>
            <div className='avatarsList'>
              {avatars.map((avatar,i) =>
                <img id={avatar} onClick={selectAvatar} src={require(`./avatars/${avatar}-ghost.png`)} alt={avatar} key={i}/>
              )}
            </div>
          </fieldset>
          <button onClick={startGame}>Commencer</button>
        </form>
      </div>
    );
  }
}

export default Settings;
