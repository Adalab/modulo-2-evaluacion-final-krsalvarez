"use strict";

const section = document.querySelector(".js-section");
const favorites = document.querySelector(".js-favorites");
const inputSearch = document.querySelector(".js-input");
const buttonSearch = document.querySelector(".btn-search");

let animeList = [];
let favoriteList = [];

// al hacer la búsqueda del anime quiero que lo pinte en el html

function renderAnime() {
    let content = "";
    section.innerHTML = ""; //esto es para vacíar mi section y que no se duplique
    content = "<h3>Lista de Animes:</h3><ul class='anime-list'>";
    // aquí se crea un bucle para mostrar todos los animes que tiene el server
    for (const serie of animeList) {
        // una condición ternaria para decirle que si la imagen no tiene se debe poner el placeholder
        let imageUrl =
            serie.images.jpg.image_url ===
                "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
                ? "https://via.placeholder.com/210x295/ffffff/666666/?text=TV"
                : serie.images.jpg.image_url;
        content += `
    <li class="js-anime" id=${serie.mal_id}>
    <img src=${imageUrl}>
    <h4>${serie.title}</h4>
    </li>
    `;
    }
    content += `</ul>`;
    section.innerHTML = content;
    const animeSelected = document.querySelectorAll(".js-anime");
    for (const selected of animeSelected) {
        selected.addEventListener("click", handleFavorite);
    }
}

function renderFavorites() {
    //si la lista está vacía el contenedor se vacía y sale de la función
    if (favoriteList.length === 0) {
        favorites.innerHTML = "";
        return;
    }

    //si hay elementos se muestra todo lo demás
    favorites.innerHTML = `<h3>Animes Favoritos</h3>
    <button class="js-remove-all">Eliminar todos</button>`;

    for (const serie of favoriteList) {
        
        // una condición ternaria para decirle que si la imagen no tiene se debe poner el placeholder
        let imageUrl = serie.images.jpg.image_url ===
            "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
            ? "https://via.placeholder.com/210x295/ffffff/666666/?text=TV"
            : serie.images.jpg.image_url;

        favorites.innerHTML += `
                <li class="js-anime" id=${serie.mal_id}>
                <img src=${imageUrl}>
                <h4>${serie.title}</h4>
                <button class="js-btn">X</button>
                </li>
                `;

    }

    //añade eventos para los botones
    const removeAnime = document.querySelectorAll(".js-btn");
    for (const button of removeAnime) {
        button.addEventListener("click", removeFavorite);
    }

    //añade evento para el botón de eliminar todo
    const removeAll = document.querySelector(".js-remove-all");
    removeAll.addEventListener("click", removeAllFavorites);
}

function removeFavorite(event) {
    const idAnimeRemoved = parseInt(event.currentTarget.parentElement.id);
    favoriteList = favoriteList.filter((fav) => fav.mal_id !== idAnimeRemoved);
    
    renderFavorites(); //actualiza la lista de favoritos
    saveLocalStorage(); //lo guarda en el localStorage
}

function removeAllFavorites() {
    favoriteList = []; //vacía la lista de favs
    renderFavorites(); 
    saveLocalStorage();
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
