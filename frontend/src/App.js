import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage"
import HostFormPage from "./components/HostFormPage";
import SpotsPage from "./components/SpotsPage";
import EditSpotFormPage from "./components/EditSpotFormPage";
import Footer from "./components/Footer";
import { getSpots } from "./store/spots";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(getSpots())
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
            <SpotsPage mySpots={false}/>
          </Route>
          <Route exact path="/users/:userId/spots">
            <SpotsPage mySpots={true} />
          </Route>
          <Route path="/spots/:spotId/edit">
            <EditSpotFormPage />
          </Route>
        </Switch>
      <Footer />
    </>
  );
}

export default App;
