// Extension requests source code of webpage
chrome.runtime.onMessage.addListener(function(request, sender) {
    console.log("Source code of webpage requested.");
    if (request.action == "getSource") {
      message.innerText = request.source;
    }
});

function load() {
    chrome.tabs.executeScript(null, {
      file: "sourcePage.js"
    }, function() {
    
      if (chrome.runtime.lastError) {
        message.innerText = 'ERROR: ' + chrome.runtime.lastError.message;
      } else {
        console.log("sourcePage inserted into current browser.");
      }
    });
}

// Calls load when window loads
window.onload = load;