import { FavFilms } from "./favoriteFilmsAPI";
export function createCard(options, container) {
    const cardsContainer = container;
    const card = document.createElement('div');
    const title = document.createElement('h3');
    const poster = document.createElement('img');
    const infoContainer = document.createElement('div');
    const year = document.createElement('p');
    const ratingContainer = document.createElement('div');
    const favContainer = document.createElement('div');
    const starIcon = document.createElement('img');
    const rating = document.createElement('p');
    const favIcon = document.createElement('img');
    const cardContainer = document.createElement('div');
    
    card.classList.add('card');
    cardContainer.classList.add('card-container');
    if(container === document.querySelector('.swiper-wrapper')){
        cardContainer.classList.add('swiper-slide');
    }
    title.innerText = `${options.Title}`;
    poster.src = options.Poster;
    poster.classList.add('poster');
    infoContainer.classList.add('info-container');
    year.innerText = `${options.Year}`;
    starIcon.src = '../src/assets/svg/star.svg';
    ratingContainer.classList.add('rating-container');
    rating.innerText = `${options.imdbRating}`;
    
    favIcon.classList.add('heart');
    const filmsList = FavFilms.getFavoriteFilms();
    if(filmsList === null || !filmsList.includes(options.imdbID)) {
        favIcon.src = '../src/assets/svg/favorite-unfilled.svg';
        favIcon.classList.add('unfilled');
    } else {
        favIcon.src = '../src/assets/svg/favorite-filled.svg';
        favIcon.classList.add('filled');
    }
    
    favIcon.dataset.imdbID = options.imdbID;
    favContainer.classList.add('fav-container');
    
    card.append(title);
    card.append(poster);
    card.append(infoContainer);
    infoContainer.append(year);
    infoContainer.append(ratingContainer);
    infoContainer.append(favContainer)
    ratingContainer.append(starIcon);
    ratingContainer.append(rating);
    favContainer.append(favIcon);
    
    cardContainer.append(card)
    cardsContainer.append(cardContainer);
}

