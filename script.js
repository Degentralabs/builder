var backgrounds = [
    { name: 'Orange', image: 'https://imagizer.imageshack.com/img923/3342/Ef1fo2.png' },
    { name: 'Blue', image: 'https://imagizer.imageshack.com/img924/6237/cFZTzY.png' }
];

var styles = [
    { name: 'Ape', image: 'https://imagizer.imageshack.com/img924/918/uJtYfd.png' },
    { name: 'Zombie', image: 'https://imagizer.imageshack.com/img922/4089/DOiRVT.png' }
];

var body = [
    { name: 'Ape', image: 'https://imagizer.imageshack.com/img924/918/uJtYfd.png' },
    { name: 'Zombie', image: 'https://imagizer.imageshack.com/img922/4089/DOiRVT.png' }
];

function updateBackgrounds() {
    var backgroundsDiv = document.getElementById('backgrounds-grid');
    backgroundsDiv.innerHTML = '';

    for (var i = 0; i < backgrounds.length; i++) {
        var div = document.createElement('div');
        div.className = 'category-option';
    
        var img = document.createElement('img');
        img.src = backgrounds[i].image;
    
        // Add event listener to the image
        img.addEventListener('click', function() {
            // Get the compiler image element
            var compilerImage = document.getElementById('background-image');
    
            // Set the source of the compiler image to the source of the clicked image
            compilerImage.src = this.src;
        });
    
        div.appendChild(img);
        backgroundsDiv.appendChild(div);
    }       
}

window.addEventListener('DOMContentLoaded', function() {
    updateBackgrounds();
    // ... any other initialization code ...
});   

    function updateStyles() {
        var stylesDiv = document.getElementById('styles-grid'); // Change 'styles' to 'styles-grid'
        stylesDiv.innerHTML = '';
    
        for (var i = 0; i < Styles.length; i++) {
            var img = document.createElement('img');
            img.src = Styles[i].image;
            stylesDiv.appendChild(img);
        
            console.log('Styles:', document.getElementById('styles-grid').innerHTML);
            console.log('Style images:', styles.map(function(style) { return style.image; }));
        }    
    } // Closing bracket for updateStyles function
    
    window.addEventListener('DOMContentLoaded', function() {
        updateBackgrounds();
        updateStyles();
        
        // Show content for default tab
        var defaultTabContent = document.querySelector('.tab-content > div[data-tabby-default]');
        if (defaultTabContent) {
            defaultTabContent.style.display = 'block';
        }
    }); // Closing bracket for event listener    

var tabs = new Tabby('[data-tabs]');

    // Add event listener for tab switching
// Add event listener for tab switching
var tabLinks = document.querySelectorAll('.tabs a');
tabLinks.forEach(function(tabLink) {
    tabLink.addEventListener('click', function(event) {
        event.preventDefault();

        // Remove active class from all tabs
        tabLinks.forEach(function(tabLink) {
            tabLink.classList.remove('active');
        });

        // Add active class to clicked tab
        this.classList.add('active');

        // Hide all tab content
        var tabContents = document.querySelectorAll('.tab-content > div');
        tabContents.forEach(function(tabContent) {
            tabContent.style.display = 'none';
        });

        // Show content for clicked tab
        var tabContent = document.querySelector(this.getAttribute('href'));
        tabContent.style.display = 'block';

        // If the "Backgrounds" tab is clicked, update the backgrounds
        if (this.getAttribute('href') === '#backgrounds') {
            updateBackgrounds();
        }
    });
});
