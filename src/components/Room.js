import React from 'react';
import { Button, Card, CardColumns } from 'react-bootstrap';

const Rooms = () => {
  return(
    <Card className="Rooms" bg="light" style={{ width: '15rem' }}>
      <Card.Body>
        <Card.Title>tobi's Queue</Card.Title>
          <Card.Text>
            Description
          </Card.Text>
        <Button variant="success" href="host/tobi">Enter Room</Button>
      </Card.Body>
    </Card>
  );
}

export default Rooms;