import React from 'react';
import './FormPassword.css';
import Input from '../../../shared/components/FormElements/Input';
import Button from '../../../shared/components/FormElements/Button';

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
} from '../../../shared/utils/validators';

const FormPassword = ({
  formState,
  inputHandler,
  formHandler,
  isSended = false,
}) => {
  return (
    <form className='reset_password_form' onSubmit={formHandler}>
      <Input
        id='email'
        element='input'
        type='email'
        label='Email'
        // value={formState.inputs.email.value}
        errorText='Please enter a valid email!'
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
        onInputChange={inputHandler}
      />
      <div className='actions-btn'>
        <Button type='submit'>Submit</Button>
        <Button type='button' to={'/aut'} danger>
          Cancel
        </Button>
      </div>
      {isSended && formState.inputs.email.value && (
        <div className='email-sended'>
          Email has been sent to : <span>{formState.inputs.email.value}</span> ,
          Please follow the instructions
        </div>
      )}
    </form>
  );
};

export default FormPassword;
