import React, { Component } from 'react';

import Card from './Card';

import './App.css';

class App extends Component {

  componentDidMount(){
    
  }

  render() {
    return (
        <div className="App">
          <Card />          
        </div>
    );
  }
}

const mapStateToProps = state => ({
  sweetsDetails: state.search.sweetsDetails,
});

export default connect(mapStateToProps, { searchSweets })(App);
