// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
  // Create a parent item and children.
  chrome.contextMenus.create({
  	"title": "Beam Me Up Spottie", "id": "parent", "contexts":["all"]
  });
  chrome.contextMenus.create({
  	"title": "By Artist", "parentId": "parent", "id": "artist", "contexts":["all"]
  });
  chrome.contextMenus.create({
  	"title": "By Album", "parentId": "parent", "id": "album", "contexts":["all"]
  });
  chrome.contextMenus.create({
  	"title": "By Track", "parentId": "parent", "id": "track", "contexts": ["all"]
  });
	chrome.contextMenus.create({
		"title": "By Playlist", "parentId": "parent", "id": "playlist", "contexts": ["all"]
	});
});

function getNotificationId() {
  var id = Math.floor(Math.random() * 9007199254740992) + 1;
  return id.toString();
}

// The onClicked callback function.
function onClickHandler(info, tab) {
	// console logs the arguments passed to the on
	// click handler (i.e. info and tab)
	console.log(arguments);

	// grabs the selection text
  var sText = info.selectionText;

  // grabs the selected text type to be appended to the spotify
  // API query string parameter
  var sTextType = info.menuItemId;
	console.log(sTextType);

  // constructs spotify API url based on selected text
  var spotifyApi = "https://api.spotify.com/v1/search?q=" + sText + "&type=" + sTextType;
  console.log(spotifyApi);

  var id = getNotificationId()
  chrome.notifications.create(id, {
    title: 'Fuck You Rod',
    iconUrl: 'fur.png',
    type: 'basic',
    message: 'Fetching your shit'
    }, function() {});

	// make ajax call to spotify api with callback function
  $.getJSON( spotifyApi, {
    format: "json"
  })
  .done(function(data) {
  	console.log(data);
  	var url = data.artists.items[0].external_urls.spotify;
  	console.log(url);
    console.log(id);
    chrome.notifications.update(id, {
      title: 'Fuck You Rod',
      iconUrl: 'tuf.png',
      type: 'basic',
      message: 'your url is: ' + url
      }, function() {});
  });
};

function notificationClickHandler(id) {
  console.log(id);
  chrome.notifications.getAll(function(notifications) {
    console.log(notifications);
  });
};

// add click event
chrome.contextMenus.onClicked.addListener(onClickHandler);
chrome.notifications.onClicked.addListener(notificationClickHandler);

