import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './index.scss';
import { AuthProvider } from './Shared/Context/AuthContext';
import Layout from './Shared/Layout/Layout';
import Admin from './Backend/Admin/Admin';
import NotFound from './Shared/NotFound/NotFound';
import Login from './Shared/Auth/Login/Login';
import AdminRoute from './Shared/Auth/Routes/AdminRoute';
import Home from './Frontend/Home/Home';
import ListProducts from './Backend/Products/ListProducts';
import AddProduct from './Backend/Products/AddProduct';
import ProductsProvider from './Shared/Context/ProductsContext';
import CartProvider from './Shared/Context/CartContext';
import Cart from './Frontend/Cart/Cart';
import Success from './Frontend/Cart/Success';

ReactDOM.render(
  <AuthProvider>
    <ProductsProvider>
      <CartProvider>
        <React.StrictMode>
          <Router>
            <Layout>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/success" component={Success} />
                <Route path="/login" component={Login} />
                <AdminRoute exact path="/admin" component={Admin} />
                <AdminRoute path="/admin/products" component={ListProducts} />
                <AdminRoute path="/admin/product/add" component={AddProduct} />
                <AdminRoute path="/admin/product/edit/:id" component={AddProduct} />
                <Route path="*" component={NotFound} />
              </Switch>
            </Layout>
          </Router>
        </React.StrictMode>
      </CartProvider>
    </ProductsProvider>
  </AuthProvider>,
  document.getElementById('root')
);
