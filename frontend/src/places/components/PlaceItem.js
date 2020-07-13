import React, { useState, useContext, Fragment } from 'react';

import AuthContext from './../../shared/context/auth-context';

import Card from './../../shared/components/UIElements/Card';
import LoadingSpinner from './../../shared/components/UIElements/LoadingSpinner';
import Button from './../../shared/components/FormElements/Button';
import Modal from './../../shared/components/UIElements/Modal/Modal';
import ErrorModal from './../../shared/components/UIElements/Modal/ErrorModal';
import Map from './../../shared/components/UIElements/Map';

import useHttpRequest from './../../shared/hooks/http-hook';

import './PlaceItem.css';

const PlaceItem = ({
  image,
  title,
  description,
  address,
  placeId,
  coordinates,
  onDeletePlace,
  creatorId,
}) => {
  const { isLoggedIn, userId, token } = useContext(AuthContext);
  const { isLoading, error, clearError, sendRequest } = useHttpRequest();

  const [showMap, setShowMap] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);
  const openDeleteHandler = () => setShowDelete(true);
  const closeDeleteHandler = () => setShowDelete(false);
  const deletePlaceHandler = async (placeId) => {
    const url = `/api/places/${placeId}`;

    const body = {};
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const request = {
      method: 'DELETE',
      body,
      headers,
    };

    try {
      await sendRequest(url, request.method, request.body, request.headers);
    } catch (err) {
      console.log('Error while deleting place!', err);
    }

    setShowDelete(false);
    onDeletePlace(placeId);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showDelete}
        onCancel={closeDeleteHandler}
        header={'Are you sure?'}
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button onClick={closeDeleteHandler} inverse>
              CANCEL
            </Button>
            <Button onClick={() => deletePlaceHandler(placeId)} danger>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you really want to delete this place? This action is IRREVERSIBLE!
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img src={`http://localhost:5000/${image}`} alt={title} />
          </div>
          <div className="place-item__info">
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className="place-item__actions">
            <Button onClick={openMapHandler} inverse>
              VIEW ON MAP
            </Button>
            {isLoggedIn && (
              <Fragment>
                {creatorId === userId && (
                  <Button to={`/places/${placeId}`}>EDIT</Button>
                )}
                {creatorId === userId && (
                  <Button onClick={openDeleteHandler} danger>
                    DELETE
                  </Button>
                )}
              </Fragment>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
