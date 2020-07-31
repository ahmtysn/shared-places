import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import AuthContext from '../../shared/context/auth-context';
import AcceptFriendReq from './AcceptFriendReq'
import RejectFriendReq from './RejectFriendReq'
import '../../users/components/UserItem.css';
import './friendItem.css'
const FriendItem = props => {
    const auth = useContext(AuthContext);
    return (
        <React.Fragment>
            <li className="friend-item">
                <Card className="friend-item__content">
                    <Link>
                        <div className="friend-item__image">
                            <Avatar image={`http://localhost:5000/${props.image}`} alt={props.name} />
                        </div>
                        <div className="friend-item__info">
                            <h2>You have a new friend request from <b>{props.name}</b></h2>
                        </div>
                    </Link>
                    {auth.isLoggedIn &&
                        <div className="btns">
                            <div className="btn">
                            <AcceptFriendReq receivedRequestId={props.id} userId={auth.userId} token={auth.token}/>
                            </div>
                            <div className="btn">
                            <RejectFriendReq receivedRequestId={props.id} userId={auth.userId} token={auth.token}/>
                           </div>
                        </div>
                    }

                </Card>
            </li>

        </React.Fragment>
    );
};

export default FriendItem;
