import React, { useState, useEffect } from 'react'
import { Feed, Icon, Image } from 'semantic-ui-react'
import useHttpRequest from "./../../shared/hooks/http-hook";
import Card from './../../shared/components/UIElements/Card';
import '../../places/components/PlaceItem.css'
import CreatorPlaceFeedCard from '../components/CreatorPlaceFeedCard'
import { Link } from 'react-router-dom';
const PlacesFeedUI = ({ news }) => {
  // console.log(news)
  const [p, setP] = useState();
  const { isLoading, error, clearError, sendRequest } = useHttpRequest();
  const fetchUsers = async () => {

    try {
      const place = await sendRequest(`http://localhost:5000/api/places/${news.place}`)
      setP(place);
    } catch (err) {
      console.log("Error in fetching users!", err);
    }

  };
  useEffect(() => {
    fetchUsers();
  }, [sendRequest]);
  return (<React.Fragment>
    {p && <Feed>
      <Feed.Event>
        <Feed.Label image={`http://localhost:5000/${p.creator.image}`} />
        <Feed.Content>
          <Feed.Summary>
            <Link>{p.creator.name}</Link> added a new place <Link> {p.title}</Link>
            <Feed.Date>{news.date}</Feed.Date>
          </Feed.Summary>
          <Feed.Extra images>


            <div>
              <Image
                src={`http://localhost:5000/${p.image}`}
                as='a'
                size='massive'
                href='http://google.com'
                target='HELLO'
              />
            </div>

          </Feed.Extra>
        </Feed.Content>
      </Feed.Event>
      <Feed.Meta>
        <Feed.Like>
          <Icon name='like' />1 Likes
          </Feed.Like>
      </Feed.Meta>
    </Feed>}
  </React.Fragment>)
}

export default PlacesFeedUI
