# Vandy-ClassFinder

Chrome extension that tells students what part of their major is being fulfilled by each class shown on YES. This project was created during VandyHacks Summer edition by Alex, Claire, and Hadley. 

## Select a major:
The Chrome extension uses a major, provided by you, to determine which requirements of that major each class on your YES page meets. 
* Right click the *Vandy Class Finder* extension
* Select options
* Using the dropdown, pick your major
* Hit save

### To install the Chrome extension:
* Clone the repository onto your local machine into a known directory
* Open a new Google Chrome browser, and navigate to the [extension management page](chrome://extensions)
* In the upper right corner, toggle *Developer Mode*
* Click on the *Load unpacked* button in the upper left corner, and select the extension's directory

### To pin the Chrome extension to the taskbar:
* Click the Puzzle piece in the taskbar
* Pin the *Vandy Class Finder* extension

### To re-load the Chrome extension after making a change:
* Reload the [extension management page](chrome://extensions), and Chrome will reload the extension

### To see the action of the Chrome extension:
* Click on the Vanderbilt icon in the pinned tab bar

### To be continued:
* Connect major set in options to selectedMajor in sourcePage.js
* Replace switch statement with variable that returns value from parsing through Excel function
* Add majors outside of engineering
* Connect *updated class details* button to popup