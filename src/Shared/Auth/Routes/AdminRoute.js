import React, { useContext, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import firebase from '../Database/Firebase';
import NotFound from '../../NotFound/NotFound';

function PrivateRoute({ component: RouteComponent, ...rest }) {
  const { user } = useContext(AuthContext);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const isAdmin = async () => {
      if (user) {
        return await firebase
          .auth()
          .currentUser.getIdTokenResult()
          .then((tokenResult) => {
            return tokenResult.claims.role === 'admin';
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    isAdmin().then((result) => {
      setIsAllowed(result);
    });
    return isAdmin();
  }, [user]);

  return isAllowed ? (
    <Route
      {...rest}
      render={(props) => {
        return user ? <RouteComponent {...props} /> : <Redirect to={'/login'} />;
      }}
    />
  ) : (
    <NotFound />
  );
}

export default PrivateRoute;
