export default class NewsApiService {
    constructor() {
        this.valueForSearch = "";
        this.page = 1;
        this.KEY_API = '34240691-69b0febad4566a0b07df5e473';
        this.BASE_URL = 'https://pixabay.com/api/';
    }

    fetchImages () {
    return fetch(`https://pixabay.com/api/?key=${this.KEY_API}&q=${this.valueForSearch}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)
    .then(response => response.json())
    .then(({hits}) => {

        this.incrementPage();
       return hits;
    })
}

incrementPage() {
    this.page +=1;
}

resetPage() {
    this.page = 1;
}
    
    get query() {
        return this.valueForSearch;
    }

    set query(newQuery) {
        this.valueForSearch = newQuery;
    }
};