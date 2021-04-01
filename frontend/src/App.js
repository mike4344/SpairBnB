// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
import SignupFormPage from "./component/SignUpFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./component/Navigation";
import SpotsCreationFormPage from "./component/SpotsCreationFormPage"
import SpotsDisplayPage from "./component/SpotsDisplayPage"
import SpotsSearchDisplayPage from "./component/SpotSearchDisplayPage"

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
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/spots">
            <SpotsCreationFormPage />
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
