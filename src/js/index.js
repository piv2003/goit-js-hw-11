import { refs } from './refs';
import { getData } from './getData';
import { markupCard } from './markup';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let gallery = new SimpleLightbox('.gallery a');
let value = '';
let page = 1;

// const guard = document.querySelector('.js-guard');


// const options = {
//   root: null,
//   rootMargin: '300px',
//   threshold: 0
// }

// let observer = new IntersectionObserver(onLoad, options);

// function onLoad() {
//   console.log(`HELLO`);
// }


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
    Notiflix.Notify.info(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  evt.target.reset();
  refs.loadMore.classList.remove('is-hidden');
  refs.gallery.insertAdjacentHTML('beforeend', markupCard(data.hits));
  Notiflix.Notify.success(`Hooray! We found ${data.total} images..`);
  gallery.refresh();
  
}

async function loadMoreData() {
  page += 1;
  const data = await getData(value, page);
  //Math.ceil - rounds the argument to the nearest higher integer
  if (Math.ceil(data.totalHits / data.hits.length) === page) {
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

refs.form.addEventListener('submit', onSubmit);
refs.loadMore.addEventListener('click', loadMoreData);
