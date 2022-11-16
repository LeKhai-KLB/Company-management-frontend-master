export async function copyTextToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    // navigator clipboard api method'
    return navigator.clipboard.writeText(text);
  } else {
    // text area method
    let textArea = document.createElement("textarea");
    textArea.value = text;
    // make the textarea out of viewport
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise((res, rej) => {
      // here the magic happens
      document.execCommand("copy") ? res(true) : rej(false);
      textArea.remove();
    });
  }
}
