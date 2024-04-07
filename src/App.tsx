import { AppProvider } from "./contexts/AppContext";
import { Router } from "solid-app-router";
import type { Component } from "solid-js";
import Nav from "./components/Nav";
import Mouse from "./components/Mouse";
import ImageIndex from "./components/ImageIndex";
import "../styles/main.css";

const App: Component = () => {
  return (
    <Router>
      <AppProvider>
        <Nav />
        <ImageIndex />
        <Mouse />
      </AppProvider>
    </Router>
  );
};

export default App;
