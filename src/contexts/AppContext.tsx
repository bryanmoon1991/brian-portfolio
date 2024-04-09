import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

interface ModalState {
  modalOpen: boolean;
  currentModal: string | null;
}

interface AppContextType {
  state: ModalState;
  openModal: (modalName: string) => void;
  closeModal: () => void;
}

const AppContext = createContext<AppContextType>();

export function AppProvider(props) {
  const [state, setState] = createStore<ModalState>({
    modalOpen: false,
    currentModal: null,
  });

  const carouselVisible = () => {
    const event = new CustomEvent("carouselVisible", {
      detail: {
        /* You can pass additional data if needed */
      },
    });
    document.dispatchEvent(event);
  };

  const carouselNotVisible = () => {
    const event = new CustomEvent("carouselNotVisible", {
      detail: {
        /* You can pass additional data if needed */
      },
    });
    document.dispatchEvent(event);
  };

  const handleBackNav = (event) => {
    event.preventDefault();
    closeModal();
  };

  const openModal = (modalName: string) => {
    setState("modalOpen", true);
    setState("currentModal", modalName);

    if (modalName != "About") {
      carouselVisible();
    }

    history.pushState({ modalOpen: true }, null);
    window.addEventListener("popstate", handleBackNav);
  };

  const closeModal = () => {
    if (state.currentModal != "About") {
      carouselNotVisible();
    }

    setState("modalOpen", false);
    setState("currentModal", null);

    history.back();

    window.removeEventListener("popstate", handleBackNav);
  };

  const store: AppContextType = {
    state,
    openModal,
    closeModal,
  };

  return (
    <AppContext.Provider value={store}>{props.children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
