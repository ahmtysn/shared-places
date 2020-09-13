import React, { useState, useEffect, useContext, Fragment } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import AuthContext from './../../shared/context/auth-context';

import Card from './../../shared/components/UIElements/Card';
import LoadingSpinner from './../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from './../../shared/components/UIElements/Modal/ErrorModal';
import PlaceForm from './../components/PlaceForm';

import useForm from './../../shared/hooks/form-hook';
import useHttpRequest from '../../shared/hooks/http-hook';

const EditPlace = () => {
  let x = 0;
  let y = document.height;
  window.scroll(x, y);
  const { userId, token } = useContext(AuthContext);
  const { placeId } = useParams();
  const { push } = useHistory();

  const { isLoading, error, clearError, sendRequest } = useHttpRequest();
  const [loadedPlace, setLoadedPlace] = useState({});

  const initInputs = {
    title: {
      value: '',
      isValid: true,
    },
    address: {
      value: '',
      isValid: true,
    },
    description: {
      value: '',
      isValid: true,
    },
    image: {
      value: null,
      isValid: true,
    },
  };
  const [formState, inputHandler, setFormData] = useForm(initInputs, false);

  useEffect(() => {
    const getPlace = async () => {
      const url = `/api/places/${placeId}`;

      const request = {
        url,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const identifiedPlace = await sendRequest(
          request.url,
          request.method,
          null,
          request.headers
        );

        setLoadedPlace(identifiedPlace);
        setFormData(
          {
            title: {
              value: identifiedPlace.title,
              isValid: true,
            },
            address: {
              value: identifiedPlace.address,
              isValid: true,
            },
            description: {
              value: identifiedPlace.description,
              isValid: true,
            },
            image: {
              value: identifiedPlace.image,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {
        console.log('Could fetch place!', err);
      }
    };
    getPlace();
  }, [sendRequest, placeId, setFormData, token]);

  const editPlaceSubmitHandler = async (e) => {
    e.preventDefault();

    const {
      inputs: { title, address, description, image },
    } = formState;

    const url = `/api/places/${placeId}`;

    // Create FormData instance to send binary data
    const formData = new FormData();
    formData.append('title', title.value);
    formData.append('address', address.value);
    formData.append('description', description.value);
    formData.append('image', image.value);

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const request = {
      method: 'PATCH',
      body: formData,
      headers,
    };

    try {
      await sendRequest(url, request.method, request.body, request.headers);

      push(`/places/${placeId}/details`);
    } catch (err) {
      console.log('Could not edit place!', err);
    }
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedPlace && (
        <PlaceForm
          formState={formState}
          inputHandler={inputHandler}
          formHandler={editPlaceSubmitHandler}
          loadedPlace={loadedPlace}
          isAdd={false}
        />
      )}
    </Fragment>
  );
};

export default EditPlace;
