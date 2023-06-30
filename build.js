function generateNFT() {
    var color = document.getElementById('color').value;
    var size = document.getElementById('size').value;

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    var sizeInPixels;
    if (size === 'small') {
        sizeInPixels = 50;
    } else if (size === 'medium') {
        sizeInPixels = 100;
    } else if (size === 'large') {
        sizeInPixels = 150;
    }

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, sizeInPixels, sizeInPixels);

    var img = document.createElement('img');
    img.src = canvas.toDataURL();
    document.body.appendChild(img);
}
