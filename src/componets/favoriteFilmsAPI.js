import { storage } from "./storage";

class FavoriteFilms {
    addFilmToFavorite(element) { //что такое элемент
        if(this.getFavoriteFilms()) {
            let films = this.getFavoriteFilms();
            films.push(element.dataset.imdbID);
            storage.addToStorage('Favorite films', films);
        } else {
            storage.addToStorage('Favorite films', [element.dataset.imdbID]);
        }
    };
    removeFilmFromFavorite(element) {
        let films = this.getFavoriteFilms();
        const id = element.dataset.imdbID.toString();
        films.splice(films.indexOf(id), 1);
        storage.addToStorage('Favorite films', films);
    };
    getFavoriteFilms() {
        return storage.getInfoFromStorage('Favorite films');
    };
}

export const FavFilms = new FavoriteFilms();
