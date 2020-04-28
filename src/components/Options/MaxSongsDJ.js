import React, { Component } from 'react';
import {Col, Row} from 'react-bootstrap';
import { connect } from 'react-redux';
import NumericInput from 'react-numeric-input';

class MaxSongsDJ extends Component{
    constructor(props) {
            super(props);
        this.state = {
          max: "no limit"
        }
    }
    
    handleEvent = (e) => {
          let { socket } = this.props;
          socket.emit('update', {
            type: 'settings',
            settings: {
              djLimit: e
            }
          })
    }

    render(){
        return(
        <Row className = 'my-2'>
            <Col align ='left' className="pr-0">
              <p className='mt-1' style={{whiteSpace: 'nowrap', overflow: 'auto' }}>Max Songs DJ Can Queue</p>
            </Col>
            <Col align = 'right' className='pl-0'>
              <NumericInput min={0} max={50} value={this.props.room.settings.djLimit}
                size={3}
                style={style}
                onChange={this.handleEvent}
              />
            </Col>
        </Row>
        )
    }
    
}
const mapStateToProps = state => ({
  room: state.room,
  socket: state.socket
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(MaxSongsDJ);

let style = {
  span: {
    color: '#6C757D'
  },
  input: {
    borderRadius: '4px 2px 2px 4px',
    borderColor: "#FFF",
    color: '#fff',
    class: "w3-input w3-border w3-round-large",
    background: "#6C757D"
  },
  arrowUp: {
    borderBottomColor: '#dddddd'
  },
  arrowDown: {
      borderTopColor: '#dddddd'
  }
};