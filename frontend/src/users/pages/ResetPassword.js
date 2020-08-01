import React, { useContext, Fragment } from 'react';

import LoadingSpinner from './../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from './../../shared/components/UIElements/Modal/ErrorModal';
import FormPassword from '../components/ResetPasswordForm/FormResetPassword';
import AuthContext from './../../shared/context/auth-context';

import useForm from './../../shared/hooks/form-hook';
import useHttpRequest from '../../shared/hooks/http-hook';

const ResetPassword = ({ match }) => {
  const { login } = useContext(AuthContext);

  const { isLoading, error, clearError, sendRequest } = useHttpRequest();

  const initInputs = {
    newPassword: {
      value: '',
      isValid: true,
    },
  };
  const [formState, inputHandler] = useForm(initInputs, false);

  const resetHandler = async (e) => {
    e.preventDefault();

    const { newPassword } = formState.inputs;
    const url = `/api/users/reset-password`;

    const body = {
      resetLink: match.params.resetLink,
      newPassword: newPassword.value,
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    const request = {
      method: 'PUT',
      body: JSON.stringify(body),
      headers,
    };

    try {
      const responseData = await sendRequest(
        url,
        request.method,
        request.body,
        request.headers,
      );
      login(responseData.userId, responseData.token);
    } catch (err) {
      console.log(err);
    }
  };

  console.log('formState', formState);
  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}

      <FormPassword
        formState={formState}
        inputHandler={inputHandler}
        formHandler={resetHandler}
      />
    </Fragment>
  );
};

export default ResetPassword;
