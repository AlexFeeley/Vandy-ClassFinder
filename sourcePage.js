/**
 * getPage()
 * Retreives the major stored in options, and then calls the function getHTML()
 * to parse through the raw HTML of the page to get the classes shown. 
 */
function getPage() {
    var selectedMajor = 'unavailable.';

    let p = new Promise(function(resolve, reject) {
        // Gets major from storage
        chrome.storage.sync.get(['major'], function (data) { 
            selectedMajor = JSON.stringify(data.major);
            console.log("Major received by sourcePage: " + selectedMajor);
        });   

        setTimeout(() => resolve(selectedMajor), 1000); // Set promise value to selectedMajor's value
    });

    p.then(function (selectedMajor) {
        console.log("Promise loaded: " + selectedMajor);

        // Run script to get HTML after major has been retrieved from storage
        chrome.runtime.sendMessage({
            action: "getSource",
            source: getHtml(selectedMajor)
        });
    });
}

// Reads through HTML and gets class names, prints to popup with concentration
function getHtml(selectedMajor) {
    selectedMajor = selectedMajor.substr(1, selectedMajor.length - 2); // Take quotes off string
    var html = 'Major: ' + selectedMajor + '\n';
    var nodes = document.body.getElementsByClassName('classAbbreviation');

    // Parse html of page
    var l = nodes.length;
    for (var i = 0; i < l; i++) {
        var className = nodes[i].innerHTML;
        className = className.substr(0, className.length - 1); // Take off elipses from class name
        var concentration; // Local variable to hold concentration

        // Finds classes based on major
        switch(selectedMajor) {
            case 'computer-science':
                concentration = computerScience(className);
                break;
            case 'electrical-engineering':
                concentration = electricalEngineering(className);
                break; 
            default:
                concentration = "This major is not yet available.";
        }

        html += (className + ' (' + concentration + ')\n');
    }
    return html;
}

function electricalEngineering (className) {
    var concentration; // Local variable to hold concentration
    var splitName = className.split(" "); // Split string to check for other class types

    switch (className) {
        case 'MATH 1300': case 'MATH 1301': case 'MATH 2300': case 'MATH 2400': case 'MATH 2410': 
        case 'MATH 2420': case 'MATH 2600': case 'MATH 2610': case 'MATH 2810': case 'MATH 2820':
            concentration = "Math";
            break;
        case 'CHEM 1601': case 'CHEM 1601L': case 'CHEM 1602': case 'CHEM 1602L': case 'MSE 1500': 
        case 'MSE 1500L': case 'PHYS 1601': case 'PHYS 1601L': case 'PHYS 1602': case 'PHYS 1602L':
            concentration = "Basic Science";
            break;
        case 'ES 1401': case 'ES 1402': case 'ES 1403': case 'ES 2100W':
            concentration = "Engineering Fundamentals";
            break;
        case 'EECE 4950': case 'EECE 4951': case 'EECE 4959':
            concentration = "Culminating Design Experience";
            break;
        case 'CS 1101': case 'CS 1104': case 'EECE 2123': case 'EECE 2123L': case 'EECE 2213': 
        case 'EECE 2213L': case 'EECE 3214': case 'EECE 3233': case 'EECE 3235': case 'EECE 3235L':
            concentration = "Electrical Engineering Core";
            break;
        case 'EECE 2218': case 'EECE 4376': case 'EECE 4377': case 'CS 3274':
            concentration = "EE Elective: Computer Engineering";
            break;
        case 'EECE 4275': case 'EECE 4385':
            concentration = "EE Elective: Computer Engineering or Microelectronics";
            break;
        case 'ME 4271':
            concentration = "EE Elective: Computer Engineering or Robotics";
            break;
        case 'EECE 4356':
            concentration = "EE ELective: Computer Engineering or Signal/Image Processing";
            break;
        case 'EECE 4283': case 'EECE 4284': case 'EECE 4288': case 'EECE 4380': case 'EECE 4385':
            concentration = "EE Elective: Microelectronics";
            break; 
        case 'BME 3300': case 'BME 3302':
            concentration = "EE Elective: Microelectronics or Signal/Image Processing";
        case 'EECE 4252': case 'EECE 4334':
            concentration = "EE Elective: Signal/Image Processing or Networking and Comm";
            break; 
        case 'EECE 4286': case 'EECE 4353': case 'CS 3258': case 'BME 3600':
            concentration = "EE Elective: Signal/Image Processing";
            break; 
        case 'EECE 4354':
            concentration = "EE Elective: Signal/Image Processing or Robotics";
            break; 
        case 'EECE 4257': case 'EECE 4358':
            concentration = "EE Elective: Robotics";
            break; 
        case 'EECE 4334': case 'EECE 4371':
            concentration = "EE Elective: Networking and Comm";
            break; 
        case 'ENGM 2160': case 'ENGM 2210': case 'ENGM 3000': case 'ENGM 3100': case 'ENGM 3300': 
        case 'ENGM 3650': case 'ENGM 4500': case 'NSC 2201': case 'NSC 3269': case 'NSC 4961': case 'PSY 2100': case 'PSY 3780': 
            concentration = "Technical Elective B";
            break;
        case 'ENGM 3010': case 'ES 3300': case 'NANO 3000': case 'SC 3250': case 'SC 3260': 
            concentration = "Technical Elective A";
            break; 
        default:
            if ((splitName[0] == 'ASTR' && splitName[1] != '1010' && splitName[1] != '1111' && 
            splitName[1] != '2130') || (splitName[0] == 'BSCI' && splitName[1] != '1111') || 
            (splitName[0] == 'CHEM' && splitName[1] != '1010' && splitName[1] != '1020' && 
            splitName[1] != '1601' && splitName[1] != '1602' && splitName[1] != '1111') || 
            (splitName[0] == 'EES' && splitName[1] != '1080' && splitName[1] != '1111' && 
            splitName[1] != '2150') || (splitName[0] == 'MATH' && (parseInt(splitName[1]) >= 2410)) 
            || (splitName[0] == 'PHYS' && (parseInt(splitName[1]) > 2000))) {
                concentration = "Technical Elective B";
            } else if ((splitName[0] == 'BME' && splitName[1] != '2201' && splitName[1] != '2860' 
            && splitName[1] != '3860' && splitName[1] != '3861') || (splitName[0] == 'CHBE' && 
            splitName[1] != '2150' && splitName[1] != '2900W') || (splitName[0] == 'CE' || 
            splitName[0] == 'ENVE' || splitName[0] == 'ME' || splitName[0] == 'EECE' || 
            splitName[0] == 'MSE') || (splitName[0] == 'CS' && splitName[1] != '1000' && 
            splitName[1] != '1101' && splitName[1] != '1103' && splitName[1] != '1104' && 
            splitName[1] != '1151')) {
                concentration = "Technical Elective A";
            } else {
                concentration = "Open Elective";
            }
    }

    return concentration;
}

