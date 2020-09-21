'use strict';

var allProduct = [];
var currentImageRow = [];
var leftSideImageElement = document.getElementById('left_img');
var middelImageElement = document.getElementById('middel_img');
var rightSideImageElement = document.getElementById('right_img');

var imagesSection = document.getElementById('images');

var currentLeftSideImage;
var currentMiddelSideImage;
var currentRightSideImage;

var totalClicks = 0;

var resultsList = document.getElementById('finalResult');



////// For Chart //////
var arrayNames =[];
var arrayVotes =[];
var arrayDisplayTime =[];
var backgroundColor = [];
var borderColor = [];

////

// constructor
function ProductImage(ProductName, link) {
  this.ProductName = ProductName;
  this.link = link;
  this.votes = 0;
  this.timesDisplayed = 0;
  allProduct.push(this);

}

new ProductImage('bag', 'img/bag.jpg');
new ProductImage('banana', 'img/banana.jpg');
new ProductImage('bathroom', 'img/bathroom.jpg');
new ProductImage('boots', 'img/boots.jpg');
new ProductImage('breakfast', 'img/breakfast.jpg');
new ProductImage('bubblegum', 'img/bubblegum.jpg');
new ProductImage('chair', 'img/chair.jpg');
new ProductImage('cthulhu', 'img/cthulhu.jpg');
new ProductImage('dog-duck', 'img/dog-duck.jpg');
new ProductImage('dragon', 'img/dragon.jpg');
new ProductImage('pen', 'img/pen.jpg');
new ProductImage('pet-sweep', 'img/pet-sweep.jpg');
new ProductImage('scissors', 'img/scissors.jpg');
new ProductImage('shark', 'img/shark.jpg');
new ProductImage('sweep', 'img/sweep.png');
new ProductImage('tauntaun', 'img/tauntaun.jpg');
new ProductImage('unicorn', 'img/unicorn.jpg');
new ProductImage('usb', 'img/usb.gif');
new ProductImage('water-can', 'img/water-can.jpg');
new ProductImage('wine-glass', 'img/wine-glass.jpg');

var leftImageIndex = Math.floor((Math.random() * allProduct.length));
var middelImageIndex = generateRandom(leftImageIndex, rightImageIndex, -1, -1, -1);
var rightImageIndex = generateRandom(-1, leftImageIndex, -1, -1, -1);


function displayRandomImages() {

  leftImageIndex = generateRandom(currentImageRow[0], currentImageRow[1], currentImageRow[2], -1, -1);
  middelImageIndex = generateRandom(currentImageRow[0], currentImageRow[1], currentImageRow[2], -1, leftImageIndex);
  rightImageIndex = generateRandom(currentImageRow[0], currentImageRow[1], currentImageRow[2], middelImageIndex, leftImageIndex);
  currentImageRow[0] = leftImageIndex;
  currentImageRow[1] = rightImageIndex;
  currentImageRow[2] = middelImageIndex;

  displayImages(leftImageIndex, middelImageIndex, rightImageIndex);
}

function generateRandom(FirstImage, SeconedImage, ThirdImage, CurFirstImg, CurSecImage) {
  var num = Math.floor(Math.random() * (allProduct.length - 0)) + 0;
  return (num === FirstImage || num === SeconedImage || num === ThirdImage || num === CurFirstImg || num === CurSecImage) ? generateRandom(FirstImage, SeconedImage, ThirdImage, CurFirstImg, CurSecImage) : num;
}


function displayImages(leftIndex, MiddelIndex, rightIndex) {
  currentLeftSideImage = allProduct[leftIndex];
  currentMiddelSideImage = allProduct[MiddelIndex];
  currentRightSideImage = allProduct[rightIndex];

  currentLeftSideImage.timesDisplayed++;
  currentMiddelSideImage.timesDisplayed++;
  currentRightSideImage.timesDisplayed++;

  leftSideImageElement.setAttribute('src', currentLeftSideImage.link);
  middelImageElement.setAttribute('src', currentMiddelSideImage.link);
  rightSideImageElement.setAttribute('src', currentRightSideImage.link);
}

displayRandomImages();

imagesSection.addEventListener('click', handleVote);

function handleVote(event) {
  var clickedImage;

  if (event.target.id === 'left_img') {
    clickedImage = currentLeftSideImage;
  } else if (event.target.id === 'right_img') {
    clickedImage = currentRightSideImage;
  } else if (event.target.id === 'middel_img') {
    clickedImage = currentMiddelSideImage;
  }



  if (clickedImage) {
    clickedImage.votes++;
    displayRandomImages();
    totalClicks++;
  }

  if (totalClicks >= 25) {
    imagesSection.removeEventListener('click', handleVote);
    displayResults();
    canvasChart();
  }
}

function displayResults() {
  var listItem;
  for (var i = 0; i < allProduct.length; i++) {
    listItem = document.createElement('li');
    // listItem.textContent = allProduct[i].ProductName + 'Slicer' + allProduct[i].timesDisplayed+ ' and votes are ' + allProduct[i].votes;
    listItem.textContent = allProduct[i].ProductName + 'Slicer had ' + allProduct[i].votes + ' Votes and was shown ' + allProduct[i].timesDisplayed + 'Times';
    resultsList.appendChild(listItem);
  }
}

function canvasChart() {
  getingobjectsName();
  getingobjectsVotes();
  getingobjectsDisplayTime();

  // For every data we have ...
  for (var i = 0; i < allProduct.length; i++) {

    // We generate a random color
    var color = "rgba(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ",";

    // We push this new color to both background and border color arrays
    // .. a lighter color is used for the background
    backgroundColor.push(color + "0.2)");
    borderColor.push(color + "1)");
}

  var ctx = document.getElementById('myChart');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: arrayNames,
      datasets: [{
        label: '# of Votes',
        data: arrayVotes,
        backgroundColor: backgroundColor,
        borderColor:borderColor,
        borderWidth: 1
      },{label: '# Display Time',
        data: arrayDisplayTime,
        backgroundColor: backgroundColor,
        borderColor:borderColor,
        borderWidth: 1}]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });


}


function getingobjectsName(){

  arrayNames =[];

  for(var i=0;i<allProduct.length;i++){

    arrayNames[i]=allProduct[i].ProductName;
  }

}



function getingobjectsVotes(){

  arrayVotes =[];

  for(var i=0;i<allProduct.length;i++){

    arrayVotes[i]=allProduct[i].votes;
  }

}


function getingobjectsDisplayTime(){

  arrayDisplayTime =[];

  for(var i=0;i<allProduct.length;i++){

    arrayDisplayTime[i]=allProduct[i].timesDisplayed;
  }

}


