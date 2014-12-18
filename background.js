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

function openFrame(tab, sText) {
  chrome.tabs.sendMessage(tab, {
    command: "openFrame",
    selection: sText
  });
}

function showInfoFrame(tab, url) {
  chrome.tabs.sendMessage(tab, {
    command: "updateFrame",
    searchUrl: url
  });
}

// The onClicked callback function.
function onClickHandler(info, tab) {
	// console logs the arguments passed to the on
	// Click handler (i.e. info and tab)
	console.log(arguments);

	// Grabs the selection text
  var sText = info.selectionText;

  // Start spinner
  openFrame(tab.id, sText);

  // Make sText clean for Url search
  var sTextClean = sText.replace(/ /g, '+');

  // Grabs the selected text type to be appended to the spotify
  // API query string parameter
  var sTextType = info.menuItemId;
	console.log(sTextType);

  // Constructs spotify API url based on selected text
  var spotifyApi = "https://api.spotify.com/v1/search?q=" + sTextClean + "&type=" + sTextType;
  console.log(spotifyApi);

	// Make ajax call to spotify api with callback function
  $.getJSON( spotifyApi, {
    format: "json"
  })
  .done(function(data) {
    // Since the first item in the data object differs based on selected
    // Text type, this is the most elegant way to get the first object
    var type = Object.keys(data);
    var url = data[type].items[0].external_urls.spotify;
  	console.log(data);
    console.log('data type:' + type);
    console.log('constructed URL:' + url);

    showInfoFrame(tab.id, url);
  });
};

// Add click event
chrome.contextMenus.onClicked.addListener(onClickHandler);

