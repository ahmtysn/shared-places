import React, { useState, useEffect } from 'react'
import { Feed, Icon, Image } from 'semantic-ui-react'
import useHttpRequest from "./../../shared/hooks/http-hook";
import LoadingSpinner from "./../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "./../../shared/components/UIElements/Modal/ErrorModal"; 
import '../../places/components/PlaceItem.css'
import { Link } from 'react-router-dom';
const PlacesFeedUI = ({ news }) => {
  // console.log(news)
  const [p, setP] = useState();
  const { isLoading, error, clearError, sendRequest } = useHttpRequest();
  const fetchUsers = async () => {

    try {
      const place = await sendRequest(`http://localhost:5000/api/places/${news.place}`)
  console.log('creator.id',place.creator.id)

      setP(place);
    } catch (err) {
      console.log("Error in fetching users!", err);
    }

  };
  useEffect(() => {
    fetchUsers();
  }, [sendRequest]);
  return (<React.Fragment>
    <ErrorModal error={error} onClear={clearError} />
    {isLoading && <LoadingSpinner asOverlay />}
    {!isLoading && p && <Feed>
      <Feed.Event>
        <Feed.Label>
          <Link to={`/${p.creator.id}/places`}>
            <Image
              src={`http://localhost:5000/${p.creator.image}`}
            />
          </Link>
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            <Link to={`/${p.creator.id}/places`}>{p.creator.name}</Link> added a new place <Link to={`/${p.creator.id}/places`}> {p.title}</Link>
            <Feed.Date>{news.date}</Feed.Date>
          </Feed.Summary>
          <Feed.Extra images>
          <Link to={`/${p.creator.id}/places`}>
              <div>
                <Image
                  src={`http://localhost:5000/${p.image}`}
                  as='a'
                  size='massive'
                  href='http://google.com'
                  target='HELLO'
                />
              </div>
          </Link>
          </Feed.Extra>
        </Feed.Content>
      </Feed.Event>
      <Feed.Meta>
        <Feed.Like>
          <Link> <Icon name='like' color="red" />1 Likes</Link>
        </Feed.Like>
      </Feed.Meta>
    </Feed>}
  </React.Fragment>)
}

export default PlacesFeedUI
