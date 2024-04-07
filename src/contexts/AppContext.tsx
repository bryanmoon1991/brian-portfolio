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

  const openModal = (modalName: string) => {
    setState("modalOpen", true);
    setState("currentModal", modalName);
  };

  const closeModal = () => {
    setState("modalOpen", false);
    setState("currentModal", null);
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
