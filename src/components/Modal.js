import React, { Component } from 'react';

import MonsieurSucre from '../images/monsieurSucre/youwin.png';
import Doigt from '../images/monsieurSucre/doigt.png';

import './Modal.css';

class Modal extends Component {
    render() {
        return (
            <div className='Modal'>
                <div className='modal'>
                    {this.props.CPUPV < 0 &&
                        <div className='win'>
                        <img src={MonsieurSucre} alt="You win"/>
                            <h1>YOU WIN !</h1>
                        </div>}
                    {this.props.playerPV < 0 &&
                        <div className='loose'>
                        <img src={Doigt} alt="You loose"/>
                            <h1>YOU LOOSE...</h1>
                        </div>}
                    {this.props.deck.length === 1 && <div>
                        <h1>Deck Vide, égalité...</h1>
                        {/* <button onClick={_ => this.props.creatDeck()}>Continuer la partie</button> */}
                    </div>
                    }
                    <button onClick={e => this.props.startGame(e)}>Recommencer une partie</button>
                </div>
            </div>

        )
    }
}
export default Modal;