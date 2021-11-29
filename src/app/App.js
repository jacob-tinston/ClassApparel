/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Header from '../components/header';
import Home from '../components/home';
import Login from '../components/login';
import Register from '../components/register';
import Cart from '../components/cart';
import Checkout from '../components/checkout';
import Newsletter from '../components/newsletter';
import Footer from '../components/footer';

document.title = window.env.APP_NAME;

const App = () => {

    return (
      <div className="App">
        <Router>
          <Header />

          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/register">
              <Register />
            </Route>

            <Route path="/cart">
              <Cart />
            </Route>

            <Route path="/checkout">
              <Checkout />
            </Route>
          </Switch>

          <Newsletter />
          <Footer />
        </Router>
      </div>
    );
};

export default App;