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
          </Switch>

          <Newsletter />
          <Footer />
        </Router>
      </div>
    );
};

export default App;