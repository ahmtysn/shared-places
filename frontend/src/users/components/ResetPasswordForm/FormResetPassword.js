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
        placeholder='Enter new password'
        label='New password'
        // value={formState.inputs.resetLink.value}
        errorText='The password must be at least 6 character!'
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
        onInputChange={inputHandler}
      />

      <Input
        id='retypePassword'
        element='input'
        type='password'
        placeholder='Retype new password..'
        label='Confirm new password'
        // value={formState.inputs.newPassword.value}
        errorText='The is not the same password!'
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
        onInputChange={inputHandler}
      />
      {!same && formState.isValid === true && (
        <div className='form-control--invalid'>
          <p>Password dosn't match, Please retype again !!</p>
        </div>
      )}
      <div className='actions-btn'>
        <Button type='submit'>Reset Password</Button>
      </div>
    </form>
  );
};

export default FormPassword;
