import { createContext, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import { useNavigate } from 'solid-app-router'; // Import useNavigate for navigation

interface ModalState {
  modalOpen: boolean;
  currentModal: string | null;
  lastUrl: string;
  scrollPosition: number; // Add this to track scroll position
}


interface AppContextType {
  state: ModalState; // This should include modalOpen, currentModal, lastUrl
  openModal: (modalName: string) => void;
  setScrollPosition: (scrollPosition: number) => void;
  closeModal: () => void;
  goBack: () => void;
}


const AppContext = createContext<AppContextType>();

export function AppProvider(props) {
  const [state, setState] = createStore<ModalState>({
    modalOpen: false,
    currentModal: null,
    lastUrl: '/', // Initialize with a default URL, such as home
    scrollPosition: 0 // Add this to track scroll position
  });

  const navigate = useNavigate(); // Use the useNavigate hook for navigation

  const setScrollPosition = (scrollPosition: number) => {
    console.log('in set state', scrollPosition)
    setState('scrollPosition', scrollPosition);
  }

  const openModal = (modalName: string) => {
    // Save the current URL and scroll position before opening the modal
    // const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    setState('lastUrl', window.location.pathname);
    setState('modalOpen', true);
    setState('currentModal', modalName);
  };
  
  const closeModal = () => {
    setState('modalOpen', false);
    setState('currentModal', null);
    // Restore the scroll position when the modal is closed
    window.scrollTo(0, state.scrollPosition);
  };
  const goBack = () => {
    // Navigate back to the last saved URL
    navigate(state.lastUrl);
  };

  const store: AppContextType = {
    state,
    openModal,
    setScrollPosition,
    closeModal,
    goBack,
  };

  return <AppContext.Provider value={store}>{props.children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
