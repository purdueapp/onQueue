import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import bg from '../images/bg.jpg'

class Rooms extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  };

  render() {
    return (
      <div>
        <div style={backgroundStyle} />
      </div>
    )
  }
};

export default connect()(Rooms);

let backgroundStyle = {
    background: 'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(' + bg + ')',
    backgrounColor: 'rgba(0, 0, 0, 0.5)',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    filter: 'blur(0.5em)',
    WebkitFilter: 'blur(0.7em)',
    transform: 'scale(1.2)',
    zIndex: '-1',
    transition: 'background ease 2s',
  };