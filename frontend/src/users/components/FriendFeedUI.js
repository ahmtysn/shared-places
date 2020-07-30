import React, { useState, useEffect } from 'react'
import { Feed, Icon, Image } from 'semantic-ui-react'
import useHttpRequest from "./../../shared/hooks/http-hook";
import useAuth from "../../shared/hooks/auth-hook";
import { Link } from 'react-router-dom';
import LoadingSpinner from "./../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "./../../shared/components/UIElements/Modal/ErrorModal";



const FriendFeedUI = ({ news }) => {
  let today = new Date();
  let splittingDate = news.date.split('-');
  let splittingTime = news.time.split(':');
  let year = today.getFullYear() - splittingDate[0]
  let month = today.getMonth() + 1 - splittingDate[1]
  let day = today.getDate() - splittingDate[2]
  let hours = Math.abs(today.getHours() - splittingTime[0])
  let minutes = Math.abs(today.getMinutes() - splittingTime[1])
  const { userId } = useAuth();
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
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {u1 && u2 && <Feed>
        <Feed.Event>
          <Feed.Label >
            <Image src={`http://localhost:5000/${u1.image}`} />
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
                  <Feed.Date>
                { year === 0 && month === 0 && day === 0 && hours === 0 && minutes === 0 ? `Few seconds Ago`
                :
                year === 0 && month === 0 && day === 0 && hours === 0 && minutes < 1 ? `${minutes} minute Ago`
                  :
                  year === 0 && month === 0 && day === 0 && hours === 0 ? `${minutes} minutes Ago`
                    :
                    hours === 1 && day === 0 ? `${hours} Hour Ago`
                      :
                      hours < 24 && day === 0 ? `${hours} Hours Ago`
                        :
                        month === 0 && day === 1 ? `${day} day Ago`
                          :
                          month === 0 && day > 1 ? `${day} days Ago`
                            :
                            month < 12 ? `${month} Months Ago`
                              :
                              'Over than Year ago'


                }
              </Feed.Date>
            </Feed.Summary>
          </Feed.Content>
          <Feed.Meta>
            <Feed.Like>
              <Icon name='like' color="red" />8 Likes
          </Feed.Like>
          </Feed.Meta>
        </Feed.Event>

      </Feed>}
    </React.Fragment>
  )
}

export default FriendFeedUI
