import { useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from './useWindowSize';

/**
 * Allows quick, imperative integration of confetti into the application.
 * Yes, that's a must-have. 🎊
 * @param time The duration (in ms) how long the confetti should be visible.
 */
export function useConfetti(time = 10000) {
  const { width, height } = useWindowSize();
  const [isVisible, setIsVisible] = useState(false);
  const confetti = <> {isVisible && <Confetti width={width} height={height} />} </>;
  const show = () => {
    if (!isVisible) {
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), time);
    }
  };

  return {
    show,
    confetti,
    isVisible,
  };
}
