import React from 'react';
import { ListGroupItem } from 'react-bootstrap';
import { FaMusic, FaUserFriends } from 'react-icons/fa';

const Room = (props) => {
  let { host, members, isPrivate } = props.room;

  if ( isPrivate ){
    return;
  }

  return (
    <ListGroupItem action href={`${host.id}`} style={styles}>
      <b>{host.display_name}</b>
      <div>
        <FaUserFriends style={{ marginRight: '.5vw' }} />
        {members.length}
        <FaMusic style={{ margin: '0 .5vw 0 1vw' }} />
        {0}
      </div>
    </ListGroupItem>
  )
}

export default Room;

let styles = {
  display: 'flex',
  justifyContent: 'space-between',
};