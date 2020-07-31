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

// import React, { useState } from "react";
// import FormPassword from "../components/ResetPasswordForm/FormPassword";
// import InputResetPassword from "../components/ResetPasswordForm/InputResetPassword";
// import ButtonResetPassword from "../components/ResetPasswordForm/ButtonResetPassword";

// const ResetPassword = () => {
//   const [passwordOne, setPasswordOne] = useState("");
//   const [passwordTwo, setPasswordTwo] = useState("");
//   const [isvalid, setIsValid] = useState(true);
//   const passwordOneHandler = (e) => {
//     setPasswordOne(e.target.value);
//   };

//   const passwordTwoHandler = (e) => {
//     setPasswordTwo(e.target.value);
//   };

//   const onsubmit = (e) => {
//     if (passwordOne !== passwordTwo) {
//       setIsValid(false);
//       e.preventDefault();
//     }
//   };

//   return (
//     <FormPassword onsubmit={onsubmit}>
//       <InputResetPassword
//         className={
//           isvalid ? "reset_password_input" : "reset_password_input error"
//         }
//         name="password"
//         type="password"
//         placeholder="please enter your password"
//         onchange={passwordOneHandler}
//         autoFocus={true}
//       />
//       <InputResetPassword
//         className={
//           isvalid
//             ? "reset_password_input two"
//             : "reset_password_input two error"
//         }
//         name="password"
//         type="password"
//         placeholder="please Reenter your email"
//         onchange={passwordTwoHandler}
//         autoFocus={true}
//       />
//       {!isvalid && (
//         <div className="passwordError">
//           <p>password is not correct please try again</p>
//         </div>
//       )}

//       <ButtonResetPassword />
//     </FormPassword>
//   );
// };

// export default ResetPassword;
