import React, { useState, useEffect, useContext, Fragment } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import AuthContext from './../../shared/context/auth-context';
import './AccountSettings.css';

import Card from '../../shared/components/UIElements/Card';
import Avatar from '../../shared/components/UIElements/Avatar';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import useForm from './../../shared/hooks/form-hook';
import useHttpRequest from '../../shared/hooks/http-hook';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH
} from '../../shared/utils/validators';


export default function AccountSettings() {
    const { token } = useContext(AuthContext);
    const { userId } = useParams();
    const { push } = useHistory();
    const { isLoading, error, clearError, sendRequest } = useHttpRequest();
    const [loadedData, setLoadedData] = useState({});
    const [formState, inputHandler] = useForm(
      {
          name: {
              value: '',
              isValid: false,
          },
          email: {
              value: '',
              isValid: false,
          },
          image: {
              value: '',
              isValid: false,
          },
          password: {
              value: '',
              isValid: false,
          }
      },
      false
  );

    return (
        <React.Fragment>
            {isLoading && <LoadingSpinner />}
            {!isLoading && loadedData && (
                <Card className="profile-card">
                    <h2>Profile</h2>
                    <hr />
                    <form className="profile">
                    <Avatar id="image-box"/>
                            <ImageUpload
                                center
                                id="image"
                            />
                            <Button>
                                Change Profile Photo
                            </Button>
                        <Input
                            element="input"
                            id="name"
                            type="text"
                            label="Name"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter your new name."
                            initialValue={loadedData.name}
                            onInputChange={inputHandler}
                        />
                        <Input
                            element="input"
                            id="password"
                            type="password"
                            label="Password"
                            validators={[VALIDATOR_MINLENGTH(6)]}
                            errorText="Please enter a valid password, at least 6 characters."
                            initialValue={loadedData.password}
                            onInputChange={inputHandler}

                        />
                        <Input
                            element="input"
                            id="email"
                            type="email"
                            label="E-Mail"
                            validators={[VALIDATOR_EMAIL()]}
                            errorText="Please enter a valid email address."
                            initialValue={loadedData.email}
                            onInputChange={inputHandler}
                        />
                        <Button
                            type="submit"
                        >
                            SAVE
                        </Button>
                        <Button>
                            CANCEL
                        </Button>
                    </form>
                    <Button >
                        DELETE ACCOUNT
                    </Button>
                </Card>)}
    </React.Fragment>
        );
}