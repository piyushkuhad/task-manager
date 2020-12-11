import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import { isLoaded, isEmpty } from 'react-redux-firebase';

import './App.scss';
import history from './history';
import PrivateRoute from './components/private-route/PrivateRoute.component';
import SignIn from './components/signin/SignIn.component';
import HomePage from './pages/home/Home.page';
import AnimationComp from './components/animation-comp/AnimationComp.component';
import animationData from './assets/animation/loader.json';

const App = () => {
  const auth = useSelector((state) => state.firebase.auth);

  const isAuthenticated = isLoaded(auth) && !isEmpty(auth);

  return (
    <div className="App">
      {isLoaded(auth) ? (
        <>
          <Router history={history}>
            <Switch>
              <PrivateRoute exact path="/" component={HomePage} />
              <Route
                path="/auth"
                render={() =>
                  isAuthenticated ? <Redirect to="/" /> : <SignIn />
                }
              />
            </Switch>
          </Router>
        </>
      ) : (
        <div className="cm-loader-container cm-flex-type-2">
          <AnimationComp
            animationData={animationData}
            text="Loading..."
            width={300}
            height={300}
          />
        </div>
      )}
    </div>
  );
};

export default App;
