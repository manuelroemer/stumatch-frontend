export function scrollToBottom(element: Element) {
  element.scrollTop = element.scrollHeight;
}

export function isScrolledToBottom(element: HTMLElement) {
  return element.scrollTop + element.offsetHeight === element.scrollHeight;
}
