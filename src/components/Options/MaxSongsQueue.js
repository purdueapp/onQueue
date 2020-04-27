import React, { Component } from 'react';
import {Col, Row} from 'react-bootstrap';
import NumericInput from 'react-numeric-input';

class MaxSongsQueue extends Component{
    constructor(props) {
            super(props);
        this.state = {
          max: "no limit"
        }
    } 

    render(){
      return(
        <Row className = 'my-2'>
            <Col align='left' className='pr-0'>
              <p className='mt-1' style={{whiteSpace: 'nowrap', overflow: 'auto' }}>Max Songs in Queue</p>
            </Col>
              <Col align='right' className='pl-0'>
                <NumericInput min={0} max={100} value={100} 
                  size={3}
                  style={{
                    span: {
                      color: '#6C757D'
                    },
                    input: {
                      borderRadius: '4px 2px 2px 4px',
                      borderColor: "#6C757D",
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
                  }}/>
            </Col>
        </Row>
        )

    }
    
}
export default MaxSongsQueue;