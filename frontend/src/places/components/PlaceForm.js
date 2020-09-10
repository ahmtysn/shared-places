import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from './../../shared/components/FormElements/Input';
import ImageUpload from './../../shared/components/FormElements/ImageUpload';
import Button from './../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from './../../shared/utils/validators';

import './PlaceForm.css';

const PlaceForm = ({
  isAdd,
  formState,
  inputHandler,
  formHandler,
  loadedPlace,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setIsEditMode(true);
  }, [loadedPlace]);

  return (
    <React.Fragment>
      {isEditMode && (
        <form className='place-form' onSubmit={formHandler}>
          <ImageUpload
            id='image'
            centered={true}
            onInputChange={inputHandler}
            initialImageUrl={!isAdd && loadedPlace.image}
          />

          <Input
            id='title'
            element='input'
            type='text'
            label='Title'
            initValue={!isAdd && loadedPlace.title}
            initIsValid={!isAdd && true}
            errorText='Please enter a valid title!'
            validators={[VALIDATOR_REQUIRE()]}
            onInputChange={inputHandler}
          />

          <Input
            id='address'
            element='input'
            type='text'
            label='Address'
            initValue={!isAdd && loadedPlace.address}
            initIsValid={!isAdd && true}
            errorText='Please enter a valid address!'
            validators={[VALIDATOR_REQUIRE()]}
            onInputChange={inputHandler}
          />

          <Input
            id='description'
            element='textarea'
            label='Description'
            initValue={!isAdd && loadedPlace.description}
            initIsValid={!isAdd && true}
            errorText='Please enter a valid description (at least 5 characters)!'
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
            onInputChange={inputHandler}
          />

          <Button type='submit' disabled={!formState.isValid}>
            {isAdd ? 'Add' : 'Edit'} Place
          </Button>
          <Button type='button' onClick={() => history.goBack()} danger>
            Cancel
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default PlaceForm;
