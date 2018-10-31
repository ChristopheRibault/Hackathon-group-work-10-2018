import React, { Component } from 'react';

import './Modal.css';

class Modal extends Component {
    render() {
        return (
            <div className='Modal'>
                <div className='modal'>
                    {this.props.CPUPV < 0 && <h1>YOU WIN !</h1>}
                    {this.props.playerPV < 0 && <h1>YOU LOOSE !</h1>}
                    {this.props.deck.length === 1 && <div>
                        <h1>Deck Vide</h1>
                        {/* <button onClick={_ => this.props.creatDeck()}>Continuer la partie</button> */}
                    </div>
                    }
                    <button onClick={e => this.props.return(e)}>Recommencer une partie</button>
                </div>
            </div>

        )
    }
}
export default Modal;