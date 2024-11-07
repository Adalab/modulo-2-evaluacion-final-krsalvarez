const o=document.querySelector(".js-section"),a=document.querySelector(".js-favorites"),f=document.querySelector(".js-input"),u=document.querySelector(".btn-search");let s=[],i=[];function d(){o.innerHTML="",o.innerHTML="<h3>Lista de Animes:</h3>";for(const e of s){let n=e.images.jpg.image_url==="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"?"https://via.placeholder.com/210x295/ffffff/666666/?text=TV":e.images.jpg.image_url;o.innerHTML+=`
    <li class="js-anime" id=${e.mal_id}>
    <img src=${n}>
    <h3>${e.title}</h3>
    </li>
    `}const t=document.querySelectorAll(".js-anime");for(const e of t)e.addEventListener("click",g)}function c(){a.innerHTML="<h3>Animes Favoritos</h3>";for(const e of i){let n=e.images.jpg.image_url==="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"?"https://via.placeholder.com/210x295/ffffff/666666/?text=TV":e.images.jpg.image_url;a.innerHTML+=`
                <li class="js-anime" id=${e.mal_id}>
                <img src=${n}>
                <h3>${e.title}</h3>
                <button class="js-btn">X</button>
                </li>
                `}const t=document.querySelectorAll(".js-btn");for(const e of t)e.addEventListener("click",p)}function g(t){const e=t.currentTarget;e.classList.toggle("favorite");const n=parseInt(e.id),l=s.find(m=>m.mal_id===n);i.push(l),c(),r()}function p(t){const e=parseInt(t.currentTarget.parentElement.id);i=i.filter(n=>n.mal_id!==e),c(),r()}function h(){const t=f.value;fetch(`https://api.jikan.moe/v4/anime?q=${t}`).then(e=>e.json()).then(e=>{s=e.data,d()})}function r(){localStorage.setItem("favorites",JSON.stringify(i))}u.addEventListener("click",function(t){t.preventDefault(),h()});function v(){const t=JSON.parse(localStorage.getItem("favorites"));t!==null&&(i=t,c())}v();
//# sourceMappingURL=main.js.map
