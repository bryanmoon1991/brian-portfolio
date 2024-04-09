import { AppProvider } from "./contexts/AppContext";
import type { Component } from "solid-js";
import { createEffect, createSignal, onCleanup } from "solid-js";
import Nav from "./components/Nav";
import Mouse from "./components/Mouse";
import ImageIndex from "./components/ImageIndex";
import "../styles/main.css";

const App: Component = () => {
  const [isMobile, setIsMobile] = createSignal(false);
  const [isSmallScreen, setIsSmallScreen] = createSignal(false);

  createEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 320px)");
    const updateScreenSize = () => setIsSmallScreen(mediaQuery.matches);

    updateScreenSize();
    mediaQuery.addEventListener("change", updateScreenSize);

    onCleanup(() => mediaQuery.removeEventListener("change", updateScreenSize));
  });

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
    <AppProvider>
      {isSmallScreen() ? (
        <span class="flex-items-center flex h-screen w-full snap-center justify-evenly">
          :(
        </span>
      ) : (
        <>
          <Nav />
          <ImageIndex />
          {!isMobile() && <Mouse />}
        </>
      )}
    </AppProvider>
  );
};

export default App;
