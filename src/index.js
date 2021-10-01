import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './index.scss';
import { AuthProvider } from './Shared/Auth/Context/AuthContext';
import Layout from './Shared/Layout/Layout';
import Admin from './Backend/Admin/Admin';
import NotFound from './Shared/NotFound/NotFound';
import Login from './Shared/Auth/Login/Login';
import AdminRoute from './Shared/Auth/Routes/AdminRoute';
import Home from './Frontend/Home/Home';
import ListProducts from './Backend/Products/ListProducts';
import AddProduct from './Backend/Products/AddProduct';

ReactDOM.render(
  <AuthProvider>
    <React.StrictMode>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <AdminRoute exact path="/admin" component={Admin} />
            <AdminRoute path="/admin/products" component={ListProducts} />
            <AdminRoute path="/admin/product/add" component={AddProduct} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Layout>
      </Router>
    </React.StrictMode>
  </AuthProvider>,
  document.getElementById('root')
);
