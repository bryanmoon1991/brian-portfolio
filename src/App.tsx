import { AppProvider } from './contexts/AppContext';
import { Router } from 'solid-app-router';
import type { Component } from 'solid-js';
import Nav from './components/Nav';
import ImageIndex from './components/ImageIndex';
import '../styles/main.css';

const App: Component = () => {
  return (
    <Router>
      <AppProvider>
        <Nav />
        <ImageIndex />
      </AppProvider>
    </Router>
  );
};

export default App;
