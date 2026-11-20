/**
 *
 * @type {HTMLElement}
 * Changes iframe data-src to src and hides hint on button on button click
 * adds localstorage value, so the attribute is changed on load
 */



export default function initMatterport(iframe, button, hint) {

  const iframeSrc = iframe.dataset.src;

  if (localStorage.getItem('showMatterport')) {
    iframe.setAttribute('src', iframeSrc);
    hint.remove();
  }

  button.addEventListener('click', function () {
    iframe.setAttribute('src', iframeSrc);
    hint.remove();
    localStorage.setItem('showMatterport', 'true')
  })

}

