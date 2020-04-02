import React from 'react';
import { FaMusic, FaUserFriends } from 'react-icons/fa';

const Rooms = (props) => {
  let { room } = props;
  let { host, members } = room;
  let { count, maxCount, queueLength } = props;

  return (
    <a href={`${host.id}`}>

      <button type="button" className="list-group-item list-group-item-action" disabled style={styles}>
        <b>{host.display_name}</b>
        <div>
          <FaUserFriends style={{ marginRight: '.5vw' }} />
          {members.length}
          <FaMusic style={{ margin: '0 .5vw 0 1vw' }} />
          {0}
        </div>
      </button>
    </a>

  )
}

export default Rooms;

let styles = {
  display: 'flex',
  justifyContent: 'space-between',
};