import React, { Fragment, useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

// Context
import AuthContext from './../../shared/context/auth-context';

import ErrorModal from './../../shared/components/UIElements/Modal/ErrorModal';
import LoadingSpinner from './../../shared/components/UIElements/LoadingSpinner';

// Custom hooks
import useHttpRequest from './../../shared/hooks/http-hook';

import PlaceList from '../components/PlaceList';

// material ui
import SearchBar from "../../shared/components/FormElements/SearchBar";

const UserPlaces = () => {
  const { userId } = useParams();
  const { token } = useContext(AuthContext);
  const [userPlaces, setUserPlaces] = useState([]); // const userPlaces = [] // userPlaces = arry of places 
  const [searchValue, setSearchValue] = useState("");
  const [places, setPlaces] = useState();
  const { isLoading, error, clearError, sendRequest } = useHttpRequest();

  useEffect(() => {
    const fetchPlaces = async () => {
      // send http request
      try {
        const url = `/api/places/user/${userId}`; // http req
        const request = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        // get the respone 
        const response = await sendRequest(
          url,
          request.method,
          null,
          request.headers
        );
        setUserPlaces(response.places);
      } catch (err) {
        console.log('Could not get all user places!', err);
      }
    };
    fetchPlaces();
  }, [sendRequest, token, userId]);

  const onDeletePlace = (deletedPlaceId) => {
    // After deleted place update state again to show all current places
    setUserPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    );
  };

  const searchPlaces = async (searchValue) => {
    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}/?search=${searchValue}`
      );
      setPlaces(data.places);
    } catch (error) {}
  };

  const onSubmitSearchHandler = (e) => {
    e.preventDefault();
    searchPlaces(searchValue);
  };
  const inputSearchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <SearchBar
        inputSearchHandler={inputSearchHandler}
        onSubmitSearchHandler={onSubmitSearchHandler}
        searchValue={searchValue}
        placeholder="Search places"
      />
        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && places ? (
          <PlaceList items={places} onDeletePlace={onDeletePlace} />
        ) : userPlaces ? (
          <PlaceList items={userPlaces} onDeletePlace={onDeletePlace} />
        ) : (
          ""
        )}
      </Fragment>
  );
};

export default UserPlaces;
