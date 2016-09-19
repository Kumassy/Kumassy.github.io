const textarea = document.querySelector('textarea');
textarea.addEventListener('keydown', function (e){
    // Do your key combination detection
    if(e.keyCode === 13){
      const text = textarea.value

      if(!text){
        e.preventDefault();
        return;
      }
      const div = `
        <li class="item">
          <div class="message_icon">
            <img class="avatar" src="./kumassy-icon.jpg">
          </div>
          <div class="message_content">
            <div class="name">Kumassy</div>
            <div class="message">${text}</div>
            <div class="timestamp">${new Date().toLocaleDateString('ja-JP',{hour: "2-digit", minute: "2-digit", second: "2-digit"})}</div>
          </div>
        </li>
      `;
      const message_list = document.querySelector('#chatroom ul');
      message_list.insertAdjacentHTML('beforeend', div);

      // scroll to new entry
      message_list.scrollTop = message_list.scrollHeight;

      textarea.value = "";
      e.preventDefault(); // Don't insert '\n' by press down return key

    }
}, false);
