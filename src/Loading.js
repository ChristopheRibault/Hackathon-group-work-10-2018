import React, { Component } from 'react';

import Loader from './images/loading.gif';
import './Loading.css';


class Loading extends Component {


  render() {

      return (
        <div className="Loading">
        <img src={Loader} alt="gif du loading"/>
        </div>
      )
    }
  }
export default Loading;