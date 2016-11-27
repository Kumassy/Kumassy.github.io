////////////
// Kumassy Chat
(function() {
  'use strict';

  function insertMessage(name, message){
    const imageUrl = `images/icons/${name.toLowerCase()}.jpg`;
    const div = `
      <li class="item">
        <div class="message_icon">
          <img class="avatar" src="./${imageUrl}">
        </div>
        <div class="message_content">
          <div class="name">${name}</div>
          <div class="message">${message}</div>
          <div class="timestamp">${new Date().toLocaleDateString('ja-JP',{hour: "2-digit", minute: "2-digit"})}</div>
        </div>
      </li>
    `;
    const messageList = document.querySelector('#chatroom ul');
    messageList.insertAdjacentHTML('beforeend', div);

    // scroll to new entry
    messageList.scrollTop = messageList.scrollHeight;
  }

  function resisterReply(message){
    let reply = '';
    const replyList = ['🍣', '🏆', '(˘ω˘ )', '( ˘ω˘)', '( ˘ω˘)!!', '₍₍(ง˘ω˘)ว⁾⁾', '(ヽ´ω`)'];
    if(message.includes('Hello')){
      reply = '( ˘ω˘)ﾉ';
    }
    else{
      reply = replyList[Math.floor( Math.random() * replyList.length )];
    }

    setTimeout(function(){
      insertMessage('Kumassy', reply);
    }, 1000);

  }

  function handleSendingMessage(e){
    const textarea = document.querySelector('.inputfield textarea');
    const text = document.querySelector('.inputfield textarea').value;

    if(!text){
      e.preventDefault();
      return;
    }

    insertMessage('You', text);
    textarea.value = "";
    e.preventDefault(); // Don't insert '\n' by press down return key
    resisterReply(text);
  }

  document.querySelector('.inputfield textarea').addEventListener('keydown', function (e){
      if(e.keyCode === 13){
        handleSendingMessage(e);
      }
  }, false);
  document.querySelector('.inputfield button').addEventListener('click', function(e){
    handleSendingMessage(e);
  }, false);

  insertMessage('Kumassy', "Hello, Kumassy World!");
  insertMessage('Kumassy', "Put some awesome words in the text field below. Then, click 'send' button (or just press 'Enter' key).");
  insertMessage('Kumassy', "Enjoy chatting with me!");

})();
