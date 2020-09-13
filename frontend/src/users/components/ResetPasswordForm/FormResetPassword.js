import React from 'react';
import './FormPassword.css';

import Input from '../../../shared/components/FormElements/Input';
import Button from '../../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../../shared/utils/validators';

const FormPassword = ({ formState, inputHandler, formHandler, same }) => {
  return (
    <form className='reset_password_form' onSubmit={formHandler}>
      <Input
        id='newPassword'
        element='input'
        type='password'
        placeholder='password..'
        label='PASSWORD'
        // value={formState.inputs.resetLink.value}
        errorText='The password must be at least 6 character!'
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
        onInputChange={inputHandler}
      />

      <Input
        id='retypePassword'
        element='input'
        type='password'
        placeholder='retype the password..'
        label='RETYPE PASSWORD'
        // value={formState.inputs.newPassword.value}
        errorText='The is not the same password!'
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
        onInputChange={inputHandler}
      />
      {!same && formState.isValid === true && (
        <div className='form-control--invalid'>
          <p>Please use the same password!</p>
        </div>
      )}
      <Button type='submit'>Reset Password</Button>
    </form>
  );
};

export default FormPassword;
