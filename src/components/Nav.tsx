import type { Component } from 'solid-js';
import { Show } from 'solid-js';
import About from './About';
import { useAppContext } from '../contexts/AppContext';

const Nav: Component = () => {
  const { state, openModal, closeModal } = useAppContext();

  const handleAboutClick = () => {
    if (state.modalOpen) {
      closeModal();
    } else {
      openModal('About')
    }
  };

  return (
    <>
      <div class='flex flex-justify-between m1 w-full fixed top-0 z-3'>
        <p class='m-0 pl'>Brian You, Art Direction and Design, NY</p>
        <p class='m-0 pr' onClick={handleAboutClick}>
          {state.modalOpen ? 'Close' : 'About'}
        </p>
      </div>
      <Show when={state.currentModal == 'About'}>
        <About/>
      </Show>
    </>
  );
};

export default Nav;
