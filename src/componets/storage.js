class Storage {
    addToStorage(key, value) { };
    removeFromStorage(key) { };
    getInfoFromStorage(key) { };
}

class LocalStorage extends Storage {
    addToStorage(key, value) {
        localStorage.setItem(`${key}`, JSON.stringify(value))
    };
    removeFromStorage(key) {
        localStorage.removeItem(`${key}`)
    };
    getInfoFromStorage(key) {
        return JSON.parse(localStorage.getItem(`${key}`));
    };
}

class StorageService{
    constructor(storage) {
        this.storage = storage;
    }
    addToStorage(key, value) {
        this.storage.addToStorage(key, value);
    }
    removeFromStorage(key) {
        this.storage.removeFromStorage(key);
    }
    getInfoFromStorage(key) {
        return this.storage.getInfoFromStorage(key);
    }
}

const localStoraveService = new LocalStorage();
export const storage = new StorageService(localStoraveService)





// export function addToLocalStorage(element) {
//     if(localStorage.length === 0) {
//         localStorage.setItem('Favorite films', JSON.stringify([element.dataset.imdbID]))
//     } else {
//         let films = JSON.parse(localStorage.getItem('Favorite films'));
//         films.push(element.dataset.imdbID);
//         localStorage.setItem('Favorite films', JSON.stringify(films));

//     }
//     generateFavCards();
    
// }

// export function removeFromLocalStorage(element) {
//     let films = JSON.parse(localStorage.getItem('Favorite films'));
//     const id = element.dataset.imdbID.toString();
//     films.splice(films.indexOf(id), 1);
//     localStorage.setItem('Favorite films', JSON.stringify(films));
//     generateFavCards();
// }

// export function getFilmsFromStorage() {
//     return JSON.parse(localStorage.getItem('Favorite films'));
// }