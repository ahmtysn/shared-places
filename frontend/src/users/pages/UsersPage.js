import React, { useState, useEffect, Fragment } from "react";
import useHttpRequest from "./../../shared/hooks/http-hook";

import UsersList from "./../components/UsersList";
import LoadingSpinner from "./../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "./../../shared/components/UIElements/Modal/ErrorModal";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const { isLoading, error, clearError, sendRequest } = useHttpRequest();

  const fetchUsers = async () => {
    const url = "/api/users";
    try {
      const responseData = await sendRequest(url);

      setUsers(responseData);
    } catch (err) {
      console.log("Error in fetching users!", err);
    }
  };

  // Fetch users before page loads, with empty [] only runs once
  useEffect(() => {
    fetchUsers();
  }, [sendRequest]);

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <UsersList users={users} />
    </Fragment>
  );
};

export default UsersPage;
