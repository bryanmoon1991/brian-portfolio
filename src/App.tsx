import type { Component } from 'solid-js';
import Nav from './components/Nav';
import TwoUp from './components/TwoUp';
import '../styles/main.css'

const App: Component = () => {
  return (
    <>
      <Nav />
      <TwoUp />
    </>
  );
};

export default App;

