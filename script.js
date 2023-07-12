var stackedImageURL;
var selectedImages = {};
var inscribeButton;


window.onload = function() {
    // Initialize Draggabilly for the initial window
    inscribeButton = document.getElementById('inscribe-button');
    var initialWindow = document.querySelector('.window');
    var windows = document.querySelectorAll('.window');
    initializeDraggableWindow();
    initializeStartMenu();
    initializeTabButtons();
    initializeActionButtons();
    initializeCloseButton();

    var pixlbuilderWindow = document.querySelector('#pixlbuilder-window');
    var draggie = new Draggabilly(pixlbuilderWindow, {
        handle: '.window-toolbar'
    });

    draggie.on('dragEnd', function() {
        pixlbuilderWindow.classList.remove('active');
    });

    // Initialize Draggabilly for each window
    windows.forEach(function(window) {
        new Draggabilly(window, {
            handle: '.window-toolbar'
        });
    });
        
  
        // Add an event listener to the close button
        document.getElementById('active-window-close-button').addEventListener('click', function() {
        // Get the active window
        var activeWindow = document.querySelector('.window.active');

        // Remove the active window
        if (activeWindow) {
        activeWindow.style.display = 'none'; // hides the window
        // or
        // activeWindow.remove(); // completely removes the window from the DOM
    }
  });
}
  
  // Add this function
  function initializeCloseButton() {
    document.getElementById('active-window-close-button').addEventListener('click', function() {
      // Get the active window
      var activeWindow = document.querySelector('.window.active');
  
      if (activeWindow) {
          activeWindow.remove();
      }
    });
  }
  

  function initializeDraggableWindow() {
    var windows = document.querySelectorAll('.window');
    windows.forEach(function(window) {
        new Draggabilly(window, {
            handle: '.window-toolbar'
        });
    });
}


function centerWindow(windowElement) {
    setTimeout(function() {
      var windowHeight = windowElement.offsetHeight;
      var windowWidth = windowElement.offsetWidth;
  
      windowElement.style.top = `calc(50% - ${windowHeight / 2}px)`;
      windowElement.style.left = `calc(50% - ${windowWidth / 2}px)`;
    }, 0);
}

var myWindow = document.querySelector('#pixlbuilder-window');
centerWindow(myWindow);


function initializeStartMenu() {
  document.getElementById('start-menu-wrapper').style.display = 'none';
  document.getElementById('start-button').addEventListener('click', toggleStartMenu);
}

function toggleStartMenu() {
  var startMenu = document.getElementById('start-menu-wrapper');
  if (startMenu.style.display === "none") {
    startMenu.style.display = "block";
  } else {
    startMenu.style.display = "none";
  }
}

function initializeTabButtons() {
  document.querySelectorAll('.tabs-button').forEach(function(tabButton) {
    tabButton.addEventListener('click', function() {
      var tab = this.dataset.tab;

      // Hide all tab content divs
      document.querySelectorAll('.tab-content').forEach(function(tabContent) {
        tabContent.style.display = 'none';
      });

      // Show the clicked tab's content
      document.getElementById(tab).style.display = 'block';

      // Remove the 'active' class from all tabs
      document.querySelectorAll('.tabs-button').forEach(function(tabButton) {
        tabButton.classList.remove('active');
      });

      // Add the 'active' class to the clicked tab
      this.classList.add('active');

      // If the 'background' tab is clicked, add the event listener to the images
      if (tab === 'background' || tab === 'base' || tab === 'clothing' || tab === 'headwear' || tab === 'eyewear') {
        initializeGridImages();
      }
    });
  });
}

function initializeGridImages() {
    var images = document.querySelectorAll('.grid-image');
    images.forEach(function(image) {
      image.addEventListener('click', function() {
        images.forEach(function(img) {
          img.classList.remove('selected');
        });
        this.classList.add('selected');
        var tab = document.querySelector('.tabs-button.active').dataset.tab;
        if (tab !== 'none') {
          selectedImages[tab] = this.getAttribute('src');
        }
        updateCenteredImages(); // Update the other layers
      });
    });
  }
  

