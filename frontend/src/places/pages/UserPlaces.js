import React, { Fragment, useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

// Context
import AuthContext from './../../shared/context/auth-context';

import ErrorModal from './../../shared/components/UIElements/Modal/ErrorModal';
import LoadingSpinner from './../../shared/components/UIElements/LoadingSpinner';

// Custom hooks
import useHttpRequest from './../../shared/hooks/http-hook';

import PlaceList from '../components/PlaceList';

const UserPlaces = () => {
  const { userId } = useParams();
  const { token, userId: loggedInUserId } = useContext(AuthContext);
  const [userPlaces, setUserPlaces] = useState([]);
  const [bucketPlaces, setBucketPlaces] = useState([]);

  const { isLoading, error, clearError, sendRequest } = useHttpRequest();

  useEffect(() => {
    const fetchBucketList = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/bucketlist/${loggedInUserId}`,
          'GET',
          null,
          {
            Authorization: 'Bearer ' + token,
          }
        );
        return responseData.bucketListUser;
      } catch (err) {
        console.log('Could not get all user places!', err);
        return [];
      }
    };
    const fetchPlaces = async () => {
      try {
        const url = `/api/places/user/${userId}`;
        const request = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await sendRequest(
          url,
          request.method,
          null,
          request.headers
        );
        return response;
      } catch (err) {
        console.log('Could not get all user places!', err);
        return [];
      }
    };
    const fetchUserData = async () => {
      const bucketList = await fetchBucketList();
      const places = await fetchPlaces();
      console.log({bucketList}) // item.id.id
      console.log({places}) // place.id
      setBucketPlaces(bucketList);
      setUserPlaces(places.map(place => {
        const found = bucketList.find(item => item.id.id === place.id);
        if (found) {
          return {...place, isAddedToBucketList: true}
        } else {
          return place
        }
      }));
    }
    fetchUserData();
  }, [sendRequest, userId, token]);

  const onDeletePlace = (deletedPlaceId) => {
    // After deleted place update state again to show all current places
    setUserPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    );
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && <PlaceList items={userPlaces} onDeletePlace={onDeletePlace} />}
    </Fragment>
  );
};

export default UserPlaces;
