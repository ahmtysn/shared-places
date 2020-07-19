import { GoBell } from "react-icons/go";
import React, { useState } from 'react';
import './NotificationList.css'
import { Link } from "react-router-dom";
import Card from '../UIElements/Card'
import FriendReqList from '../../../friends/components/FriendReqList'

const NotificationList = props => {
  let friendsList = props.items;

  let count = props.count

  const [open, setOpen] = useState(false);
  return <React.Fragment>

    <Link onClick={() => setOpen(!open)} >
      <GoBell size={27} />
    </Link>
    {open && <div className='dropdown'>{count !== 0 ? <FriendReqList items={friendsList} /> : <Card><h3>No New Notifcations</h3></Card>}</div>}

  </React.Fragment>
}




export default NotificationList;