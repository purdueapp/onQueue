import React, { Component, Fragment } from 'react';
import { MdSettings, MdSearch, MdFormatListNumbered } from 'react-icons/md';
import { FaQrcode } from 'react-icons/fa';

import Search from '../components/Search';
import Queue from '../components/Queue';

let settingsDiv = {
  backgroundColor: '#FFFFFF20',
  borderRadius: '25px',
  alignItems: 'center',
  justifyContent: 'center',
};

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: 'queue'
    };

    this.content = this.content.bind(this);
  }

  content() {
    let { tab } = this.state;
    if (tab === 'search') {
      return <Search />
    }
    else if (tab === 'queue') {
      return <Queue />
    }
    return <Fragment />
  }

  render() {
    return (
      <Fragment>
        <div style={settingsDiv} className='p-1 mb-3'>
          <MdFormatListNumbered size='1.3em' className='mx-2' onClick={() => { this.setState({ tab: 'queue' }) }} />
          <MdSearch size='1.3rem' className='mx-2' onClick={() => { this.setState({ tab: 'search' }) }} />
          <FaQrcode size='1.3rem' className='mx-2' />
          <MdSettings size='1.3rem' className='mx-2' />
        </div>
        {this.content()}
      </Fragment>
    )
  }
}

export default Sidebar;