import React from 'react';
import { Link } from 'react-router-dom';
import './ProfileItem.css';

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';

const ProfilePlaceItem = ({ id, image, name, email }) => {
  return (
    <li className='profile-item'>
      <Card className='profile-item__content'>
        <Link to={`/account/${id}`}>
          <div className='profile-item__image'>
            <Avatar image={image} alt={name} />
          </div>
          <div className='profile-item__info'>
            <h5>{name}</h5>
            <h5>{email}</h5>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default ProfilePlaceItem;
