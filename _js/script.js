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

////////////
// Find the pair
(function() {
  'use strict';

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  function shuffle(array) {
    var n = array.length, t, i;

    while (n) {
      i = Math.floor(Math.random() * n--);
      t = array[n];
      array[n] = array[i];
      array[i] = t;
    }

    return array;
  }

  function insertCard(card){
    const div = `
      <div class="card">
        <div class="front"></div>
        <div class="back">${card.item}</div>
      </div>
    `;
    const cards = document.querySelector('#pair ul');
    cards.insertAdjacentHTML('beforeend', div);
  }

  function flip(card) {
    card.classList.contains('open') ? card.classList.remove('open') : card.classList.add('open');
  }
  function handleClick(cardElem){
    if(!cardElem.card.isClosed){
      flip(cardElem);
      sleep(800).then(() => {
        if(selectedCardElem && (selectedCardElem != cardElem)){
          // check equality
          if(selectedCardElem.card.item === cardElem.card.item){
            selectedCardElem.card.isClosed = true;
            cardElem.card.isClosed = true;
          }
          else{
            flip(selectedCardElem);
            flip(cardElem);
          }
          selectedCardElem = null;
        }
        else if(selectedCardElem === cardElem){
          selectedCardElem = null;
        }
        else{
          selectedCardElem = cardElem;
        }
      });
    }

    console.log("Selected: ");
    console.log(selectedCardElem)
    console.log("Clicked: ");
    console.log(cardElem)
  }


  const seed = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  let cards = seed.map(function(s){
    return {
      item: s,
      isClosed: false
    };
  });
  cards = shuffle(cards.concat(cards));

  let selectedCardElem = null;

  cards.forEach(function(card){
    insertCard(card);
  });

  document.querySelectorAll('.card').forEach(function(cardElem, index){
    cardElem.card = cards[index];
    cardElem.addEventListener('click', function() {
      handleClick(cardElem);
    });
  });

})();
