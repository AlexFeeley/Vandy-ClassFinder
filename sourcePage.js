function DOMtoString(document_root) {
    var html = 'Vanderbilt Classes: \n';
    var nodes = document.body.getElementsByClassName('classAbbreviation');
    var i = 0; 

    // Get saved major
    var selectedMajor = 'Computer Science';

    for (i = 0; i < nodes.length; i++) {
        var element = nodes[i].innerHTML;
        var concentration = 'testing'; 

        switch(element) {
            case 'MATH 1300:': case 'MATH 1301:': case 'MATH 2300:': case 'MATH 2410:':
            case 'MATH 2420:': case 'MATH 2600:': case 'MATH 2810:':
                    concentration = "Math";
                    break;
            case 'BSCI 1101:': case 'BSCI 1101L:': case 'BSCI 1510:': case 'BSCI 1510L:': case 'BSCI 1511:':
            case 'BSCI 1511L:': case 'BSCI 2218:': case 'BSCI 2219:': case 'CHEM 1601:': case 'CHEM 1601L:':
            case 'CHEM 1602:': case 'CHEM 1602L:': case 'MSE 1500:': case 'MSE 1500L:': case 'PHYS 1601:':
            case 'PHYS 1601L:': case 'PHYS 1602:': case 'PHYS 1602L:':
                concentration = "Science";
                break;
            case 'ES 1401:': case 'ES 1402': case 'ES 1403':
                concentration = "Introduction to Engineering";
                break;

            // Computer Science Specific
            case 'CS 1101:': case 'CS 1104:': case 'CS 2201:': case 'CS 3251:': case 'CS 3270:':
            case 'EECE 2123': case 'EECE 2123L': case 'CS 3281:': case 'CS 2212:': case 'CS 3250:':
                concentration = "Computer Science Core";
                break;
            case 'CS 4260:': case 'CS 4278:': case 'EECE 4353:': case 'EECE 4354:': case 'EECE 4376:':
            case 'MATH 3320:': case 'MATH 3620:': case 'MATH 4600:': case 'MATH 4620:': case 'CS 3860:':
            case 'CS 3861:':
                concentration = "Computer Science Depth";
                break;
            case 'CS 3259:': case 'CS 3892:': case 'CS 4269:': case 'CS 4279:': case 'CS 4287:':
                concentration = "Computer Science Project";
                break;
            case 'CS 4959:':
                concentration = "Computer Science Seminar";
                break;
            case 'CS 1151:':
                concentration = "Computers and Ethics";
                break;
            default:
                concentration = "Not available.";
                break;
        }

        html += (element + ' ' + concentration + '\n');
    }
    return html;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});