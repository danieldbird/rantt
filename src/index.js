import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './index.scss';
import { AuthProvider } from './components/Context/AuthContext';
import Layout from './components/Layout/Layout';
import Home from './components/Pages/Home/Home';
import Admin from './components/Pages/Admin/Admin';
import NotFound from './components/Pages/NotFound/NotFound';
import Login from './components/Auth/Login/Login';
import PrivateRoute from './components/Auth/PrivateRoute';

ReactDOM.render(
  <AuthProvider>
    <React.StrictMode>
      <Layout>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/admin" component={Admin} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </Layout>
    </React.StrictMode>
  </AuthProvider>,
  document.getElementById('root')
);
