function insert_message(img_src, name, message){
  const div = `
    <li class="item">
      <div class="message_icon">
        <img class="avatar" src="./${img_src}">
      </div>
      <div class="message_content">
        <div class="name">${name}</div>
        <div class="message">${message}</div>
        <div class="timestamp">${new Date().toLocaleDateString('ja-JP',{hour: "2-digit", minute: "2-digit", second: "2-digit"})}</div>
      </div>
    </li>
  `;
  const message_list = document.querySelector('#chatroom ul');
  message_list.insertAdjacentHTML('beforeend', div);

  // scroll to new entry
  message_list.scrollTop = message_list.scrollHeight;
}

function resister_reply(message){
  let reply = '';
  const reply_list = ['🍣', '🏆', '(˘ω˘ )', '( ˘ω˘)', '( ˘ω˘)!!'];
  if(message.includes('Hello')){
    reply = '( ˘ω˘)ﾉ';
  }
  else{
    reply = reply_list[Math.floor( Math.random() * reply_list.length )];
  }

  setTimeout(function(){
    insert_message('kumassy-icon.jpg', 'Kumassy', reply);
  }, 1000);

}

const textarea = document.querySelector('textarea');
textarea.addEventListener('keydown', function (e){
    // Do your key combination detection
    if(e.keyCode === 13){
      const text = textarea.value

      if(!text){
        e.preventDefault();
        return;
      }

      insert_message('kumassy-icon.jpg', 'Kumassy', text);
      textarea.value = "";
      event.preventDefault(); // Don't insert '\n' by press down return key
      resister_reply(text);
    }
}, false);
