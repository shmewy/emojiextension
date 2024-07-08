document.addEventListener('keyup', function(event) {
  if (event.key === ':') {
    showEmojiPicker(event.target);
  }
});

function showEmojiPicker(target) {
  const picker = document.createElement('iframe');
  picker.src = chrome.runtime.getURL('emoji-picker.html');
  picker.style.position = 'absolute';
  picker.style.border = 'none';
  picker.style.width = '300px';
  picker.style.height = '200px';
  picker.style.zIndex = '10000';
  picker.style.top = `${target.getBoundingClientRect().top + window.scrollY + 20}px`;
  picker.style.left = `${target.getBoundingClientRect().left + window.scrollX}px`;

  document.body.appendChild(picker);

  window.addEventListener('message', function(event) {
    if (event.data.type === 'emoji-selected') {
      target.value += event.data.emoji;
      document.body.removeChild(picker);
    }
  }, { once: true });
}
