
    // Client ID and API key from the Developer Console
    var CLIENT_ID = '159817157086-a9d56sqq3p42uo2mn3i865p26mh8mvqp.apps.googleusercontent.com';
    var API_KEY = 'AIzaSyAyxY3kq69G1doCMQlnrQLF5H_VVrnvg8E';

    // Array of API discovery doc URLs for APIs used by the quickstart
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];

    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    var SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

    var authorizeButton = document.getElementById('authorize_button');
    var signoutButton = document.getElementById('signout_button');

    /**
     *  On load, called to load the auth2 library and API client library.
     */
    function handleClientLoad() {
      gapi.load('client:auth2', initClient);
    }

    /**
     *  Initializes the API client library and sets up sign-in state
     *  listeners.
     */
    function initClient() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
      }, function(error) {
        appendPre(JSON.stringify(error, null, 2));
      });
    }

    /**
     *  Called when the signed in status changes, to update the UI
     *  appropriately. After a sign-in, the API is called.
     */
    function updateSigninStatus(isSignedIn) {
      if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        listLabels();
      } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
      }
    }

    /**
     *  Sign in the user upon button click.
     */
    function handleAuthClick(event) {
      gapi.auth2.getAuthInstance().signIn();
    }

    /**
     *  Sign out the user upon button click.
     */
    function handleSignoutClick(event) {
      gapi.auth2.getAuthInstance().signOut();
    }

    /**
     * Append a pre element to the body containing the given message
     * as its text node. Used to display the results of the API call.
     *
     * @param {string} message Text to be placed in pre element.
     */
    function appendPre(message) {
      var li = document.createElement('li');
      li.innerText=message
      li.classList.add("list-group-item")
      var ul=document.querySelector(".list-group")
      ul.appendChild(li)
    }

    /**
     * Print all Labels in the authorized user's inbox. If no labels
     * are found an appropriate message is printed.
     */
    function listLabels() {
      gapi.client.gmail.users.messages.list({
        'userId': 'me'
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