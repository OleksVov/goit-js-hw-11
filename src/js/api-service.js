export default class NewsApiService {
    constructor() {}

    fetchImages (valueForSearch ) {
    const KEY_API = '34240691-69b0febad4566a0b07df5e473';
    const BASE_URL = 'https://pixabay.com/api/';
    fetch(`https://pixabay.com/api/?key=${KEY_API}&q=${valueForSearch}&image_type=photo&orientation=horizontal&safesearch=true`)
    .then(response => response.json())
    .then(images => console.log(images))}
    
};