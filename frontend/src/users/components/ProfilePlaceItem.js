import React from 'react';
import { Link } from 'react-router-dom';
import './ProfileItem.css';

import Avatar from './../../shared/components/UIElements/Avatar';
import Card from './../../shared/components/UIElements/Card';

const ProfilePlaceItem = ({ id, image, title, address }) => {
  return (
    <li className='profile-item'>
      <Card className='profile-item__content'>
        <Link to={`/places/${id}/details`}>
          <div className='profile-item__image'>
            <Avatar image={image} alt={title} />
          </div>
          <div className='profile-item__info'>
            <h5>{title}</h5>
            <h5>{address}</h5>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default ProfilePlaceItem;
