import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Link } from "react-router-dom";

import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage"
import HostFormPage from "./components/HostFormPage";
import SpotsPage from "./components/SpotsPage";
import EditSpotFormPage from "./components/EditSpotFormPage";
import Footer from "./components/Footer";
import BookingsPage from "./components/BookingsPage";

import * as sessionActions from "./store/session";
import { getSpots } from "./store/spots";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(async () => {
    await Promise.all([
      dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true)),
      dispatch(getSpots()),
    ])
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
        <Switch>
          <Route exact path="/">
            <SplashPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/host">
            <HostFormPage />
          </Route>
          <Route exact path="/spots">
            <SpotsPage allSpots={true}/>
          </Route>
          <Route exact path="/users/:userId/spots">
            <SpotsPage allSpots={false} />
          </Route>
          <Route path="/spots/:spotId/edit">
            <EditSpotFormPage />
          </Route>
          <Route path="/bookings">
            <BookingsPage />
          </Route>
          <Route>
            <h1 className="bad-url-catch-header">There's nothing here! <Link className="bad-url-home-link" to="/">Return to safety.</Link></h1>
          </Route>
        </Switch>
      <Footer />
    </>
  );
}

export default App;
