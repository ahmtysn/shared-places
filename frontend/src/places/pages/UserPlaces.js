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
  const { token } = useContext(AuthContext);
  const [userPlaces, setUserPlaces] = useState([]);

  const { isLoading, error, clearError, sendRequest } = useHttpRequest();

  useEffect(() => {
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

        setUserPlaces(response);
      } catch (err) {
        console.log('Could not get all user places!', err);
      }
    };
    fetchPlaces();
  }, [sendRequest]);

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
      <PlaceList items={userPlaces} onDeletePlace={onDeletePlace} />
    </Fragment>
  );
};

export default UserPlaces;
