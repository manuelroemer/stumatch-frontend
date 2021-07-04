import { IconButton, Tooltip } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { RefObject } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { isScrolledToBottom, scrollToBottom } from '../../utils/scrollUtils';

export interface ScrollToBottomButtonProps {
  containerRef: RefObject<HTMLElement>;
}

export default function ScrollToBottomButton({ containerRef }: ScrollToBottomButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const evaluateVisibility = () =>
    setIsVisible(containerRef.current ? !isScrolledToBottom(containerRef.current) : false);

  useEffect(() => {
    evaluateVisibility();
    containerRef.current?.addEventListener('scroll', evaluateVisibility);
    return () => containerRef.current?.removeEventListener('scroll', evaluateVisibility);
  }, [containerRef]);

  return isVisible ? (
    <Tooltip label="Scroll to bottom" hasArrow>
      <IconButton
        icon={<BiChevronDown />}
        aria-label="Scroll to bottom"
        size="lg"
        rounded="full"
        position="absolute"
        right="10"
        bottom="20"
        shadow="lg"
        onClick={() => {
          if (containerRef.current) {
            scrollToBottom(containerRef.current);
          }
        }}
      />
    </Tooltip>
  ) : null;
}
