const bc = new BroadcastChannel('myChannel')
const send = document.querySelector('.s-icon')
const receiveBox = document.querySelector('.receiveBox');
const input = document.querySelector('.input')
const container = document.querySelector('.container')
const dateHold = document.querySelector('.date')
const attach = document.querySelector('.attach')
const confirm = document.querySelector('.confirm')

window.document.addEventListener('contextmenu', (e) => {
   e.preventDefault();
})

send.addEventListener('click', () => {
   if (input.value == '') {
      null;
      newDiv.style.display = 'none';
   } else {
      receiveBox.innerHTML += `
      <div class='container'>
         <span class='sendData1' oncontextmenu='rightClick1(event)'>${input.value}</span>
      </div>`;
      bc.postMessage(input.value);
      input.value = '';
      const date = new Date();
      const hour = date.getHours();
      const minute = date.getMinutes();
      receiveBox.innerHTML += `
      <div class='container2'>
         <span class='date' oncontextmenu='rightClick1(event)'>${hour + ':' + minute}</span>
      </div>`;
      receiveBox.scrollTo(0, receiveBox.scrollHeight);
      newDiv.style.display = 'none';
   }
})

input.addEventListener('keyup', (e) => {
   if (e.key == 'Enter') {
      if (input.value == '') {
         null;
         newDiv.style.display = 'none';
      } else {
         receiveBox.innerHTML += `
         <div class='container'>
            <span class='sendData1' oncontextmenu='rightClick1(event)'>${input.value}</span>
         </div>`;
         bc.postMessage(input.value);
         input.value = '';
         const date = new Date();
         const hour = date.getHours();
         const minute = date.getMinutes();
         receiveBox.innerHTML += `
         <div class='container2'>
            <span class='date' oncontextmenu='rightClick1(event)'>${hour + ':' + minute}</span>
         </div>`;
         receiveBox.scrollTo(0, receiveBox.scrollHeight);
         newDiv.style.display = 'none';
      }
   }
})

bc.addEventListener('message', e => {
   receiveBox.innerHTML += `
   <div class='container'>
      <span class='sendData2' oncontextmenu='rightClick2(event)'>${e.data}</span>
   </div>`;
   const date = new Date()
   const hour = date.getHours()
   const minute = date.getMinutes()
   receiveBox.innerHTML += `
   <div class='container2'>
      <span class='date2' oncontextmenu='rightClick2(event)'>${hour + ':' + minute}</span>
   </div>`;
   receiveBox.scrollTo(0, receiveBox.scrollHeight)
})

receiveBox.scrollTo(0, receiveBox.scrollHeight)

const newDiv = document.createElement('div');
const deleteMsg = document.createElement('div');
deleteMsg.classList.add('options')
deleteMsg.innerHTML = 'حذف';
newDiv.appendChild(deleteMsg)

const edit = document.createElement('div');
edit.classList.add('options')
edit.innerHTML = 'ویرایش';
newDiv.appendChild(edit)

const forward = document.createElement('div');
forward.classList.add('options')
forward.innerHTML = 'ارسال به دیگری';
newDiv.appendChild(forward)

const answer = document.createElement('div');
answer.classList.add('options')
answer.innerHTML = 'پاسخ دادن';
newDiv.appendChild(answer)

const pin = document.createElement('div');
pin.classList.add('options')
pin.innerHTML = 'سنجاق';
newDiv.appendChild(pin)


function rightClick1(event){
   newDiv.style.display = 'block';
   newDiv.classList.add('custom-div');
   newDiv.style.left = `${event.pageX - 150}px`;
   newDiv.style.top = `${event.pageY - 200}px`;
   document.body.appendChild(newDiv);

   deleteMsg.addEventListener('click', () => {
      event.target.innerHTML = 'این پیام حذف شده است'
      newDiv.style.display = 'none';
   })
   
   edit.addEventListener('click', () => {
      const msgValue = event.target.innerHTML;
      input.value = msgValue;
      event.target.style.border = '2px solid blue'
      newDiv.style.display = 'none';
      confirm.style.display = 'block';


      confirm.addEventListener('click', () => {
         const newValue = input.value;
         event.target.innerHTML = newValue;
         bc.postMessage(input.value);
         event.target.style.border = 'none';
         input.value = ''
         confirm.style.display = 'none';
      })
   })
}

function exit() {
   console.log('exited');
}

function rightClick2(event){
   newDiv.style.display = 'block'
   newDiv.classList.add('custom-div');
   newDiv.style.left = `${event.pageX}px`;
   newDiv.style.top = `${event.pageY - 200}px`;
   document.body.appendChild(newDiv);
}

receiveBox.addEventListener('click', () => {
   newDiv.style.display = 'none';
})

input.addEventListener('click', () => {
   newDiv.style.display = 'none';
})

attach.addEventListener('click', () => {
   newDiv.style.display = 'none';
})

