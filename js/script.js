'use strict';

var textarea = document.querySelector('textarea');
textarea.addEventListener('keydown', function (e) {
  // Do your key combination detection
  if (e.keyCode === 13) {
    var text = textarea.value;

    if (!text) {
      e.preventDefault();
      return;
    }
    var div = '\n        <li class="item">\n          <div class="message_icon">\n            <img class="avatar" src="./kumassy-icon.jpg">\n          </div>\n          <div class="message_content">\n            <div class="name">Kumassy</div>\n            <div class="message">' + text + '</div>\n            <div class="timestamp">' + new Date().toLocaleDateString('ja-JP', { hour: "2-digit", minute: "2-digit", second: "2-digit" }) + '</div>\n          </div>\n        </li>\n      ';
    var message_list = document.querySelector('#chatroom ul');
    message_list.insertAdjacentHTML('beforeend', div);

    // scroll to new entry
    message_list.scrollTop = message_list.scrollHeight;

    textarea.value = "";
    e.preventDefault(); // Don't insert '\n' by press down return key
  }
}, false);