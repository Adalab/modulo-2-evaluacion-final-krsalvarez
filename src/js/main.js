"use strict";

const section = document.querySelector(".js-section");
const favorites = document.querySelector(".js-favorites");
const inputSearch = document.querySelector(".js-input");
const buttonSearch = document.querySelector(".btn-search");

let animeList = [];
let favoriteList = [];

// al hacer la búsqueda del anime quiero que lo pinte en el html

function renderAnime() {
    section.innerHTML = ""; //esto es para vacíar mi section y que no se duplique
    section.innerHTML = "<h3>Lista de Animes:</h3>";
  // aquí se crea un bucle para mostrar todos los animes que tiene el server
  for (const serie of animeList) {
    // una condición ternaria para decirle que si la imagen no tiene se debe poner el placeholder
    let imageUrl =
      serie.images.jpg.image_url ===
      "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
        ? "https://via.placeholder.com/210x295/ffffff/666666/?text=TV"
        : serie.images.jpg.image_url;
    section.innerHTML += `
    <li class="js-anime" id=${serie.mal_id}>
    <img src=${imageUrl}>
    <h3>${serie.title}</h3>
    </li>
    `;
  }

  const animeSelected = document.querySelectorAll(".js-anime");
  for (const selected of animeSelected) {
    selected.addEventListener("click", handleFavorite);
  }
}

function renderFavorites() {
    favorites.innerHTML = "<h3>Animes Favoritos</h3>";
  for (const serie of favoriteList) {
    // una condición ternaria para decirle que si la imagen no tiene se debe poner el placeholder
    let imageUrl = serie.images.jpg.image_url ===
        "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
        ? "https://via.placeholder.com/210x295/ffffff/666666/?text=TV"
        : serie.images.jpg.image_url;
    favorites.innerHTML += `
                <li class="js-anime" id=${serie.mal_id}>
                <img src=${imageUrl}>
                <h3>${serie.title}</h3>
                <button class="js-btn">X</button>
                </li>
                `;
    
  }

  //se crea const para seleccionar el btn de arriba, con un for haces que "escuche" y enlazas la función de abajo
        const removeAnime = document.querySelectorAll(".js-btn");
        for (const button of removeAnime) {
            button.addEventListener("click", removeFavorite);
        }

    

}

function handleFavorite(event) {
  const animeClicked = event.currentTarget;
  animeClicked.classList.toggle("favorite");

  const idAnimeClicked = parseInt(animeClicked.id);
  const animeToFav = animeList.find((serie) => serie.mal_id === idAnimeClicked);

  favoriteList.push(animeToFav);
  renderFavorites();
  saveLocalStorage();
}

function removeFavorite(event) {
    const idAnimeRemoved = parseInt(event.currentTarget.parentElement.id);
    favoriteList = favoriteList.filter((fav) => fav.mal_id !== idAnimeRemoved);
    renderFavorites();
    saveLocalStorage();

}


function searchAnime() {
  const inputValue = inputSearch.value;
  fetch(`https://api.jikan.moe/v4/anime?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      animeList = data.data;
      renderAnime(animeList);
    });
}

function saveLocalStorage() {
    localStorage.setItem("favorites", JSON.stringify(favoriteList));
  }

buttonSearch.addEventListener("click", function (event) {
  event.preventDefault();
  searchAnime();
});

function loadLocalStorage() {
    const selectedAnimes = JSON.parse(localStorage.getItem("favorites"));
    if (selectedAnimes !== null) {
      favoriteList = selectedAnimes;
      renderFavorites(selectedAnimes);
    }
  }

loadLocalStorage();
