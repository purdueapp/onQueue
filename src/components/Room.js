import React from 'react';
import { ListGroupItem } from 'react-bootstrap';
import { FaMusic, FaUserFriends } from 'react-icons/fa';

const Rooms = (props) => {
  let { host, count, maxCount, queueLength } = props;

  if ( count >= maxCount || !maxCount ){
    return(
      <ListGroupItem disabled style={styles}>
      <b>{host ? host : "host ID"}</b>
      <div>
        <FaUserFriends style={{ marginRight: '.5vw' }} />
        {count ? count : 0}/{maxCount ? maxCount : 0}
        <FaMusic style={{ margin: '0 .5vw 0 1vw' }} />
        {queueLength ? queueLength : 0}
      </div>
    </ListGroupItem>
    )
  }

  return(
    <ListGroupItem action variant="success" href={`/host/${host}`} style={styles}>
      <b>{host ? host : "host"}</b>
      <div>
        <FaUserFriends style={{ marginRight: '.5vw' }} />
        {count ? count : 0}/{maxCount ? maxCount : 0}
        <FaMusic style={{ margin: '0 .5vw 0 1vw' }} />
        {queueLength ? queueLength : 0}
      </div>
    </ListGroupItem>
  );
}

export default Rooms;

let styles = {
  display: 'flex',
  justifyContent: 'space-between',
};