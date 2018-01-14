import React, { Component } from 'react';

import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Potential Intruders</h1>
        </header>

        <Button raised color="danger" >
          <a href="tel:7787062154">Call Emergency</a>
        </Button>

        <div><img alt="something" src="https://s3.ca-central-1.amazonaws.com/nwhacksiot/pic1.jpg" /></div>
        <div><img alt="something" src="https://s3.ca-central-1.amazonaws.com/nwhacksiot/pic2.jpg" /></div>
        <div><img alt="something" src="https://s3.ca-central-1.amazonaws.com/nwhacksiot/pic3.jpg" /></div>
        <div><img alt="something" src="https://s3.ca-central-1.amazonaws.com/nwhacksiot/pic4.jpg" /></div>        
        <div><img alt="something" src="https://s3.ca-central-1.amazonaws.com/nwhacksiot/pic5.jpg" /></div>
        <div><img alt="something" src="https://s3.ca-central-1.amazonaws.com/nwhacksiot/pic6.jpg" /></div>
        <div><img alt="something" src="https://s3.ca-central-1.amazonaws.com/nwhacksiot/pic7.jpg" /></div>
        <div><img alt="something" src="https://s3.ca-central-1.amazonaws.com/nwhacksiot/pic8.jpg" /></div>
        <div><img alt="something" src="https://s3.ca-central-1.amazonaws.com/nwhacksiot/pic9.jpg" /></div>
        <div><img alt="something" src="https://s3.ca-central-1.amazonaws.com/nwhacksiot/pic10.jpg" /></div>

      </div>
    );
  }
}

export default App;