function computerScience(className) {
    var concentration; // Local variable to hold concentration
    var splitName = className.split(" "); // Split string to check for other class types

    switch(className) {
        case 'MATH 1200': case 'MATH 1201': case 'MATH 1300': case 'MATH 1301': case 'MATH 2300': 
        case 'MATH 2410': case 'MATH 2600': case 'MATH 2500': case 'MATH 2501':
            concentration = "Math: Calculus/Linear Algebra";
            break;
        case 'MATH 2810': case 'MATH 2820': case 'MATH 3640':
            concentration = "Math: Statistics";
            break;
        case 'MATH 2420':
            concentration = "Math: Elective Course";
            break;
        case 'BSCI 1101': case 'BSCI 1101L': case 'BSCI 1510': case 'BSCI 1510L': case 'BSCI 1511': 
        case 'BSCI 1511L': case 'BSCI 2218': case 'BSCI 2219': case 'CHEM 1601': case 'CHEM 1601L': 
        case 'CHEM 1602': case 'CHEM 1602L': case 'MSE 1500': case 'MSE 1500L': case 'PHYS 1601': 
        case 'PHYS 1601L': case 'PHYS 1602': case 'PHYS 1602L':
            concentration = "Science";
            break;
        case 'ES 1401': case 'ES 1402': case 'ES 1403':
            concentration = "Introduction to Engineering";
            break;
        case 'CS 1101': case 'CS 1104': case 'CS 2201': case 'CS 3251': case 'CS 3270': 
            concentration = "CS Core: Software/Problem Solving";
            break;
        case 'EECE 2123': case 'EECE 2123L': case 'CS 3281:': 
            concentration = "CS Core: Hardware/Systems";
            break;
        case 'CS 2212': case 'CS 3250':
            concentration = "CS Core: Foundations";
            break;
        case 'CS 4260': case 'CS 4278': case 'CS 3860': case 'CS 3861':
            concentration = "CS Depth";
            break;
        case 'EECE 4353': case 'EECE 4354': case 'EECE 4376':
            concentration = "CS Depth, Technical Elective";
            break;
        case 'MATH 3320': case 'MATH 3620': case 'MATH 4600': case 'MATH 4620':
            concentration = "Math: Elective, CS Depth, or Technical Elective";
            break;
        case 'CS 3259': case 'CS 3892': case 'CS 4269': case 'CS 4279': case 'CS 4287':
            concentration = "CS Project";
            break;
        case 'CS 4959':
            concentration = "Computer Science Seminar";
            break;
        case 'CS 1151':
            concentration = "Computers and Ethics: Liberal Arts Core";
            break;
        case 'MATH 2610': case 'MATH 2821': 
            concentration = "Math: Elective Course, Technical Elective, or Open Elective"
            break;
        default:
            if ((splitName[0] == 'BME' || splitName[0] == 'CHBE' || splitName[0] == 'CE' || 
            splitName[0] == 'ENVE' || splitName[0] == 'EECE' || splitName[0] == 'ENGM' ||
            splitName[0] == 'ES' || splitName[0] == 'ME' || splitName[0] == 'NANO' || 
            splitName[0] == 'SC') && (parseInt(splitName[1]) >= 2000) && (className != 'BME 2860' 
            && className != 'ENGM 2440' && className != 'ENGM 4800' && className != 'ES 2700' 
            && className != 'ES 3884')) {
                concentration = "Technical Elective or Open Elective";
            } else if (splitName[0] == 'CS' && (parseInt(splitName[1] >= 2000))) {
                concentration = "Technical Elective or Open Elective";
            } else {
                concentration = "Open Elective";
            }
    }

    return concentration;
}

getPage(); 