function updateCenteredImage() {
    var activeTab = document.querySelector('.tabs-button.active').dataset.tab;
  
    // Get the corresponding image element based on the active tab
    var centeredImage;
    switch (activeTab) {
      case 'background':
        centeredImage = document.getElementById('background-image');
        break;
      case 'base':
        centeredImage = document.getElementById('base-image');
        break;
      case 'clothing':
        centeredImage = document.getElementById('clothing-image');
        break;
      case 'headwear':
        centeredImage = document.getElementById('headwear-image');
        break;
      case 'eyewear':
        centeredImage = document.getElementById('eyewear-image');
        break;
      default:
        centeredImage = document.getElementById('centered-image');
    }
  
    // Set the source of the corresponding image element to the selected image
    centeredImage.src = selectedImages[activeTab];
  }
  
  function initializeActionButtons() {
    document.getElementById('compile-button').addEventListener('click', compileSVG);
    document.getElementById('clear-button').addEventListener('click', clearSVG);
    document.getElementById('inscribe-button').addEventListener('click', inscribeSVG);
}

function compileSVG() {
    var selectedBackground = selectedImages.background || '';
    var selectedBase = selectedImages.base || '';
    var selectedClothing = selectedImages.clothing || '';
    var selectedHeadwear = selectedImages.headwear || '';
    var selectedEyewear = selectedImages.eyewear || '';

    var svgCode = '<svg width="360px" height="360px" xmlns="http://www.w3.org/2000/svg">';
    svgCode += '<image href="/content/' + selectedBackground + '" />';
    svgCode += '<image href="/content/' + selectedBase + '" />';
    svgCode += '<image href="/content/' + selectedClothing + '" />';
    svgCode += '<image href="/content/' + selectedHeadwear + '" />';
    svgCode += '<image href="/content/' + selectedEyewear + '" />';
    svgCode += '</svg>';

    openCompiledCodeWindow(svgCode);
}

  
// New function to initialize Draggabilly for a specific element
function initializeDraggable(element) {
    new Draggabilly(element, {
      handle: '.window-toolbar'
    });
  }

    // Get the Pixlbuilder window and close button elements
    var pixlbuilderWindow = document.getElementById('pixlbuilder-window');
    var closeButton = pixlbuilderWindow.querySelector('.window-button.close');

    // Add an event listener to the Pixlbuilder desktop icon to show the Pixlbuilder window when double clicked
    document.getElementById('pixlbuilder-icon').addEventListener('dblclick', function() {
        pixlbuilderWindow.style.display = 'block';
    });

    // Add an event listener to the close button to hide the Pixlbuilder window when clicked
    closeButton.addEventListener('click', function() {
        pixlbuilderWindow.style.display = 'none';
    });


// Example event handler for double-clicking the document icon
document.getElementById("documents-icon").addEventListener("dblclick", function() {
    // Set the desired starting position
    var topPosition = 100;  // in pixels
    var leftPosition = 200; // in pixels
    
    // Get the window element
    var windowElement = document.getElementById("doc-window");
    
    // Modify the CSS properties
    windowElement.style.top = topPosition + "px";
    windowElement.style.left = leftPosition + "px";
    
    // Show the window
    windowElement.style.display = "block";
  });

  var docWindow = document.querySelector('#doc-window'); // Replace '#doc-window' with the actual selector for the new window
    initializeDraggable(docWindow);

    docWindow.querySelector('.window-button.close').addEventListener('click', function() {
        docWindow.style.display = 'none';
    });

  
    function openCompiledCodeWindow(compiledCode) {
        // Create a new div element
        var newWindow = document.createElement('div');
    
        // Add classes to the div to style it like a window
        newWindow.classList.add('window');
    
        // Set the inner HTML of the div
        newWindow.innerHTML = document.getElementById('compiled-code-window').innerHTML;
    
        // Append the new window to the desktop
        document.getElementById('desktop').appendChild(newWindow);
    
        // Calculate the center position of the window based on the current viewport size
        var windowWidth = newWindow.offsetWidth;
        var windowHeight = newWindow.offsetHeight;
        var windowLeft = (window.innerWidth - windowWidth) / 2;
        var windowTop = (window.innerHeight - windowHeight) / 2;
    
        // Adjust the window position if it goes beyond the viewport boundaries
        if (windowLeft < 0) {
            windowLeft = 0;
        } else if (windowLeft + windowWidth > window.innerWidth) {
            windowLeft = window.innerWidth - windowWidth;
        }
        if (windowTop < 0) {
            windowTop = 0;
        } else if (windowTop + windowHeight > window.innerHeight) {
            windowTop = window.innerHeight - windowHeight;
        }
    
        // Set the position of the window
        newWindow.style.left = windowLeft + 'px';
        newWindow.style.top = windowTop + 'px';
    
        // Initialize Draggabilly for the new window
        initializeDraggable(newWindow);
    
        // Add an event listener to the close button
        newWindow.querySelector('#close-button').addEventListener('click', function() {
            // Remove the new window from the webpage
            newWindow.remove();
        });
    }
    
    




