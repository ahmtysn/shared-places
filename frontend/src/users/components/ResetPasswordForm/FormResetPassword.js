import React from "react";
import "./FormPassword.css";

import Input from "../../../shared/components/FormElements/Input";
import ButtonResetPassword from "./ButtonResetPassword";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../shared/utils/validators";

const FormPassword = ({ formState, inputHandler, formHandler }) => {
  return (
    <form className="reset_password_form" onSubmit={formHandler}>
      <Input
        id="resetLink"
        element="input"
        type="password"
        placeholder="please enter your password."
        label="PASSWORD"
        // value={formState.inputs.resetLink.value}
        errorText="your password must be at least 6 character!"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
        onInputChange={inputHandler}
      />

      <Input
        id="newPassword"
        element="input"
        type="password"
        placeholder="Please retype your password."
        label="RETYPE PASSWORD"
        // value={formState.inputs.newPassword.value}
        errorText="your password is not the same!"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
        onInputChange={inputHandler}
      />
      <ButtonResetPassword className="reset_password_btn" type="submit">
        SUBMIT
      </ButtonResetPassword>
    </form>
  );
};

export default FormPassword;
