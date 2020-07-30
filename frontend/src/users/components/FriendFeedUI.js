import React, { useState, useEffect } from 'react'
import { Feed, Icon } from 'semantic-ui-react'
import useHttpRequest from "./../../shared/hooks/http-hook";
import useAuth from "../../shared/hooks/auth-hook";
import { Link } from 'react-router-dom';
//import 'semantic-ui-css/semantic.min.css'


const FriendFeedUI = ({ news }) => {
  const { userId } = useAuth();
  console.log('userId', userId)

  const [u1, setU1] = useState();
  const [u2, setU2] = useState();
  const { isLoading, error, clearError, sendRequest } = useHttpRequest();
  const fetchUsers = async () => {

    try {
      const user1 = await sendRequest(`http://localhost:5000/api/users/${news.user1}`);
      const user2 = await sendRequest(`http://localhost:5000/api/users/${news.user2}`);

      setU1(user1);
      setU2(user2);
      console.log(news)

    } catch (err) {
      console.log("Error in fetching users!", err);
    }

  };

  // Fetch users before page loads, with empty [] only runs once
  useEffect(() => {
    fetchUsers();
  }, [sendRequest]);
  return (
    <React.Fragment>
      {u1 && u2 && <Feed>
        <Feed.Event>
          <Feed.Label >
            <img src={`http://localhost:5000/${u1.image}`} />
            {console.log(u1.image)}
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>
              {userId === news.user1 ?
                <>
                  <Link> You </Link> and <Link> {u2.name} </Link>
                </>
                :
                userId === news.user2 ?
                  <>
                    <Link> You </Link> and <Link> {u1.name} </Link>
                  </>
                  :
                  <>
                    <Link> {u1.name} </Link> and <Link> {u2.name} </Link>
                  </>
              }
                 are friends now
                  <Feed.Date>1 Hour Ago</Feed.Date>
            </Feed.Summary>
          </Feed.Content>
          <Feed.Meta>
            <Feed.Like>
              <Icon name='like' />8 Likes
          </Feed.Like>
          </Feed.Meta>
        </Feed.Event>

      </Feed>}
    </React.Fragment>
  )
}

export default FriendFeedUI
