import React from 'react';
import { FaMusic, FaUserFriends } from 'react-icons/fa';

const Rooms = (props) => {
  let { host, count, maxCount, queueLength } = props;

  if ( count >= maxCount  || !count || !maxCount ){
    return(
      <button type="button" className="list-group-item list-group-item-action" disabled style={styles}>
      <b>{host ? host : "host ID"}</b>
      <div>
        <FaUserFriends style={{ marginRight: '.5vw' }} />
        {count ? count : 0}/{maxCount ? maxCount : 0}
        <FaMusic style={{ margin: '0 .5vw 0 1vw' }} />
        {queueLength ? queueLength : 0}
      </div>
    </button>
    )
  }

  return(
    <button type="button" className="list-group-item list-group-item-action" style={styles}>
      <b>{host ? host : "host"}</b>
      <div>
        <FaUserFriends style={{ marginRight: '.5vw' }} />
        {count ? count : 0}/{maxCount ? maxCount : 0}
        <FaMusic style={{ margin: '0 .5vw 0 1vw' }} />
        {queueLength ? queueLength : 0}
      </div>
    </button>
  );
}

export default Rooms;

let styles = {
  display: 'flex',
  justifyContent: 'space-between',
};