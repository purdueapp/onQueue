import React, { Component } from 'react';
import {Col} from 'react-bootstrap';
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
        <div className='text-left my-3'>
            <Col>
              <p className='mt-1' style={{whiteSpace: 'nowrap', overflow: 'auto' }}>Max Songs in Queue</p>
            </Col>
              <Col>
                <NumericInput min={0} max={100} value={100}/>
            </Col>
        </div>
        )

    }
    
}
export default MaxSongsQueue;