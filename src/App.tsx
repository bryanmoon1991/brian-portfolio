import { AppProvider } from "./contexts/AppContext";
import { Router } from "solid-app-router";
import type { Component } from "solid-js";
import { createEffect, createSignal } from "solid-js";
import Nav from "./components/Nav";
import Mouse from "./components/Mouse";
import ImageIndex from "./components/ImageIndex";
import "../styles/main.css";

const App: Component = () => {
  const [isMobile, setIsMobile] = createSignal(false);

  const checkForMobile = () => {
    const userAgent = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent,
    );
  };

  createEffect(() => {
    setIsMobile(checkForMobile());
  });

  return (
    <Router>
      <AppProvider>
        <Nav />
        <ImageIndex />
        {!isMobile() && <Mouse />}
      </AppProvider>
    </Router>
  );
};

export default App;
