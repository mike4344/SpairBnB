// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./component/Navigation";
import SpotsDisplayPage from "./component/SpotsDisplayPage"
import SpotsSearchDisplayPage from "./component/SpotSearchDisplayPage"
import Splash from "./component/SplashPage"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Splash />
          </Route>
          <Route exact path="/spots/search">
            <SpotsSearchDisplayPage />
          </Route>
          <Route path="/spots/:spotId">
            <SpotsDisplayPage />
          </Route>
        </Switch>

      )}
    </>
  );
}

export default App;
