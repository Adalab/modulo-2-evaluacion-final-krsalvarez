"use strict";

const section = document.querySelector(".js-section");
const favorites = document.querySelector(".js-favorites");
const inputSearch = document.querySelector(".js-input");
const buttonSearch = document.querySelector(".btn-search");
const buttonReset = document.querySelector(".btn-reset");

let animeList = [];
let favoriteList = [];

// al hacer la búsqueda del anime quiero que lo pinte en el html

function renderAnime() {
    let content = "";

    if (animeList.length > 0) {

    // section.innerHTML = ""; //esto es para vacíar mi section y que no se duplique
    content = "<h3>Lista de Animes:</h3><ul class='anime-list'>";
    // aquí se crea un bucle para mostrar todos los animes que tiene el server
    for (const serie of animeList) {
        //Revisamos si está en favs
        const inFavorite = favoriteList.some(fav => fav.mal_id === serie.mal_id);
        //si está en fav se le añade la clase favorite, sino pues no
        let favoriteClass = inFavorite ? "favorite" : "";

        // una condición ternaria para decirle que si la imagen no tiene se debe poner el placeholder
        let imageUrl =
            serie.images.jpg.image_url ===
                "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
                ? "https://via.placeholder.com/210x295/ffffff/666666/?text=TV"
                : serie.images.jpg.image_url;
        
        content += `
    <li class="js-anime ${favoriteClass}" id=${serie.mal_id}>
    <img src=${imageUrl}>
    <h4>${serie.title}</h4>
    </li>
    `;
    }
    content += `</ul>`;
}
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
    renderAnime();
    saveLocalStorage(); //lo guarda en el localStorage
}

function removeAllFavorites() {
    favoriteList = []; //vacía la lista de favs
     

    //aqui eliminar clase favorite de los eliminados
    const removedAnimes = document.querySelectorAll(".js-anime");
    removedAnimes.forEach((anime) => {
        anime.classList.remove("favorite");
    });
    renderFavorites();
    renderAnime();
    saveLocalStorage();
}


function handleFavorite(event) {
    const animeClicked = event.currentTarget;
    const idAnimeClicked = parseInt(animeClicked.id);

    //verificamos si está en fav
    const inFavorite = favoriteList.some(fav => fav.mal_id === idAnimeClicked);

    //condicional para que si no está se quite la clase y si está se la ponga
    if (inFavorite) {
        favoriteList = favoriteList.filter(fav => fav.mal_id !== idAnimeClicked);
        animeClicked.classList.remove("favorite");
    } else {
        const animeToFav = animeList.find((serie) => serie.mal_id === idAnimeClicked);
        favoriteList.push(animeToFav);
        animeClicked.classList.add("favorite");
    }
    renderAnime();
    renderFavorites();
    saveLocalStorage();
}


function searchAnime() {
    const inputValue = inputSearch.value;
    fetch(`https://api.jikan.moe/v4/anime?q=${inputValue}`)
        .then((response) => response.json())
        .then((data) => {
            animeList = data.data;
            renderAnime();
        });
}

function saveLocalStorage() {
    localStorage.setItem("favorites", JSON.stringify(favoriteList));
}

buttonSearch.addEventListener("click", function (event) {
    event.preventDefault();
    searchAnime();
});


function resetAnimes() {
    //vaciamos listas
    animeList = [];
    favoriteList = [];

    //vaciamos animes y favoritos
    section.innerHTML = "";
    favorites.innerHTML = "";

    //vaciamos localStorage
    localStorage.removeItem("favorites");

    //el input también vaciamos
    inputSearch.value = "";

    renderAnime();
    renderFavorites();
}

buttonReset.addEventListener("click", resetAnimes);

function loadLocalStorage() {
    const selectedAnimes = JSON.parse(localStorage.getItem("favorites"));
    if (selectedAnimes !== null) {
        favoriteList = selectedAnimes;
        renderFavorites();
    }
}

loadLocalStorage();
