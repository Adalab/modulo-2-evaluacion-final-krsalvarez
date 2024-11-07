"use strict";

const section = document.querySelector(".js-section");
const favorites = document.querySelector(".js-favorites");
const inputSearch = document.querySelector(".js-input");
const buttonSearch = document.querySelector(".btn-search");

let animeList = [];

// al hacer la búsqueda del anime quiero que lo pinte en el html

function renderAnime() {
    section.innerHTML = ""; //esto es para vacíar mi section y que no se duplique
    
    // aquí se crea un bucle para mostrar todos los animes que tiene el server
    for (const serie of animeList) { 

    let imageUrl = serie.images.jpg.image_url === "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
            ? "https://via.placeholder.com/210x295/ffffff/666666/?text=TV"
            : serie.images.jpg.image_url;

    section.innerHTML += `
    <img src=${imageUrl}>
    <h3>${serie.title}</h3>
    `;
     }
    }


function searchAnime() {
    const inputValue = inputSearch.value;

    fetch(`https://api.jikan.moe/v4/anime?q=${inputValue}`)
        .then(response => response.json())
        .then(data => {
            animeList = data.data;
            renderAnime(animeList);
        })
}


buttonSearch.addEventListener("click", function (event) {
    event.preventDefault();
    searchAnime();
});