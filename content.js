// Script for content of page
console.log('content.js loaded maf');

// Listen for messages
chrome.runtime.onMessage.addListener(function(msg) {

  if (msg.command && (msg.command == "openFrame")) {
    console.log('msg openFrame:', msg);

    // Set search string variable with msg obj
    var searchString = msg.selection;

    // Inject markup to page with searchstrip
    $('body').append('<div id="spotty-plugin-content">'+
                    '<div id="spotty-plugin-close">X</div>'+
                    '<p id="spotty-currently-searching-for">Searching for: '+
                    searchString+
                    '</p>'+
                    '<p id="spotty-search-urls"></p>'+
                    '</div>');

    // Add listener for close
    $('#spotty-plugin-close, #spotty-search-urls').on('click', function(){
      $('#spotty-plugin-content').remove();
    });

  } else if (msg.command && (msg.command == "updateFrame")) {
    console.log('msg updateFrame:', msg);

    // Set searcUrl variable with msg obj
    var searchUrl = msg.searchUrl;

    // Add urls
    $('#spotty-search-urls').html('<a target="_blank" href="'+searchUrl+'">'+searchUrl+'</a>');
  }

});
