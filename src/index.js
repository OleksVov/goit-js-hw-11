import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";
import  NewsApiService from './js/api-service';

const refs = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
}

const newsApiService = new NewsApiService();
// const KEY_API = '34240691-69b0febad4566a0b07df5e473';
// const BASE_URL = 'https://pixabay.com/api/';
let valueForSearch = "";

refs.form.addEventListener('submit', onSearchImages);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearchImages (event) {
    event.preventDefault();
    valueForSearch = event.currentTarget.elements.searchQuery.value;
    newsApiService.fetchImages(valueForSearch);

    // .then(images => renderGallery(images.hits))
    // .catch((error) => console.log(error));
};

function onLoadMore() {
    newsApiService.fetchImages(valueForSearch);
};



function renderGallery(images) {
    const markup = images
    .map(
        ({
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
}


