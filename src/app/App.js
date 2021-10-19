/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import './App.css';
import Header from '../components/header';
import Main from '../components/main';
import Newsletter from '../components/newsletter';
import Footer from '../components/footer';

document.title = window.env.APP_NAME;

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;