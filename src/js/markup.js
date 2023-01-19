export function markupCard(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
        <a href="${largeImageURL}">
                 <img class="photo-card-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
                 </a>
                     <div class="info">
                         <p class="info-item">
                         <b>Likes</b>
                           <span class="span">${likes}</span>
                         </p>
                         <p class="info-item">
                           <b>Views</b>
                           <span class="span">${views}</span>
                         </p>
                         <p class="info-item">
                           <b>Comments</b>
                           <span class="span">${comments}</span>
                         </p>
                         <p class="info-item">
                           <b>Downloads</b>
                           <span class="span">${downloads}</span>
                          </p>
                  </div>
            </div>`;
      }
    )
    .join('');
}
