// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
import SignupFormPage from "./component/SignUpFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./component/Navigation";
import SpotsCreationFormPage from "./component/SpotsCreationFormPage"

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
          <Route path="/spots">
            <SpotsCreationFormPage />
          </Route>
        </Switch>

      )}
    </>
  );
}

export default App;
