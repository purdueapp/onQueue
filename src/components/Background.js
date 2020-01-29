import React, { Component } from 'react';

class Background extends Component {
  render() {
    return (
      <div style={{
        background: "linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url(" + this.props.url + "), none",
        backgrounColor: "rgba(0, 0, 0, 0.5)",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        height: '100%',
        width: '100%',
        position: "absolute",
        filter: "blur(1em)",
        WebkitFilter: "blur(1em)",
        transform: "scale(1.2)",
        zIndex: "-1",
        //transition: "background ease 2s",
      }}>
      </div>
    )
  }
}

export default Background;