"use strict";

function insert_message(img_src, name, message) {
  var div = "\n    <li class=\"item\">\n      <div class=\"message_icon\">\n        <img class=\"avatar\" src=\"./" + img_src + "\">\n      </div>\n      <div class=\"message_content\">\n        <div class=\"name\">" + name + "</div>\n        <div class=\"message\">" + message + "</div>\n        <div class=\"timestamp\">" + new Date().toLocaleDateString('ja-JP', { hour: "2-digit", minute: "2-digit", second: "2-digit" }) + "</div>\n      </div>\n    </li>\n  ";
  var message_list = document.querySelector('#chatroom ul');
  message_list.insertAdjacentHTML('beforeend', div);

  // scroll to new entry
  message_list.scrollTop = message_list.scrollHeight;
}

function resister_reply(message) {
  var reply = '';
  var reply_list = ['🍣', '🏆', '(˘ω˘ )', '( ˘ω˘)', '( ˘ω˘)!!'];
  if (message.includes('Hello')) {
    reply = '( ˘ω˘)ﾉ';
  } else {
    reply = reply_list[Math.floor(Math.random() * reply_list.length)];
  }

  setTimeout(function () {
    insert_message('kumassy-icon.jpg', 'Kumassy', reply);
  }, 1000);
}

var textarea = document.querySelector('.inputfield textarea');
textarea.addEventListener('keydown', function (e) {
  // Do your key combination detection
  if (e.keyCode === 13) {
    var text = textarea.value;

    if (!text) {
      e.preventDefault();
      return;
    }

    insert_message('you-icon.jpg', 'You', text);
    textarea.value = "";
    event.preventDefault(); // Don't insert '\n' by press down return key
    resister_reply(text);
  }
}, false);
document.querySelector('.inputfield button').addEventListener('click', function (e) {
  var text = textarea.value;

  if (!text) {
    e.preventDefault();
    return;
  }

  insert_message('you-icon.jpg', 'You', text);
  textarea.value = "";
  event.preventDefault(); // Don't insert '\n' by press down return key
  resister_reply(text);
}, false);