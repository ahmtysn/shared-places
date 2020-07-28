import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// Global
import MainNavigation from "./shared/components/Navigation/MainNavigation";

import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

// Pages
/* eslint-disable import/first */
const UsersPage = React.lazy(() => import("./users/pages/UsersPage"));
const AuthPage = React.lazy(() => import("./users/pages/AuthPage"));
const NewPlace = React.lazy(() => import("./places/pages/NewPlace"));
const EditPlace = React.lazy(() => import("./places/pages/EditPlace"));
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
const UserFriends = React.lazy(() => import("./friends/pages/UserFriends.js"));
const AllPlaces = React.lazy(() => import("./places/pages/AllPlaces"));

// Context
import AuthContext from "./shared/context/auth-context";

// Hook
import useAuth from "./shared/hooks/auth-hook";

function App() {
  const { token, userId, login, logout } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route exact path="/" component={UsersPage} />
        <Route exact path="/:userId/places" component={UserPlaces} />
        <Route exact path="/:userId/friends" component={UserFriends} />
        <Route exact path="/places/new" component={NewPlace} />
        <Route exact path="/places/:placeId" component={EditPlace} />
        <Route exact path="/place/all" component={AllPlaces} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/" component={UsersPage} />
        <Route exact path="/:userId/places" component={UserPlaces} />
        <Route exact path="/auth" component={AuthPage} />
        <Route exact path="/place/all" component={AllPlaces} />
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, userId, login, logout }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Suspense fallback={LoadingSpinner}>{routes}</Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
