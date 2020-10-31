
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




