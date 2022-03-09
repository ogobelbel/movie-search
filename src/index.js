import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './style.scss'

import { createCard } from './componets/card';
import Swiper, { Navigation, Pagination } from 'swiper';
import { renderFavCards } from './componets/renderFavoriteSection';
import { FavFilms } from './componets/favoriteFilmsAPI';


const unfilledHeartPath = '../src/assets/svg/favorite-unfilled.svg';
const filledHeartPath = '../src/assets/svg/favorite-filled.svg'


renderFavCards();


// Свайпер я бы ваще в отдельный компонент засунул полностью
const swiper = new Swiper('.swiper', {
  // configure Swiper to use modules
  modules: [Navigation, Pagination],
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 4,
  freeMode: true,
  spaceBetween: 70,


  
})

const input = document.querySelector('input');
const cardsContainer = document.querySelector('.swiper-wrapper')
const favoriteBtn = document.querySelector('.favorite-icon')
const favoriteFilms = document.querySelector('.favorite-films')
cardsContainer.addEventListener('click', changeFavoriteStatus)

fetchFilminfo({target:{
  value: 'Marvel'
}}) // Зачем тут вложенность, можно просто target: : marvel

favoriteBtn.addEventListener('click', ()=>{
  favoriteFilms.classList.toggle('hidden');
  if(window.location.hash === '#favorite'){
    window.location.hash = '';
  } else {
    window.location.hash = '#favorite';
  }

})


input.addEventListener('change', fetchFilminfo);



window.addEventListener('load', ()=>{
  const location = window.location.hash;
  if(location === '#favorite') {
    console.log('remove');
    favoriteFilms.classList.remove('hidden');
  } else {
    console.log('add'); // консоли убирай
    favoriteFilms.classList.add('hidden');
  }
})




async function fetchFilminfo(e) { // Что такое е хуй понятно
  try{
  const url = `http://www.omdbapi.com/?s=${e.target.value}&page=1&apikey=3979c7cd`;
  const response = await fetch(url);
  const data = await response.json(); // Не совсем понятное название, лучше типа filmsCollection
  if(data.Response === 'True') {
    const promises = data.Search.map(card => {return getCardInfo(card)});
    const films = await Promise.all(promises);
    cardsContainer.innerHTML = "";
    
    films.map(film =>{
      createCard(film, document.querySelector('.swiper-wrapper'));
    })
    swiper.update();
  } else {
    alert(`No result for ${e.target.value}`); // алерт?
  }

  } catch(e) {
    console.log(e);
  }
}

export async function getCardInfo(card) { 
  try{
    const respose = await fetch(`https://www.omdbapi.com/?i=${card.imdbID}&apikey=3979c7cd`);
    const data = await respose.json();
    return data;

  } catch(e) {
    console.log(e);
  }
}




function changeFavoriteStatus(e) { //да кто такой этот ваш е, пиши clickEvent, keyBoardEvent 
  if(e.target.classList.contains('heart')){
    if(e.target.classList.contains('unfilled')) {
      FavFilms.addFilmToFavorite(e.target);
      e.target.src = filledHeartPath;
      e.target.classList.toggle('unfilled');
      renderFavCards();
    } else {
      FavFilms.removeFilmFromFavorite(e.target);
      e.target.src = unfilledHeartPath;
      e.target.classList.toggle('unfilled');
      renderFavCards();
    }
  }
}


