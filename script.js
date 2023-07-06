var stackedImageURL;
var selectedImages = {};
var inscribeButton;


window.onload = function() {
    inscribeButton = document.getElementById('inscribe-button');
    initializeDraggableWindow();
    centerWindow();
    initializeStartMenu();
    initializeTabButtons();
    initializeActionButtons();
    initializeCloseButton(); // Add this line
  
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
  var draggie = new Draggabilly('.window', {
    handle: '.window-toolbar'
  });
}


function centerWindow() {
  var windowElement = document.querySelector('.window');
  windowElement.style.top = '50%';
  windowElement.style.left = '50%';
  windowElement.style.transform = 'translate(-50%, -50%)';
}

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
  
  window.onload = function() {
    // Initialize Draggabilly for the initial window
    var initialWindow = document.querySelector('.window');
    initializeDraggable(initialWindow);
  
    centerWindow();
    initializeStartMenu();
    initializeTabButtons();
    initializeActionButtons();
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




  document.getElementById('documents-icon').addEventListener('dblclick', function() {
    document.getElementById('doc-window').style.display = 'block';

    // Show the Documents window
    documentsWindow.style.display = 'block';

    // Center the Documents window
    centerWindow();
  });

  var docWindow = document.querySelector('#doc-window'); // Replace '#doc-window' with the actual selector for the new window
    initializeDraggable(docWindow);

    docWindow.querySelector('.window-button.close').addEventListener('click', function() {
        docWindow.style.display = 'none';
    });

    docWindow.querySelector('.window-button.help').addEventListener('click', function() {
        // Code for what happens when the help button is clicked goes here
    });
    // ...

  
  function openCompiledCodeWindow(compiledCode) {
    // Create a new div element
    var newWindow = document.createElement('div');

    // Add classes to the div to style it like a window
    newWindow.classList.add('window');
    newWindow.classList.add('active');

    // Set the inner HTML of the div
    newWindow.innerHTML = `
    <div class="window-toolbar" style="display: flex; justify-content: space-between; align-items: center;">
        <div class="window-title">Compiled Code</div>
        <button class="window-button close button custom-close-button" id="close-button" style="width: 5px; height: 20px; padding: 0;"></button>
    </div>
    <div class="window-content" style="padding: 20px;">
        <textarea id="svg-code-textarea" style="width: 100%; height: 80%; padding: 10px;">${compiledCode}</textarea>
        <div style="display: flex; justify-content: center; margin-top: 20px;">
            <a href="data:image/svg+xml;charset=utf-8,${encodeURIComponent(compiledCode)}" download="code.svg">
                <button id="download-button" style="width: 150px; padding: 10px;">Download</button>
            </a>
            <button id="inscribe-button" style="width: 150px; padding: 10px;" onclick="window.open('https://unisat.io/inscribe', '_blank')">Inscribe</button>
        </div>
    </div>
    `;

    // Append the new window to the desktop
    document.getElementById('desktop').appendChild(newWindow);

    // Calculate the center position of the window
    var windowWidth = newWindow.offsetWidth;
    var windowHeight = newWindow.offsetHeight;
    var windowLeft = (window.innerWidth - windowWidth) / 2;
    var windowTop = (window.innerHeight - windowHeight) / 2;

    // Set the position of the window
    newWindow.style.left = windowLeft + 'px';
    newWindow.style.top = windowTop + 'px';

    // Initialize Draggabilly for the new window
    initializeDraggable(newWindow);

    // Add an event listener to the close button
    document.getElementById('close-button').addEventListener('click', function() {
        // Remove the new window from the webpage
        newWindow.remove();
    });

    // Add an event listener to the copy button
    document.getElementById('copy-button').addEventListener('click', function() {
        // Select the SVG code
        var svgCodeTextarea = document.getElementById('svg-code-textarea');
        svgCodeTextarea.select();

        // Copy the SVG code to the clipboard
        document.execCommand('copy');
    });
}

  



    // Append the new window to the desktop
    document.getElementById('desktop').appendChild(newWindow);

    // Add an event listener to the close button
    document.getElementById('close-button').addEventListener('click', function() {
        // Remove the new window from the webpage
        newWindow.remove();
    });

    // Add an event listener to the copy button
    document.getElementById('copy-button').addEventListener('click', function() {
        // Select the SVG code
        var svgCodeTextarea = document.getElementById('svg-code-textarea');
        svgCodeTextarea.select();

        // Copy the SVG code to the clipboard
        document.execCommand('copy');
    });


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
  // Add a click event listener to the button
  inscribeButton.addEventListener('click', function() {
    // Open the external website in a new window
    window.open('https://www.external-website.com', '_blank');
  });
  console.log('Inscribe button clicked');
}

let date = new Date();

setInterval(function() {
  document.querySelector('.time').innerText = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}, 1000);

document.addEventListener('DOMContentLoaded', function() {
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
