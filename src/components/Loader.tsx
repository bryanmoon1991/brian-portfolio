import type { Component } from "solid-js";
import styles from "./Loader.module.css";

const Loader: Component = () => {
  return (
    <span
      class="flex-items-center flex h-screen w-full snap-center justify-evenly"
      style={styles.loader}
    ></span>
  );
};

export default Loader;
