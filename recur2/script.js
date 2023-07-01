var backgrounds = [
    { name: 'Orange', image: 'https://imagizer.imageshack.com/img923/3342/Ef1fo2.png' },
    { name: 'Blue', image: 'https://imagizer.imageshack.com/img924/6237/cFZTzY.png' }
];

var Styles = [
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
        var option = document.createElement('div');
        option.className = 'category-option';
        option.onclick = function() {
            document.getElementById('background-image').src = this.dataset.image;
            document.getElementById('confirm-button').style.display = 'block'; // Show the confirm button
        };
        option.dataset.image = backgrounds[i].image;

        var img = document.createElement('img');
        img.src = backgrounds[i].image;
        img.alt = backgrounds[i].name;

        option.appendChild(img);
        backgroundsDiv.appendChild(option);
    }
}

function updateStyles() {
var StylesDiv = document.getElementById('styles');
StylesDiv.innerHTML = '';

for (var i = 0; i < Styles.length; i++) {
var option = document.createElement('div');
option.className = 'category-option';
option.onclick = function() {
    document.getElementById('body-image').src = this.dataset.image;
    document.getElementById('body-image').style.display = 'block'; // Add this line
    document.getElementById('confirm-button').style.display = 'block'; // Show the confirm button
};
option.dataset.image = Styles[i].image;

var img = document.createElement('img');
img.src = Styles[i].image;
img.alt = Styles[i].name;

option.appendChild(img);
StylesDiv.appendChild(option);
}

StylesDiv.parentElement.style.display = 'block'; // Show the body style options
}

window.addEventListener('DOMContentLoaded', function() {
    updateBackgrounds();
    updateStyles();
});

var tabs = new Tabby('[data-tabs]');

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
        });
    });    