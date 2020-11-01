
var $form=document.querySelector("#send-button")



var sendfunction= function sendEmail(){
    console.log("-->here")
    $form.classList.add('disabled');
    console.log("disabled here-->")
    sendMessage({
        'Sender': document.querySelector("#sendid").value,
        'To': document.querySelector("#toid").value,
        'Subject':document.querySelector("#subjectid").value
     },
     document.querySelector("#message-text").value,
     composeTidy
     );

     return false
}

function sendMessage(headers_obj, message, callback)
{
  var email = '';
  console.log("Intital")
  console.log(email)
  for(var header in headers_obj)
    email += header += ": "+headers_obj[header]+"\r\n";
    console.log("Second")
    console.log(email)
  email += "\r\n" + message;
  console.log("third")
    console.log(email)
  var sendRequest = gapi.client.gmail.users.messages.send({
    'userId': 'me',
    'resource': {
      'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
    }
  
  });

  return sendRequest.execute(callback);
}

function composeTidy()
{
  console.log("hide modal")
  var to=document.querySelector("#sendid")
  to.value=''
  var from=document.querySelector("#toid")
  from.value=''
  var subject=document.querySelector("#subjectid")
  subject.value=''
  var message=document.querySelector("#message-text")
  message.value=''
  var mod=  document.querySelector("#exampleModal")
  mod.style.display='none'
  mod.classList.remove('show')
  var remo=document.querySelector("#send-button");
  remo.classList.remove('disabled')
  document.body.classList.remove('modal-open')
}


$form.addEventListener('click',sendfunction)


//search email

var search=document.querySelector('#search')
var input=document.querySelector('#insearch')

function appendPre(message) {
  var li = document.createElement('li');
  li.innerText=message
  li.classList.add("list-group-item")
  var ul=document.querySelector(".list-group")
  ul.appendChild(li)
}

var searchemail=function searchemail(event) {
  event.preventDefault()
  var ul=document.querySelector(".list-group")
  console.log(ul.hasChildNodes())
  while(ul.hasChildNodes()){
    ul.removeChild(ul.firstChild)
  }
  console.log(input.value)
  if(input.value!==''){
    console.log('here')
    gapi.client.gmail.users.messages.list({
      'userId': 'me',
      'q':input.value
    }).then(function(response) {
      var messages = response.result.messages;
      if (messages && messages.length > 0) {
        for (i = 0; i < messages.length; i++) {
          var message = messages[i];
          gapi.client.gmail.users.messages.get({
            'userId': 'me',
            'id':message.id
          }).then(function(response){
              var mesconts=response.result.payload.headers;
              for(j=0;j<mesconts.length;j++){
  
                var mess=mesconts[j]
                if(mess["name"]==='Subject'){
                  appendPre(mess["value"])
                }
                    
              }
  
          })
          //appendPre(message.id)
        }
      } else {
        appendPre('No Labels found.');
      }
    });
  }
  
}

search.addEventListener('click',searchemail)




