

// var rightSection = document.getElementById("rightSection");
//
// rightSection.insertAdjacentHTML('beforeend', '<div class="detailHeader">ExtensionSection</div><div class=""detailPanel"><div class="listItem">List fulfilledrequirements here</div></div>');


var button = document.createElement("button");
var text = document.createTextNode("Get Updated Class Details");
button.appendChild(text);

var pageLocation = document.getElementById("mainContextMenu");
pageLocation.appendChild(button);