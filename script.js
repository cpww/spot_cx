// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
  // Create a parent item and children.
  chrome.contextMenus.create({"title": "Beam Me Up Spottie", "id": "parent", "contexts":["all"]});
  chrome.contextMenus.create(
      {"title": "By Artist", "parentId": "parent", "id": "child1", "contexts":["all"]});
  chrome.contextMenus.create(
      {"title": "By Album", "parentId": "parent", "id": "child2", "contexts":["all"]});
});

// The onClicked callback function.
function onClickHandler(info, tab) {
  var sText = info.selectionText;
  var url = 1;//grab the url based on the Spotify API call populated with sText
  //somehow pop up our popup with url populated
};

// add click event
chrome.contextMenus.onClicked.addListener(onClickHandler);
