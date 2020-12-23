const imageContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true;

// Unsplash API
let count = 5; 
const apiKey = "fg-T9iGzjtWyRUKX2ttv1FFvHsGURyBf0rGUiucIquU";
let apiURrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

const updateAPIURLWithNewCount = (newCount) => {
  apiURrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${newCount}`;
}

// Get photos from Unsplash API
const getPhotos = async () => {
  try {
    const response = await fetch(apiURrl);
    photosArray = await response.json();
    totalImages = photosArray.length;
    renderPhotos();
    if (isInitialLoad) {
      updateAPIURLWithNewCount(30);
      isInitialLoad = false;
    }
  } catch (error) {
    // Catch Error Here
  }
};

// Check if all requested images loaded
const imageLoaded = () => {
  imagesLoaded++;
  console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}


// Create Elements For Links & Photos, Add to DOM
const renderPhotos = () => {
  // Render photos in photosArray as <img> tags inside <a> tags
  photosArray.forEach(p => {
    imageContainer.innerHTML += `<a href="${p.links.html}" target="_blank"><img src="${p.urls.regular}" alt="${p.alt_description}" title="${p.alt_description}" /></a>`;
  });

  // Add event listener to each <img> tag
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', imageLoaded);
  })
};

// Check to see if scrolling near the bottom of the page
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
})

// On Load
getPhotos();
