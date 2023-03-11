import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";
import  NewsApiService from './js/api-service';
import './css/styles.css';

const refs = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
}

const newsApiService = new NewsApiService();

refs.loadMoreBtn.classList.add('hidden');
refs.form.addEventListener('submit', onSearchImages);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

// gallery.on('show.simplelightbox');

function onSearchImages (event) {
    event.preventDefault();
    newsApiService.query = event.currentTarget.elements.searchQuery.value;
    if(newsApiService.query === "") {
     return Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
    }
    refs.loadMoreBtn.classList.add('hidden');
    newsApiService.resetPage();
    newsApiService.fetchImages()
    .then(hits => {
      console.log(hits);
      if(hits.lenght = 0) {
        return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      }
      clearImagesContainer();
      renderGallery(hits);
      refs.loadMoreBtn.classList.remove('hidden');
    })
    .catch((error) => console.log(error));
};

function onLoadMore() {
    newsApiService.fetchImages().then(renderGallery).catch((error) => console.log(error));
};

function clearImagesContainer() {
  refs.gallery.innerHTML = "";
}

function renderGallery(hits) {
    const markup = hits
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


