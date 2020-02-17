import React, { Component } from 'react';
import {Col} from 'react-bootstrap';

class MaxSongsDJ extends Component{
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
              <p className='mt-1' style={{whiteSpace: 'nowrap', overflow: 'auto' }}>Max Songs DJ Can Queue</p>
            </Col>
              <Col>
                <div class="btn-group align='right">
                  <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {this.state.max}
                  </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a class="dropdown-item" href="#">1</a>
                      <a class="dropdown-item" href="#">2</a>
                      <a class="dropdown-item" href="#">3</a>
                      <a class="dropdown-item" href="#">4</a>
                      <a class="dropdown-item" href="#">5</a>
                      <a class="dropdown-item" href="#">6</a>
                      <a class="dropdown-item" href="#">7</a>
                      <a class="dropdown-item" href="#">8</a>
                      <a class="dropdown-item" href="#">No Limit</a>
                    </div>
                </div>
            </Col>
        </div>
        )
    }
    
}
export default MaxSongsDJ;