import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

const PrivateRoute = (props) => {
  // const auth = useSelector((state) => state.firebase.auth);

  // return (
  //   <Route
  //     {...remainingProps}
  //     render={({ location }) =>
  //       isLoaded(auth) && !isEmpty(auth) ? (
  //         children
  //       ) : (
  //         <Redirect to={{ pathname: '/', state: { from: location } }} />
  //       )
  //     }
  //   />
  // );

  const auth = useSelector((state) => state.firebase.auth);
  const Component = props.component;
  const isAuthenticated = isLoaded(auth) && !isEmpty(auth);

  return isAuthenticated ? (
    <Component {...props} />
  ) : (
    <Redirect to={{ pathname: '/auth' }} />
  );
};

export default PrivateRoute;
