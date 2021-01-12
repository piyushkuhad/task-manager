import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './App.scss';
import history from './history';
import PrivateRoute from './components/private-route/PrivateRoute.component';
import SignIn from './components/signin/SignIn.component';
import HomePage from './pages/home/Home.page';
import AnimationComp from './components/animation-comp/AnimationComp.component';
import animationData from './assets/animation/loader.json';
import NotificationAlert from './components/notificationAlert/NotificationAlert.component';
import MyAccount from './pages/my-account/MyAccount.component';

const App = () => {
  const auth = useSelector((state) => state.firebase.auth);
  const darkMode = useSelector((state) => state.todos.appScheme.darkMode);
  const paletteType = darkMode ? 'dark' : 'light';
  const mainPrimaryColor = darkMode ? '#ffffff' : '#69665c';
  const isAuthenticated = isLoaded(auth) && !isEmpty(auth);

  const [open, setOpen] = React.useState(false);
  const notificationInfo = useSelector((state) => state.todos.appNotification);

  const theme = createMuiTheme({
    palette: {
      type: paletteType,
      primary: {
        //main: '#69665c',
        main: mainPrimaryColor,
      },
    },
    typography: {
      fontFamily: ['Open Sans', 'sans-serif'].join(','),
    },
  });

  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  React.useEffect(() => {
    if (!!notificationInfo.message) setOpen(true);
  }, [notificationInfo]);

  const snackBarCloseHandler = () => {
    setOpen(false);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <NotificationAlert
          notificationInfo={notificationInfo}
          open={open}
          snackBarCloseHandler={snackBarCloseHandler}
        />
        {isLoaded(auth) ? (
          <>
            <Router history={history}>
              <Switch>
                <PrivateRoute exact path="/" component={HomePage} />
                <PrivateRoute path="/my-account" component={MyAccount} />
                <Route
                  path="/auth"
                  render={() =>
                    isAuthenticated ? <Redirect to="/" /> : <SignIn />
                  }
                />
                <Redirect from="/my-account" to="/my-account/user-info" />
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
    </MuiThemeProvider>
  );
};

export default App;
