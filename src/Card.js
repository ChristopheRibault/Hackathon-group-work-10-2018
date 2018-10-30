import React, { Component } from 'react';

class Card extends Component{
  render(){
    return(
      <div className='Card'>
        <h2>Title</h2>
        <img src='image' alt='title' />
        <table>
          <thead>
            <tr>
              <td>Caractéristique</td>
              <td>Valeur</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Taux de sucre</td>
              <td>100g</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Card;
