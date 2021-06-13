export function scrollToBottom(element: Element) {
  element.scrollTop = element.scrollHeight;
}

export function isScrolledToTop(element: Element) {
  return element.scrollTop === 0;
}

export function isScrolledToBottom(element: HTMLElement) {
  return element.scrollTop + element.offsetHeight === element.scrollHeight;
}
