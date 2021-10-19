/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from '../components/header';
import Main from '../components/main';
import Newsletter from '../components/newsletter';
import Footer from '../components/footer';

document.title = window.env.APP_NAME;

const App = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/backend')
      .then(res => res.json())
      .then(res => setUsers(res))
  })

    return (
      <div className="App">
        <Header />
        <Main />
        {users.map(user => <li key={user.id}>{user.username}</li>)}
        <Newsletter />
        <Footer />
      </div>
    );
};

export default App;