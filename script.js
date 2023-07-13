document.addEventListener('DOMContentLoaded', function() {
    // Existing code
    var elem = document.querySelector('.window');
    var draggie = new Draggabilly( elem );

    var elems = document.querySelectorAll('.window');
    var highestZIndex = 0;  // Keep track of the highest z-index

    for (var i = 0; i < elems.length; i++) {
        if (elems[i]) {
            var draggie = new Draggabilly(elems[i], {
                handle: '.header'
            });

            // When the element is clicked, bring it to the front
            draggie.on('pointerDown', function() {
                highestZIndex++;
                this.element.style.zIndex = highestZIndex;
            });

            // Add a separate event listener for mousedown to the entire window
            elems[i].addEventListener('mousedown', function() {
                highestZIndex++;
                this.style.zIndex = highestZIndex;
            });
        }
    }

    var startButtonInput = document.getElementById('start-button-input');
    var overlay = document.getElementById('overlay');

    // Show the overlay when the start menu is opened
    startButtonInput.addEventListener('change', function() {
        if (startButtonInput.checked) {
            overlay.style.display = 'block';
        } else {
            overlay.style.display = 'none';
        }
    });

    // Close the start menu when clicking outside of it
    var desktop = document.getElementById('desktop');
    var allWindows = document.getElementById('all-windows');

    [desktop, allWindows].forEach(function(element) {
        element.addEventListener('click', function() {
            if (startButtonInput.checked) {
                startButtonInput.checked = false;
                overlay.style.display = 'none';
            }
        });
    });

    // New code
    // Get all tab buttons
    const tabButtons = document.querySelectorAll('.window-tabs .tabs-button');

    // Get all tab content divs
    const tabContents = document.querySelectorAll('.tab-content');

    console.log(tabButtons); // Log the tab buttons to see if they're being selected correctly
    console.log(tabContents); // Log the tab contents to see if they're being selected correctly

    // Function to hide all tab content
    function hideAllTabContent() {
        tabContents.forEach(tabContent => {
            tabContent.style.display = 'none';
        });
    }

    // Function to remove the 'active' class from all tab buttons
    function removeActiveClassFromTabs() {
        tabButtons.forEach(tabButton => {
            tabButton.classList.remove('active');
        });
    }

    // Add click event listener to each tab button
    tabButtons.forEach(tabButton => {
        tabButton.addEventListener('click', function(event) {
            console.log('Tab button clicked'); // Log when a tab button is clicked

            // Prevent the default action
            event.preventDefault();

            // Hide all tab content
            hideAllTabContent();

            // Remove the 'active' class from all tab buttons
            removeActiveClassFromTabs();

            // Show the content of the clicked tab
            const tabContent = document.querySelector('#' + this.dataset.tab);
            console.log(tabContent); // Log the tab content to see if it's being selected correctly
            tabContent.style.display = 'block';

            // Add the 'active' class to the clicked tab button
            this.classList.add('active');
        });
    });
});
