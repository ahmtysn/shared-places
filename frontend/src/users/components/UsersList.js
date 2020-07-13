import React from "react";

import UserItem from "./UserItem";
import Card from "./../../shared/components/UIElements/Card";
import "./UsersList.css";

const UsersList = ({ users }) => {
  if (users && users.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found!</h2>
        </Card>
      </div>
    );
  }
  return (
    <ul className="users-list">
      {users && users.map(user => <UserItem key={user.id} user={user} />)}
    </ul>
  );
};

export default UsersList;
