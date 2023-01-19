import { refs } from './refs';
import { getData } from './getData';
import { markupCard } from './markup';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let gallery = new SimpleLightbox('.gallery a');
let value = '';
let page = 1;



const guard = document.querySelector('.js-guard');


const options = {
  root: null,
  rootMargin: '300px',
  threshold: 0
}

let totalImg = 0;
let totalPage = 0; 
// const observer = new IntersectionObserver(infiniteScroll, options);

async function onSubmit(evt) {
  evt.preventDefault();
  value = evt.target.searchQuery.value.trim();
  refs.loadMore.classList.add('is-hidden');
  page = 1;
  if (!value) {
    Notiflix.Notify.warning('Please enter a keyword to search.');
    return;
  } else {
    refs.gallery.innerHTML = '';
  }
  
  const data = await getData(value, page);
  if (data.totalHits === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  evt.target.reset();
  refs.loadMore.classList.remove('is-hidden');
  refs.gallery.insertAdjacentHTML('beforeend', markupCard(data.hits));
  Notiflix.Notify.success(`Hooray! We found ${data.total} images..`);

  totalPage = Math.ceil(data.total/40);
  // gallery.refresh();

  // observer.observe(refs.guard);
  // const markup = createMarkup(data.hits);
  // totalImg += data.hits.length;
  // refs.gallery.insertAdjacentHTML('beforeend', markup);
  
  

  // if (totalImg >= data.totalHits) {
  //   observer.unobserve(refs.guard);
  //   Notiflix.Notify.warning(
  //     "We're sorry, but you've reached the end of search results."
  //   );
  // }
  
}

async function loadMoreData() {
  page += 1;
  const data = await getData(value, page);
  //Math.ceil - rounds the argument to the nearest higher integer
  totalImg += data.hits.length;
  if ( totalPage < page) {
    refs.loadMore.classList.add('is-hidden');
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }  
  refs.gallery.insertAdjacentHTML('beforeend', markupCard(data.hits));  
  
  gallery.refresh();
  
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function infiniteScroll(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      onSubmit();
    }
  });
}

refs.form.addEventListener('submit', onSubmit);
refs.loadMore.addEventListener('click', loadMoreData);
