(function() {
  'use strict';

  function insertMessage(imgSrc, name, message){
    const div = `
      <li class="item">
        <div class="message_icon">
          <img class="avatar" src="./${imgSrc}">
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
    const replyList = ['🍣', '🏆', '(˘ω˘ )', '( ˘ω˘)', '( ˘ω˘)!!'];
    if(message.includes('Hello')){
      reply = '( ˘ω˘)ﾉ';
    }
    else{
      reply = replyList[Math.floor( Math.random() * replyList.length )];
    }

    setTimeout(function(){
      insertMessage('images/icons/kumassy.jpg', 'Kumassy', reply);
    }, 1000);

  }

  function handleSendingMessage(e){
    const textarea = document.querySelector('.inputfield textarea');
    const text = document.querySelector('.inputfield textarea').value;

    if(!text){
      e.preventDefault();
      return;
    }

    insertMessage('images/icons/you.jpg', 'You', text);
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

})();
