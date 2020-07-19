import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './UserItem.css';
import AuthContext from '../../shared/context/auth-context';
import Avatar from './../../shared/components/UIElements/Avatar';
import Card from './../../shared/components/UIElements/Card';
import AddFriend from '../../friends/components/AddFriend'
import DeleteFriend from '../../friends/components/DeleteFriend'
const UserItem = ({ user }) => {
  const auth = useContext(AuthContext);
  const currentPath = window.location.pathname;
  console.log(currentPath)
  const { id, image, name, places } = user;
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${id}/places`}>
          <div className="user-item__image">
            <Avatar image={`http://localhost:5000/${image}`} alt={name} />
          </div>
          <div className="user-item__info">
            <h2>{name}</h2>
            <h3>
              {places.length} {places.length === 1 ? 'Place' : 'Places'}
            </h3>
          </div>
        </Link>
        {auth.isLoggedIn &&
          <>



            {currentPath === '/' && <AddFriend receivedRequestId={user.id} userId={auth.userId} token={auth.token} />}
            {currentPath === `/${auth.userId}/friends` && <DeleteFriend receivedRequestId={user.id} userId={auth.userId} />}
          </>
        }
      </Card>
    </li>
  );
};

export default UserItem;
