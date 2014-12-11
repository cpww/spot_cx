// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
  var context = "selection";
  var title = "Google for Selected Text";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                         "id": "context" + context});
});

// The onClicked callback function.
function onClickHandler(info, tab) {
  var sText = info.selectionText;
  var url = "https://www.google.com/search?q=" + encodeURIComponent(sText);
  window.open(url, '_blank');
};

// add click event
chrome.contextMenus.onClicked.addListener(onClickHandler);

// search form shit
var search = document.querySelectorAll('[data-search]');

search.on('click', function() {
  console.log('clicked');
})
