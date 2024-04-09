import type { Component } from "solid-js";
import styles from "./Mouse.module.css";
import { createSignal, onCleanup, onMount } from "solid-js";

const Mouse: Component = () => {
  const [mouse, setMouse] = createSignal({ x: 0, y: 0 });
  const [previousMouse, setPreviousMouse] = createSignal({ x: 0, y: 0 });
  const [circle, setCircle] = createSignal({ x: 0, y: 0 });
  const [isPulsating, setIsPulsating] = createSignal(false);

  let currentScale = 0;
  let currentAngle = 0;
  let circleElement: HTMLDivElement;
  let carouselElement: HTMLElement;

  const speed = 0.25; // Smoothing factor for cursor movement speed

  const updateMousePosition = (e) => {
    setMouse({ x: e.clientX, y: e.clientY });

    const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
    if (elementUnderCursor) {
      if (
        elementUnderCursor.tagName === "A" ||
        elementUnderCursor.classList.contains("cursor-pointer")
      ) {
        setIsPulsating(true);
      } else {
        setIsPulsating(false);
      }
    }
  };

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
    const scaleValue = (mouseVelocity / 150) * 0.55;
    currentScale += (scaleValue - currentScale) * speed;

    // ROTATE
    const angle = (Math.atan2(deltaMouseY, deltaMouseX) * 180) / Math.PI;
    if (mouseVelocity > 20) {
      currentAngle = angle;
    }

    let scaleAdjustment = 1;

    if (isPulsating()) {
      const pulseScale = Math.sin(Date.now() / 500) * 0.25 + 1; // Sinusoidal scale adjustment
      scaleAdjustment = pulseScale;
    }

    if (circleElement) {
      circleElement.style.transform =
        `translate(${nextCircleX}px, ${nextCircleY}px) ` +
        `rotate(${currentAngle}deg) ` +
        `scale(${(1 + currentScale) * scaleAdjustment}, ${(1 - currentScale) * scaleAdjustment})`;
    }

    window.requestAnimationFrame(tick);
  };

  const handleCarouselVisible = (event) => {
    carouselElement = document.getElementById("carousel");
  };

  const handleCarouselNotVisible = (event) => {
    carouselElement = null;
  };

  onMount(() => {
    document.addEventListener("carouselVisible", handleCarouselVisible);
    document.addEventListener("carouselNotVisible", handleCarouselNotVisible);
    window.addEventListener("mousemove", updateMousePosition);
    tick();
  });

  onCleanup(() => {
    window.removeEventListener("mousemove", updateMousePosition);
    document.removeEventListener("carouselVisible", handleCarouselVisible);
    document.removeEventListener(
      "carouselNotVisible",
      handleCarouselNotVisible,
    );
  });

  return <div ref={circleElement} class={styles.circle}></div>;
};

export default Mouse;
