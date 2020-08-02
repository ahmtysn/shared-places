import React, { useState, useContext } from 'react';

import './BucketListItem.css';
import AuthContext from './../../shared/context/auth-context';
import Modal from '../../shared/components/UIElements/Modal/Modal';
import ErrorModal from '../../shared/components/UIElements/Modal/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import useHttpClient from '../../shared/hooks/http-hook';

const BucketListItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { token } = useContext(AuthContext);

  const openDetailsHandler = () => setShowDetails(true);
  const cloesDetailsHandler = () => setShowDetails(false);

  const deleteBucketItemHandler = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/bucketlist/${props.placeId.id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + token,
        }
      );
      props.deleteOnClick(props.placeId.id);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showDetails}
        onCancel={cloesDetailsHandler}
        header={`Details of ${props.title}`}
        footerClass="bucketList-item__modal-actions"
        footer={
          <React.Fragment>
            <Button onClick={cloesDetailsHandler} inverse>
              CANCEL
            </Button>
          </React.Fragment>
        }
      >
        {isLoading && <LoadingSpinner asOverlay />}
        <Card className="bucketList-item__content">
          <div className="bucketList-item__image">
            <img
              src={`http://localhost:5000/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className="bucketList-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <h3>{props.description}</h3>
          </div>
        </Card>
      </Modal>
      <li className="bucketList-item">
        <Card className="bucketList-item__content">
          <div className="bucketList-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
          </div>
          <div className="bucketList-item__actions">
            <Button onClick={openDetailsHandler} inverse>
              DETAILS
            </Button>
            <Button onClick={deleteBucketItemHandler} danger>
              DELETE
            </Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default BucketListItem;
