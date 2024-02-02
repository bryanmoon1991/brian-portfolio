import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import Modal from './Modal';
import About from './About';

const Nav: Component = () => {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <>
      <div class='flex flex-justify-between m1 w-full fixed top-0 z-3'>
        <p class='m-0 pl'>Brian You, Art Direction and Design, NY</p>
        <p class='m-0 pr' onClick={() => setIsOpen(!isOpen())}>
          {isOpen() ? 'Close' : 'About'}
        </p>
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <About/>
      </Modal>
    </>
  );
};

export default Nav;
