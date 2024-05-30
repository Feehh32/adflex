export default function outsideClick(element, events, callback) {
  const html = document.documentElement;
  const outside = "data-outside";

  if (!element.hasAttribute(outside)) {
    element.setAttribute(outside, "");

    const handleOutsideClick = (e) => {
      if (!element.contains(e.target)) {
        element.removeAttribute(outside);
        html.removeEventListener(events, handleOutsideClick);

        callback();
      }
    };

    setTimeout(() => html.addEventListener(events, handleOutsideClick));
  }
}
