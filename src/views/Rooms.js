import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardColumns, CardDeck } from 'react-bootstrap';
import bg from '../images/bg.jpg';
import { FaArrowLeft } from 'react-icons/fa';

class Rooms extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  };

  render() {
    return (
      <div style={containerStyle}>
        <Button variant="link" style={back} href="/" >
          <FaArrowLeft /> Back
        </Button>

        <CardColumns style={{ width: 'min-content' }}>

          <Card bg="light" style={{ width: '15rem' }}>
            <Card.Body>
              <Card.Title>tobi's Queue</Card.Title>
              <Card.Text>
                Description
              </Card.Text>
              <Button variant="success" href="host/tobi">Enter Room</Button>
            </Card.Body>
          </Card>
  
          <Card bg="light" style={{ width: '15rem' }}>
            <Card.Body>
              <Card.Title>jiena76's Queue</Card.Title>
              <Card.Text>
                Description
              </Card.Text>
              <Button variant="success" href="host/jiena76">Enter Room</Button>
            </Card.Body>
          </Card>
  
          <Card bg="light" style={{ width: '15rem' }}>
            <Card.Body>
              <Card.Title>vivian's Queue</Card.Title>
              <Card.Text>
                Description
              </Card.Text>
              <Button variant="success">Enter Room</Button>
            </Card.Body>
          </Card>
  
          <Card bg="light" style={{ width: '15rem' }}>
            <Card.Body>
              <Card.Title>youngsik's Queue</Card.Title>
              <Card.Text>
                Description
              </Card.Text>
              <Button variant="success">Enter Room</Button>
            </Card.Body>
          </Card>

          <Card bg="light" style={{ width: '15rem' }}>
            <Card.Body>
              <Card.Title>eric's Queue</Card.Title>
              <Card.Text>
                Description
              </Card.Text>
              <Button variant="success">Enter Room</Button>
            </Card.Body>
          </Card>

          <Card bg="light" style={{ width: '15rem' }}>
            <Card.Body>
              <Card.Title>kiran's Queue</Card.Title>
              <Card.Text>
                Description
              </Card.Text>
              <Button variant="success">Enter Room</Button>
            </Card.Body>
          </Card>
          
        </CardColumns>

        <div style={backgroundStyle} />
      </div>
    )
  }
};

export default connect()(Rooms);

let back = {
  color: 'white',
  margin: '1em',
  position: 'absolute',
  top: '0',
  left: '0',
};

let containerStyle = {
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)'
}

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