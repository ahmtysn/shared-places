import { GoBell } from 'react-icons/go';
import React, { useState } from 'react';
import './NotificationList.css';
import { Link } from 'react-router-dom';
import Card from '../UIElements/Card';
import FriendReqList from '../../../friends/components/FriendReqList';

const NotificationList = (props) => {
  let friendsList = props.items;

  let count = props.count;

  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <div className='notification-link'>
        <Link to='#' onClick={() => setOpen(!open)}>
          <GoBell className='bell' size={27} />
        </Link>
      </div>
      {open && (
        <div className='dropdown'>
          {' '}
          {count !== 0 ? (
            <FriendReqList bell={props.bell} items={friendsList} />
          ) : (
            <Card className='notification'>
              <h3>No New Notifications</h3>
            </Card>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default NotificationList;
