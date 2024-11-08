const u=document.querySelector(".js-section"),a=document.querySelector(".js-favorites"),f=document.querySelector(".js-input"),g=document.querySelector(".btn-search"),h=document.querySelector(".btn-reset");let s=[],i=[];function l(){let t="";if(s.length>0){t="<h3>Lista de Animes:</h3><ul class='anime-list'>";for(const e of s){let o=i.some(v=>v.mal_id===e.mal_id)?"favorite":"",m=e.images.jpg.image_url==="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"?"https://via.placeholder.com/210x295/ffffff/666666/?text=TV":e.images.jpg.image_url;t+=`
    <li class="js-anime ${o}" id=${e.mal_id}>
    <img src=${m}>
    <h4>${e.title}</h4>
    </li>
    `}t+="</ul>"}u.innerHTML=t;const n=document.querySelectorAll(".js-anime");for(const e of n)e.addEventListener("click",S)}function r(){if(i.length===0){a.innerHTML="";return}a.innerHTML=`<h3>Animes Favoritos</h3>
    <button class="js-remove-all">Eliminar todos</button>`;for(const e of i){let c=e.images.jpg.image_url==="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"?"https://via.placeholder.com/210x295/ffffff/666666/?text=TV":e.images.jpg.image_url;a.innerHTML+=`
                <li class="js-anime" id=${e.mal_id}>
                <img src=${c}>
                <h4>${e.title}</h4>
                <button class="js-btn">X</button>
                </li>
                `}const t=document.querySelectorAll(".js-btn");for(const e of t)e.addEventListener("click",p);document.querySelector(".js-remove-all").addEventListener("click",L)}function p(t){const n=parseInt(t.currentTarget.parentElement.id);i=i.filter(e=>e.mal_id!==n),r(),l(),d()}function L(){i=[],document.querySelectorAll(".js-anime").forEach(n=>{n.classList.remove("favorite")}),r(),l(),d()}function S(t){const n=t.currentTarget,e=parseInt(n.id);if(i.some(o=>o.mal_id===e))i=i.filter(o=>o.mal_id!==e),n.classList.remove("favorite");else{const o=s.find(m=>m.mal_id===e);i.push(o),n.classList.add("favorite")}r(),d()}function j(){const t=f.value;fetch(`https://api.jikan.moe/v4/anime?q=${t}`).then(n=>n.json()).then(n=>{s=n.data,l()})}function d(){localStorage.setItem("favorites",JSON.stringify(i))}g.addEventListener("click",function(t){t.preventDefault(),j()});function A(){s=[],i=[],u.innerHTML="",a.innerHTML="",localStorage.removeItem("favorites"),f.value="",l(),r()}h.addEventListener("click",A);function y(){const t=JSON.parse(localStorage.getItem("favorites"));t!==null&&(i=t),r()}y();
//# sourceMappingURL=main.js.map