function clearSVG() {
    // Clear all selected images except the placeholder image
    var images = document.querySelectorAll('.grid-image');
    images.forEach(function(image) {
      if (!image.classList.contains('tab-image')) {
        image.classList.remove('selected');
      }
    });
    selectedImages = {};
    updateCenteredImages(); // Update all the centered image containers
  }
  
  function updateCenteredImages() {
    // Get all the centered image elements
    var centeredImages = document.querySelectorAll('.centered-image');
  
    // Loop through each centered image element
    centeredImages.forEach(function(centeredImage) {
      // Get the corresponding tab for the centered image
      var tab = centeredImage.dataset.tab;
  
      // Check if it is the first "centered-image" element
      if (centeredImage.classList.contains('centered-image') && tab === 'none') {
        centeredImage.src = '/images/placeholder.png';
      } else {
        centeredImage.src = selectedImages[tab] || '/images/clothing/none.png';
      }
    });
  }

  function inscribeSVG() {
    // Open the external website in a new window
    window.open('https://www.external-website.com', '_blank');
    console.log('Inscribe button clicked');
}

let date = new Date();

setInterval(function() {
  document.querySelector('.time').innerText = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}, 1000);

document.addEventListener('DOMContentLoaded', function() {
    centerWindow();
    document.querySelector('#pixlbuilder-window .close').addEventListener('click', function() {
        // Get the Pixlbuilder window
        var pixlbuilderWindow = document.getElementById('pixlbuilder-window');

        // Hide the Pixlbuilder window
        pixlbuilderWindow.style.display = 'none';
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    // Get all images in the grid
    var images = document.querySelectorAll('.grid-image');
  
    // Add a click event listener to each image
    images.forEach(function(image) {
      image.addEventListener('click', function() {
        // Remove the 'selected' class from all images
        images.forEach(function(img) {
          img.classList.remove('selected');
        });
  
        // Add the 'selected' class to the clicked image
        this.classList.add('selected');
  
        // Get the source of the clicked image
        var src = this.getAttribute('src');
  
        // Get the centered image
        var centeredImage = document.getElementById('centered-image');
  
        // Update the source of the centered image
        centeredImage.setAttribute('src', src);
      });
  // Get a reference to the inscribe button element
  const inscribeButton = document.getElementById('inscribe-button');

  document.querySelector('#pixlbuilder-window .close').addEventListener('click', function() {
    // Get the Pixlbuilder window
    var pixlbuilderWindow = document.getElementById('pixlbuilder-window');

    // Hide the Pixlbuilder window
    pixlbuilderWindow.style.display = 'none';
            });
        });
    });

    // Example of adding a class to an element
var pixlbuilderWindow = document.querySelector('#pixlbuilder-window');
pixlbuilderWindow.classList.add('active');

// Log a message to the console
console.log('Added active class to pixlbuilder-window');

// Example of removing a class from an element
pixlbuilderWindow.classList.remove('active');

// Log a message to the console
console.log('Removed active class from pixlbuilder-window');



document.getElementById('pixlbuilder-button').addEventListener('click', function() {
  pixlbuilderWindow.style.display = 'block';
});

document.getElementById('info-button').addEventListener('click', function() {
  documentsWindow.style.display = 'block';
});



function openWindow(windowId) {
  // Get all windows
  var windows = document.getElementsByClassName('window');

  // Hide all windows
  for (var i = 0; i < windows.length; i++) {
    windows[i].style.display = 'none';
  }

  // Show the clicked window
  document.getElementById(windowId).style.display = 'block';
}
