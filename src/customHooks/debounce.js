import { useState } from "react";

export default function useDebounce(func, delay) {
  const [timer, timerSetter] = useState(null);

  return function () {
    let self = this;
    let args = arguments;

    clearTimeout(timer);

    timerSetter(
      setTimeout(() => {
        func.apply(self, args);
      }, delay)
    );
  };
}
