import React, { Component } from 'react';

import './Card.css';

class Card extends Component{

  render(){
    const { image, name, sugar, fat, playCard, isPlayable } = this.props;
    return(
      <div className='Card' onClick={_=>{if(isPlayable)playCard(this.props)}}>
          <h3>{name.substring(0,34)}</h3>
          <div className='card_image' style={{background: `url(${image}) no-repeat top`}}>
          </div>
          <table>
            <thead>
              <tr>
                <td>Cholestéforces</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sucro poing</td>
                <td>{sugar}</td>
              </tr>
              <tr>
                <td>Couche de graisse</td>
                <td>{fat}</td>
              </tr>
            </tbody>
          </table>
        </div>
    );
  }
}

export default Card;
