import React, { Component } from 'react';

let backgroundStyle = {
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  filter: 'blur(1em)',
  width: '100%',
  height: '100%',
  position: 'absolute',
  WebkitFilter: 'blur(60em)',
  transform: 'scale(3)',
  zIndex: '-1',
  transition: 'background ease 2s',
};

class Background extends Component {
  render() {
    return (
      <div style={{
        ...backgroundStyle,
        background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${this.props.imageURL})`
      }} />
    )
  }
}

export default Background;