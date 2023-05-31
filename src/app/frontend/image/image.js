const points = document.querySelectorAll('.point');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;
var images = [
    "src/assets/frontend/image/image3.png",
    "src/assets/frontend/image/image2.png",
    "src/assets/frontend/image/image1.png"
  ];

nextBtn.addEventListener('click', () => {
	points[currentIndex].classList.remove('active');
	currentIndex = (currentIndex + 1) % points.length;
	points[currentIndex].classList.add('active');

      var backgroundImage = "url('" + images[currentIndex] + "')";

      document.getElementById("background").style.backgroundImage = backgroundImage;

      if (currentIndex === 2) {
        document.getElementById('btn').style.display = 'block';
    } else {
        document.getElementById('btn').style.display = 'none';
    }

});
function displayCategoryImage() {
    var category = document.querySelector(".categories").value;
    var categoryImage = document.getElementById(category);
    var categoryImages = document.querySelectorAll(".category-image");

    for (var i = 0; i < categoryImages.length; i++) {
      categoryImages[i].style.display = "none";
    }

    categoryImage.style.display = "block";
  }
