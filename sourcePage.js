function DOMtoString(document_root) {
    var html = 'Vanderbilt Classes: \n';
    var nodes = document.body.getElementsByClassName('classAbbreviation');
    var i = 0; 
    for (i = 0; i < nodes.length; i++) {
        var element = nodes[i].innerHTML;
        html += (element.substr(0, element.length - 1) + '\n');
    }
    return html;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});