import React, { Component } from 'react';
import Epee from './images/sword_icon-icons.com_64425.png';
import Bouclier from './images/security-shield_icon-icons.com_55078.png';

import './Card.css';

class Card extends Component{

  render(){
    const { image, name, playCard, isPlayable } = this.props;
    let { sugar, fat } = this.props;
    fat = Math.ceil(fat);
    sugar = Math.ceil(sugar);
    return(
      <div className={`Card ${this.props.className}`} onClick={_=>{if(isPlayable)playCard(this.props)}}>
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
                <td><img src={Epee} className='icon'/> Sucro poing</td>
                <td>{sugar}</td>
              </tr>
              <tr>
                <td><img src={Bouclier} className='icon'/> Boucli gras</td>
                <td>{fat}</td>
              </tr>
            </tbody>
          </table>
        </div>
    );
  }
}

export default Card;
