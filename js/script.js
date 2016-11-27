'use strict';

////////////
// Kumassy Chat
(function () {
  'use strict';

  function insertMessage(name, message) {
    var imageUrl = 'images/icons/' + name.toLowerCase() + '.jpg';
    var div = '\n      <li class="item">\n        <div class="message_icon">\n          <img class="avatar" src="./' + imageUrl + '">\n        </div>\n        <div class="message_content">\n          <div class="name">' + name + '</div>\n          <div class="message">' + message + '</div>\n          <div class="timestamp">' + new Date().toLocaleDateString('ja-JP', { hour: "2-digit", minute: "2-digit" }) + '</div>\n        </div>\n      </li>\n    ';
    var messageList = document.querySelector('#chatroom ul');
    messageList.insertAdjacentHTML('beforeend', div);

    // scroll to new entry
    messageList.scrollTop = messageList.scrollHeight;
  }

  function resisterReply(message) {
    var reply = '';
    var replyList = ['🍣', '🏆', '(˘ω˘ )', '( ˘ω˘)', '( ˘ω˘)!!'];
    if (message.includes('Hello')) {
      reply = '( ˘ω˘)ﾉ';
    } else {
      reply = replyList[Math.floor(Math.random() * replyList.length)];
    }

    setTimeout(function () {
      insertMessage('Kumassy', reply);
    }, 1000);
  }

  function handleSendingMessage(e) {
    var textarea = document.querySelector('.inputfield textarea');
    var text = document.querySelector('.inputfield textarea').value;

    if (!text) {
      e.preventDefault();
      return;
    }

    insertMessage('You', text);
    textarea.value = "";
    e.preventDefault(); // Don't insert '\n' by press down return key
    resisterReply(text);
  }

  document.querySelector('.inputfield textarea').addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
      handleSendingMessage(e);
    }
  }, false);
  document.querySelector('.inputfield button').addEventListener('click', function (e) {
    handleSendingMessage(e);
  }, false);
})();