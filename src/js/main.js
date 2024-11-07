"use strict";

const section = document.querySelector(".js-section");
const favorites = document.querySelector(".js-favorites");
const inputSearch = document.querySelector(".js-input");
const buttonSearch = document.querySelector(".btn-search");

let animeList = [];

// al hacer la búsqueda del anime quiero que lo pinte en el html

function renderAnime() {
    for (const serie of animeList) { 
        console.log(serie);
    section.innerHTML += `
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