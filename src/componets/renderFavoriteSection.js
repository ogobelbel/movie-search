import { createCard } from "./card";
import { getCardInfo } from "..";

import { FavFilms } from "./favoriteFilmsAPI";

const favContainer = document.querySelector('.favorite-films')

export async function renderFavCards() {
    favContainer.innerHTML = "";

    console.log('storage event')
    const filmsIDs = FavFilms.getFavoriteFilms();
    const promises = filmsIDs.map(filmID => {
        const card = {
            imdbID: filmID
        };
        return getCardInfo(card);
    });
    const films = await Promise.all(promises);
    films.map(film =>{
        createCard(film, favContainer);
      })
    
}

