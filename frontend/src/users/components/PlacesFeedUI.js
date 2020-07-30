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
          <Image
            src={`http://localhost:5000/${p.creator.image}`}
          />
        </Feed.Label>
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
          <Link> <Icon name='like' color="red" />1 Likes</Link>
        </Feed.Like>
      </Feed.Meta>
    </Feed>}
  </React.Fragment>)
}

export default PlacesFeedUI
