import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

const PrivateRoute = (props) => {
  //({ Component, ...rest })
  const auth = useSelector((state) => state.firebase.auth);
  const Component = props.component;
  const isAuthenticated = isLoaded(auth) && !isEmpty(auth);

  return isAuthenticated ? (
    <Component {...props} />
  ) : (
    <Redirect to={{ pathname: '/auth' }} />
  );

  //console.log('Private', { ...rest });
  //console.log('Auth:', isAuthenticated);

  // return (
  //   <Route
  //     {...rest}
  //     render={() =>
  //       isAuthenticated ? (
  //         <Component {...rest} />
  //       ) : (
  //         <Redirect to={{ pathname: '/auth' }} />
  //       )
  //     }
  //   />
  // );
};

export default PrivateRoute;
