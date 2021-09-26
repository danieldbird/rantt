import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router';
import { AuthContext } from '../Context/AuthContext';

function PrivateRoute({ component: RouteComponent, ...rest }) {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        return user ? <RouteComponent {...props} /> : <Redirect to={'/login'} />;
      }}
    />
  );
}

export default PrivateRoute;
