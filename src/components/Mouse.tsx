import type { Component } from "solid-js";
import styles from "./Mouse.module.css";
import { createSignal, onCleanup, onMount } from "solid-js";

const Mouse = () => {
  const [mouse, setMouse] = createSignal({ x: 0, y: 0 });
  const [previousMouse, setPreviousMouse] = createSignal({ x: 0, y: 0 });
  const [circle, setCircle] = createSignal({ x: 0, y: 0 });
  let currentScale = 0;
  let currentAngle = 0;
  let circleElement;

  const speed = 0.3; // Smoothing factor for cursor movement speed

  let carouselElement = document.getElementById("carousel"); // You'll need to set this reference appropriately

  const updateMousePosition = (e) => {
    setMouse({ x: e.clientX, y: e.clientY });

    const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
    // Reset styles if not over an anchor or the carousel
    circleElement.style.backgroundColor = "white";
    circleElement.style.mixBlendMode = "difference";
    circleElement.style.backgroundImage = ""; // Reset background image for arrow

    if (elementUnderCursor) {
      if (elementUnderCursor.tagName === "A") {
        circleElement.style.backgroundColor = "blue"; // Change to solid blue when over anchor tags
        circleElement.style.mixBlendMode = "normal"; // Optional: Reset blend mode if needed
      } else {
        circleElement.style.backgroundColor = "white"; // Revert to original color
        circleElement.style.mixBlendMode = "difference"; // Revert to original blend mode
      }
      if (carouselElement && carouselElement.contains(elementUnderCursor)) {
        const carouselRect = carouselElement.getBoundingClientRect();
        const hoverZoneWidth = carouselRect.width * 0.2; // 20% of the carousel width as the hover zone for each side
        if (e.clientX < carouselRect.left + hoverZoneWidth) {
          // Mouse is in the left hover zone
          circleElement.style.backgroundImage =
            'url("/path/to/left-arrow-icon.png")';
          circleElement.style.backgroundColor = "transparent";
        } else if (e.clientX > carouselRect.right - hoverZoneWidth) {
          // Mouse is in the right hover zone
          circleElement.style.backgroundImage =
            'url("/path/to/right-arrow-icon.png")';
          circleElement.style.backgroundColor = "transparent";
        }
      }
    }
  };

  // Update mouse position and check for anchor hover
  // const updateMousePosition = (e) => {
  //   setMouse({ x: e.clientX, y: e.clientY });
  //   const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
  //   if (elementUnderCursor && (elementUnderCursor.tagName === 'A') ) {
  //     circleElement.style.backgroundColor = 'blue'; // Change to solid blue when over anchor tags
  //     circleElement.style.mixBlendMode = 'normal'; // Optional: Reset blend mode if needed
  //   } else {
  //     circleElement.style.backgroundColor = 'white'; // Revert to original color
  //     circleElement.style.mixBlendMode = 'difference'; // Revert to original blend mode
  //   }
  // };

  // Animation logic encapsulated in tick function
  const tick = () => {
    const mousePos = mouse();
    const prevMousePos = previousMouse();
    const circlePos = circle();

    // MOVE
    const nextCircleX = circlePos.x + (mousePos.x - circlePos.x) * speed;
    const nextCircleY = circlePos.y + (mousePos.y - circlePos.y) * speed;
    setCircle({ x: nextCircleX, y: nextCircleY });

    // SQUEEZE
    const deltaMouseX = mousePos.x - prevMousePos.x;
    const deltaMouseY = mousePos.y - prevMousePos.y;
    setPreviousMouse(mousePos);
    const mouseVelocity = Math.min(
      Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 4,
      150,
    );
    const scaleValue = (mouseVelocity / 150) * 0.5;
    currentScale += (scaleValue - currentScale) * speed;

    // ROTATE
    const angle = (Math.atan2(deltaMouseY, deltaMouseX) * 180) / Math.PI;
    if (mouseVelocity > 20) {
      currentAngle = angle;
    }

    if (circleElement) {
      circleElement.style.transform =
        `translate(${nextCircleX}px, ${nextCircleY}px) ` +
        `rotate(${currentAngle}deg) ` +
        `scale(${1 + currentScale}, ${1 - currentScale})`;
    }

    window.requestAnimationFrame(tick);
  };

  // Initialize and cleanup
  onMount(() => {
    window.addEventListener("mousemove", updateMousePosition);
    tick(); // Start the animation
  });

  onCleanup(() => {
    window.removeEventListener("mousemove", updateMousePosition);
  });

  return <div ref={circleElement} class={styles.circle}></div>;
};

export default Mouse;
