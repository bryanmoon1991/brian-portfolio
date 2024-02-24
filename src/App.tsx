import { AppProvider } from './contexts/AppContext';
import type { Component } from 'solid-js';
import Nav from './components/Nav';
import ImageIndex from './components/ImageIndex';
import '../styles/main.css';

const App: Component = () => {
  return (
    <AppProvider>
      <Nav />
      <ImageIndex />
    </AppProvider>
  );
};

export default App;
