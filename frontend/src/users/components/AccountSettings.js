import React, { useState, useContext, useEffect, Fragment } from "react";

import AuthContext from "../../shared/context/auth-context";
import useForm from "./../../shared/hooks/form-hook";

import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal/Modal";
import ErrorModal from "../../shared/components/UIElements/Modal/ErrorModal";
import ImageUpload from "./../../shared/components/FormElements/ImageUpload";
import Input from "./../../shared/components/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
} from "./../../shared/utils/validators";

import useHttpRequest from "../../shared/hooks/http-hook";

import "./../components/AccountSettings.css";

const AccountSettings = ({ settings, onDeleteAccount }) => {
  const { isLoggedIn, userId, token, logout } = useContext(AuthContext);
  const { isLoading, error, clearError, sendRequest } = useHttpRequest();

  const [showDelete, setShowDelete] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [confirmEdit, setConfirmEdit] = useState(false);

  const openDeleteHandler = () => setShowDelete(true);
  const closeDeleteHandler = () => setShowDelete(false);

  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  // handling delete account
  const deleteAccountHandler = async (userId) => {
    const url = `/api/users/account/${userId}`;

    const body = {};
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const request = {
      method: "DELETE",
      body,
      headers,
    };

    try {
      await sendRequest(url, request.method, request.body, request.headers);
    } catch (err) {
      console.log("Error while deleting account!", err);
    }

    setShowDelete(false);
    setConfirmDelete(true);
  };

  // Enable edit mode
  const editSwitchHandler = () => {
    setIsEditMode((prevState) => !prevState);
  };

  // Submitb eidted settings
  const editSubmitHandler = async (e) => {
    e.preventDefault();

    const { name, email, password, image } = formState.inputs;

    const url = `/api/users/account/${userId}`;

    // Create FormData instance to send binary data
    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("email", email.value);
    formData.append("password", password.value);
    formData.append("image", image.value);

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const request = {
      method: "PATCH",
      body: formData,
      headers,
    };

    try {
      await sendRequest(url, request.method, request.body, request.headers);
    } catch (err) {
      console.log("Could not edit account!", err);
    }

    setConfirmEdit(true);
  };

  // toggle Password Handler
  const togglePasswordHandler = () => {
    const password = document.querySelector("#password");
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    // toggle the eye slash icon
    const togglePassword = document.querySelector("#togglePassword");
    togglePassword.classList.toggle("fa-eye-slash");
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showDelete}
        onCancel={closeDeleteHandler}
        header={"Are you sure?"}
        footerClass="profile__modal-actions"
        footer={
          <React.Fragment>
            <Button onClick={closeDeleteHandler} inverse>
              CANCEL
            </Button>
            <Button onClick={() => deleteAccountHandler(userId)} danger>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you really want to delete this account? This action is
          IRREVERSIBLE!
        </p>
      </Modal>
      <Modal
        show={confirmDelete}
        header={"Delete account confirmation!"}
        footerClass="profile__modal-actions"
        footer={
          <React.Fragment>
            <Button onClick={() => onDeleteAccount()}>OK</Button>
          </React.Fragment>
        }
      >
        <p>Your account has been deleted successfully.</p>
      </Modal>
      <Modal
        show={confirmEdit}
        header={"Account edited!"}
        footerClass="profile__modal-actions"
        footer={
          <React.Fragment>
            <Button onClick={() => logout()} danger>
              Logout
            </Button>
          </React.Fragment>
        }
      >
        <p>You need to login again for changes to take effect</p>
      </Modal>
      {!isEditMode && (
        <Card className="profile-card">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="profile__image">
            <img
              src={`http://localhost:5000/${settings.image}`}
              alt={settings.name}
            />
          </div>
          <div className="profile__info">
            <div>
              <h2>Name</h2>
              <input type="text" value={settings.name} disabled />
            </div>
            <div>
              <h2>Email</h2>
              <input type="text" value={settings.email} disabled />
            </div>
            <div>
              <h2>Password</h2>
              <input
                type="password"
                id="password"
                value={localStorage.getItem("password")}
                disabled
              />
              <i
                class="far fa-eye"
                id="togglePassword"
                onClick={togglePasswordHandler}
              ></i>
            </div>
          </div>
          <div className="profile__actions">
            {isLoggedIn && (
              <Fragment>
                <Button onClick={editSwitchHandler}>EDIT</Button>
                <Button onClick={openDeleteHandler} danger>
                  DELETE
                </Button>
              </Fragment>
            )}
          </div>
        </Card>
      )}
      {isEditMode && (
        <Card className="profile-card">
          {isLoading && <LoadingSpinner asOverlay />}
          <form onSubmit={editSubmitHandler}>
            <ImageUpload
              id="image"
              centered="true"
              onInputChange={inputHandler}
              initialImageUrl={`http://localhost:5000/${settings.image}`}
            />
            <Input
              id="name"
              element="input"
              type="text"
              placeholder="Your Name"
              label="Your Name"
              errorText="Your name is required!"
              validators={[VALIDATOR_REQUIRE()]}
              onInputChange={inputHandler}
              initValue={settings.name}
              initIsValid={true}
            />
            <Input
              id="email"
              element="input"
              type="email"
              placeholder="Your Email"
              label="Email"
              errorText="Please enter a valid email!"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
              onInputChange={inputHandler}
              initValue={settings.email}
              initIsValid={true}
            />
            <div>
              <Input
                id="password"
                element="input"
                type="password"
                placeholder="Your Password"
                label="Password"
                errorText="Please enter a valid password, at least 5 characters!"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
                onInputChange={inputHandler}
                initValue={localStorage.getItem("password")}
                initIsValid={true}
              />
              <i
                class="far fa-eye"
                style={{ float: "right", margin: "-2.3rem 0.3rem 0px 0px" }}
                id="togglePassword"
                onClick={togglePasswordHandler}
              ></i>
            </div>

            <Button onClick={editSwitchHandler}>CANCEL</Button>
            <Button type="submit" danger>
              SAVE
            </Button>
          </form>
        </Card>
      )}
    </React.Fragment>
  );
};

export default AccountSettings;
