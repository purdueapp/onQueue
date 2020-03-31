import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { MdSettings, MdSearch, MdFormatListNumbered } from 'react-icons/md';
import { FaQrcode, FaUsers } from 'react-icons/fa';

import Search from '../components/Search';
import Queue from '../components/Queue';
import Users from '../components/Users';
import Settings from '../components/Settings';
import Player from '../components/Player';

let settingsDiv = {
  backgroundColor: '#FFFFFF30',
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
    else if (tab === 'users') {
      return <Users />
    }
    else if (tab === 'settings') {
      return <Settings />
    }
    return (
      <Player />
    )
  }

  render() {
    let { nextTracks } = this.props.trackWindow;
    return (
      <Fragment>
        <h6>Queued Songs: {nextTracks.length}</h6>
        <div style={settingsDiv} className='p-1 mb-3'>
          <MdFormatListNumbered size='1.3em' className='mx-2' onClick={() => { this.setState({ tab: 'queue' }) }} />
          <MdSearch size='1.3rem' className='mx-2' onClick={() => { this.setState({ tab: 'search' }) }} />
          <FaQrcode size='1.3rem' className='mx-2' onClick={() => { this.setState({ tab: 'qrcode' }) }} />
          <FaUsers size='1.3rem' className='mx-2' onClick={() => { this.setState({ tab: 'users' }) }} />
          <MdSettings size='1.3rem' className='mx-2' onClick={() => { this.setState({ tab: 'settings' }) }} />
        </div>
        {this.content()}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  trackWindow: state.spotify.trackWindow
})

export default connect(mapStateToProps)(Sidebar);
