import React from 'react';

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
} from './../../shared/utils/validators';

import Input from './../../shared/components/FormElements/Input';
import Button from './../../shared/components/FormElements/Button';
import ImageUpload from './../../shared/components/FormElements/ImageUpload';

import './AuthForm.css';

const AuthForm = ({
  isLoginMode,
  formState,
  inputHandler,
  authSubmitHandler,
}) => {
  return (
    <form onSubmit={authSubmitHandler}>
      {!isLoginMode && (
        <Input
          element="input"
          id="name"
          type="text"
          placeholder="Your Name"
          label="Your Name"
          errorText="Your name is required!"
          validators={[VALIDATOR_REQUIRE()]}
          onInputChange={inputHandler}
        />
      )}

      <Input
        id="email"
        element="input"
        type="email"
        placeholder="Your Email"
        label="Email"
        errorText="Please enter a valid email!"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
        onInputChange={inputHandler}
      />
      <Input
        id="password"
        element="input"
        type="password"
        placeholder="Your Password"
        label="Password"
        errorText="Please enter a valid password, at least 5 characters!"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        onInputChange={inputHandler}
      />
      {!isLoginMode && (
        <ImageUpload id="image" centered="true" onInputChange={inputHandler} />
      )}
      <Button type="submit" disabled={!formState.isValid}>
        {isLoginMode ? 'Login' : 'Signup'}
      </Button>
    </form>
  );
};

export default AuthForm;
