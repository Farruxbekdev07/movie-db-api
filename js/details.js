const main_Url = "https://api.themoviedb.org/3";
const api_Key = "api_key=36d82ad03d63de894682d8510d844053";
const img_Url = "https://image.tmdb.org/t/p/w500";
var id = location.search.slice(4, location.length);
const detailsApi = main_Url + `/movie/${id}?` + api_Key;
const castApi = main_Url + `/movie/${id}/credits?` + api_Key;
const basicWrapper = document.getElementsByClassName('basic__wrapper')[0]
const castWrapper = document.getElementsByClassName('cast__card__wrapper')[0]
console.log(id);

function detailsMovie(url, cast) {
    if (cast == 'movie') {
        fetch(url)
          .then((res) => res.json())
          .then((detailsdata) => {
            detailsShow(detailsdata);
          });
    }

    else if (cast == 'cast') {
        fetch(url)
            .then((res) => res.json())
            .then((castdata) => {
                castShow(castdata)
            })
    }
}

function detailsShow(data) {
    console.log(data);
    const {backdrop_path, id, original_title, poster_path, release_date, title, first_air_date, vote_average} = data;

    basicWrapper.innerHTML +=
    `
    <div class="backgrounds">
        <div class="image__wrapper">
            <img
                class="sharper"
                src="${img_Url + poster_path ?? backdrop_path}"
                alt="${id}"
            />
            <div class="image__hover">
                <i class="fa-solid fa-maximize"></i>
            </div>
        </div>
        <div class="basic__wrapper__content">
            <div class="title">
                <h2>
                    <a href="#" class="hover__effect">${original_title ?? title}</a>
                    <span>(2023)</span>
                </h2>
                <div class="title__content">
                    <span>R</span>
                    <span>${release_date ?? first_air_date} (US)</span>
                    <span class="dote">.</span>
                    <span>
                    <a href="#" class="hover__effect">Thriller,</a>
                    <a href="#" class="hover__effect">Crime,</a>
                    <a href="#" class="hover__effect">Drama</a>
                    </span>
                    <span class="dote">.</span>
                    <span>1h 56m</span>
                </div>
            </div>
            <ul>
                <li class="chart">
                    <div class="protsent">
                        <svg viewBox="0 0 36 36" class="circular-chart">
                            <path
                            class="circle"
                            stroke-dasharray="${Math.round(vote_average) * 10}, 100"
                            d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <text x="7" y="22" class="percentage">${Math.round(vote_average) * 10}%</text>
                        </svg>
                    </div>
                    <div class="text">
                        <h6>User Score</h6>
                    </div>
                </li>
                <li>
                    <div class="tooltips">
                        <i class="fa-solid fa-list-ul"></i>
                        <div class="tooltiptext">Add to list</div>
                    </div>
                </li>
                <li>
                    <div class="tooltips">
                        <i class="fa-solid fa-heart"></i>
                        <div class="tooltiptext">Mark as favorite</div>
                    </div>
                </li>
                <li>
                    <div class="tooltips">
                        <i class="fa-solid fa-bookmark"></i>
                        <div class="tooltiptext">Add to your watchlist</div>
                    </div>
                </li>
                <li>
                    <div class="tooltips">
                        <i class="fa-solid fa-star"></i>
                        <div class="tooltiptext">Rate it!</div>
                    </div>
                </li>
                <li class="hover__effect">
                    <span>
                        <i class="fa-solid fa-play"></i>
                    </span>
                    <span>Play Trailer</span>
                </li>
            </ul>
            <div class="content__wrapper">
                <i>Read between the lies.</i>
                <p>Overview</p>
                <p>
                    A small, wealthy family in New York City gets progressively
                    torn apart by secrets, lies, and the theft that orchestrates
                    all of it.
                </p>
                <div class="d-flex gap-5">
                    <div>
                        <a href="#">Benjamin</a>
                        <p>Director</p>
                    </div>
                    <div>
                        <a href="#">Alessandro Tanaka</a>
                        <p>Screenplay</p>
                    </div>
                    <div>
                        <a href="#">Brian Gatewood</a>
                        <p>Screenplay</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    basicWrapper.style.background = `url(${img_Url + backdrop_path})`
    basicWrapper.style.backgroundPosition = 'center top';
    basicWrapper.style.backgroundRepeat = 'no-repeat';
    basicWrapper.style.backgroundSize = 'cover';
    basicWrapper.style.width = '100%';
}

detailsMovie(detailsApi, 'movie');

function castShow(data) {
    console.log(data);
    const {character, original_name, profile_path, name,} = data;
    console.log(img_Url, 'img_Url');
    console.log(profile_path, 'path');
    console.log(character, 'character');
    console.log(original_name, 'original_name');

    castWrapper.innerHTML +=
    `
    <div class="cast__card">
        <div class="cast__image__wrapper">
            <a href="#">
                <img
                    src="${img_Url + profile_path}"
                    alt="${name ?? original_name}"
                />
            </a>
        </div>
        <div class="cast__content__wrapper">
            <b><p>${original_name ?? name}</p></b>
            <p>${character}</p>
        </div>
    </div>
    `
}

detailsMovie(castApi, 'cast')

console.log("detail js");