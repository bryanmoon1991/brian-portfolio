import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import Modal from './Modal';

const Nav: Component = () => {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <p>Modal Content</p>
      </Modal>
      <div class='flex flex-justify-between m1 w-full fixed top-0 z-3'>
        <p class='m-0 pl'>Brian You, Art Direction and Design, NY</p>
        <p class='m-0 pr' onClick={() => setIsOpen(!isOpen())}>
          {isOpen() ? 'Close' : 'About'}
        </p>
      </div>
    </>
  );
};

export default Nav;
