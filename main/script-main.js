var CLIENT_ID = '244448342458-33gs1rldmo2ffkpt0d9966pfhk03nch1.apps.googleusercontent.com';
var API_KEY = 'AIzaSyB3kxwxn9yFqpCsAGcxQrrLtJlFEksHzv8';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');
var getStartedButton = document.getElementById('getStarted_button');
var eventContainer = document.getElementById('content');
var joinButton = document.getElementById('join');
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
    getStarted_button.onclick = handleAuthClick;
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
    getStarted_button.style.display = 'none';
    signoutButton.style.display = 'block';
    listUpcomingEvents();
  } else {
    getStarted_button.style.display = 'block';
    signoutButton.style.display = 'none';
    eventContainer.style.display = 'none';
    joinButton.style.display = 'none';
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
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
  gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 10,
    'orderBy': 'startTime'
  }).then(function(response) {
    var events = response.result.items;

    eventContainer.style.display = 'block';
    appendPre('\nUpcoming events:');

    if (events.length > 0) {
      for (i = 0; i < events.length; i++) {
        var event = events[i];
        var startTime = event.start.dateTime;
        var realStartTime = formatDate(startTime);
        var endTime = event.end.dateTime;
        var realEndTime = formatDate(endTime);
        if (!startTime) {
          startTime = event.start.date;
        }
        appendPre(event.summary + ' (' + realStartTime + ')' + " to (" + realEndTime + ")")
      }
      var pre = document.getElementById('content');
      setTimeout(function(){joinButton.style.display='block';},2000);
      //document.content.appendChild(joinButton);
      // appendPre(joinButton.textContent);
    } else {
      appendPre('No upcoming events found.');
    }
  });
}
function formatDate(date) {
  var  months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  let year = "";
  year += date[0] + date[1] + date[2] + date[3];
  let month = "";
  month += date[5] + date[6];
  month = months[month - 1];
  let day = "";
  day += date[8] + date[9];
  let time = "";
  time += date[11] + date[12] + date[13] + date[14] + date[15];
  return year + "-" + month + "-" + day + "-" + time;
}
