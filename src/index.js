import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";
import  NewsApiService from './js/api-service';
import scroll from './js/scroll';
import './css/styles.css';




const axios = require('axios').default;
const newsApiService = new NewsApiService();

const refs = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
}

refs.loadMoreBtn.classList.add('hidden');
refs.form.addEventListener('submit', onSearchImages);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});


function onSearchImages (event) {
    event.preventDefault();

    newsApiService.query = event.currentTarget.elements.searchQuery.value;

    if(newsApiService.query === "") {
     return Notiflix.Notify.info("Please enter search parameters.");
    };

      fetchImages(newsApiService.getUrl()).then(response => {
      if(response.totalHits > 40) {
        Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
    }
    refs.loadMoreBtn.classList.remove('hidden');
    newsApiService.resetPage();
    
    clearImagesContainer();
    renderGallery(response.hits);
     
   })
    
};

function onLoadMore() {
  newsApiService.incrementPage();
    fetchImages(newsApiService.getUrl()).then(response => {renderGallery(response.hits);
      scroll();
    }); 
};

function clearImagesContainer() {
  refs.gallery.innerHTML = "";
}

async function fetchImages(url) {
  let data;
  try {
    refs.loadMoreBtn.classList.add('hidden');

    const response = await axios.get(url).then( response => {
      data = response.data;
      if(data.hits.length === 0) {
        return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
      } else if (newsApiService.page*40 >= data.totalHits) {
        return Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
      } else { refs.loadMoreBtn.classList.remove('hidden');}
     
    });

    return data;
  
  } catch (error) {
    console.error(error);
  }
}


function renderGallery(images) {
    const markup = images
    .map(
        ({
          largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
    <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy"/></a> 
    <div class="info">
      <p class="info-item">
        <b>Lakes: ${likes}</b>
      </p>
      <p class="info-item">
        <b>Views: ${views}</b>
      </p>
      <p class="info-item">
        <b>Comments: ${comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads: ${downloads}</b>
      </p>
    </div>
  </div>`; })
  .join("");
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
}

