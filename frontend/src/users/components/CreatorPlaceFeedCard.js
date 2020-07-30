import React, { useState, useEffect, Fragment } from "react";
import useHttpRequest from "./../../shared/hooks/http-hook";
import { Link } from 'react-router-dom'
import Card from './../../shared/components/UIElements/Card';
import LoadingSpinner from './../../shared/components/UIElements/LoadingSpinner';
import '../../places/components/PlaceItem.css'
import { Feed, Icon } from 'semantic-ui-react'
const CreatorPlaceFeedCard = (props) => {
    const { place } = props

    const [c, setC] = useState()
    const { isLoading, error, clearError, sendRequest } = useHttpRequest();
    const fetchUsers = async () => {

        try {
            const pCreator = await sendRequest(`http://localhost:5000/api/users/${place.creator}`)
            setC(pCreator);

        } catch (err) {
            console.log("Error in fetching users!", err);
        }

    };
    useEffect(() => {
        fetchUsers();
    }, [sendRequest]);

    return (<Fragment>
        {c ? <h1 style={{ color: 'black' }}>{c.name}  added a new place with the name {place.title} </h1> : <h1>NOt Found</h1>}
        <li className="place-item" key={place.creator}>
            <Card className="place-item__content">
                {isLoading && <LoadingSpinner asOverlay />}
                <div className="place-item__image">

                    <img src={`http://localhost:5000/${place.image}`} alt={place.title} />

                </div>
                <div className="place-item__info">
                    <h2>{place.title}</h2>
                    <h3>{place.address}</h3>
                    <p>{place.description}</p>
                    <Link to={`/${place.creator}/places`} style={{ color: "gray" }}>
                        <div style={{ margin: "20px" }}>
                            {c && <h6>Created By: {c.name}</h6>}
                        </div>
                    </Link>
                    <Feed>
                        <Feed.Event>
                            <Feed.Label>
                                <img src={place.image} />
                            </Feed.Label>
                            <Feed.Content>
                                <Feed.Summary>
                                    <Feed.User>Elliot Fu</Feed.User> added you as a friend
                                 <Feed.Date>1 Hour Ago</Feed.Date>
                                </Feed.Summary>
                                <Feed.Meta>
                                    <Feed.Like>
                                        <Icon name='like' />4 Likes
                                     </Feed.Like>
                                </Feed.Meta>
                            </Feed.Content>
                        </Feed.Event>
                    </Feed>
                </div>
            </Card>
        </li>
    </Fragment>)
}

export default CreatorPlaceFeedCard;