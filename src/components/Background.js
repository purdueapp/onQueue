import React, { Component } from 'react';
import Blur from 'react-blur';
import './Background.css';

let backgroundStyle = {
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  zIndex: '-2',
  left: '0vw',
  top: '0vh',
  filter: 'brightness(60%)',
  background: 'black',
  overflow: 'hidden',
};

class Background extends Component {
  render() {
    return (
      <Blur style={backgroundStyle} img={this.props.imageURL} blurRadius={90} enableStyles />
    )
  }
}

export default Background;