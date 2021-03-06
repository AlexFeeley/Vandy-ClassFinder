// Saves options to chrome.storage
function save_options() {
    var selectedMajor = document.getElementById('major').value;
    chrome.storage.sync.set({
        major: selectedMajor
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
        console.log("Major has been updated.");
        window.close();
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    chrome.storage.sync.get({
        major: 'computer-science'
    }, function(items) {
        document.getElementById('major').value = items.major;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
