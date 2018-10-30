import React, { Component } from 'react';
import axios from 'axios'

import Hand from './Hand';

import './App.css';

class App extends Component {

  state = {
    deck: [],
  }

  componentDidMount(){
    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=bonbon&search_simple=1&action=process&page_size=100&json=1`
    axios.get(url)
    .then(res => {
      this.setState({
      deck: res.data.products,
    })})
  }

  drawCard = () =>{
    const card = Math.floor(Math.random()*100);
    return this.state.deck.splice(card,1);
  }

  render() {
    const { deck } = this.state;
    console.log(deck)
    return (
        this.state.deck.length &&
        <div className="App">
          <Hand 
            drawCard={this.drawCard}
          />          
        </div>
    );
  }
}

export default App;
