
import React from 'react';
import './index.css';
import Header from './components/Header';
import People from './components/People';
import Planets from './components/Planets';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <People />
        <Planets />
        <Footer />
      </header>
    </div>
  );
}

export default App;