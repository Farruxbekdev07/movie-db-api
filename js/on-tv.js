// '/tv/on_the_air?'
console.log('airing today html');
const main_url = "https://api.themoviedb.org/3";
const api_key = "api_key=36d82ad03d63de894682d8510d844053";
const img_url = "https://image.tmdb.org/t/p/w200";
("https://api.themoviedb.org/3/movie/popular?api_key=");

const popularMovieUrl = main_url + "/tv/on_the_air?" + api_key;

const trendMovieWrapper = document.getElementsByClassName("movie-card-wrapper");

function popularMovies(url) {
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        popularMovieShow(data.results);
    });
}

function popularMovieShow(data) {
    console.log(data);
    trendMovieWrapper[0].innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        const { title, vote_average, poster_path, release_date } = data[i];
        trendMovieWrapper[0].innerHTML += 
        `<div class="card">
            <div class="image-wrapper">
                <a href="#">
                    <img src="${img_url + poster_path}" alt="${title}">
                </a>
                <div class="option">
                    <i class="fa-solid fa-ellipsis"></i>
                </div>
            </div>
            <div class="card-content">
                <svg viewBox="0 0 36 36" class="circular-chart">
                    <path class="circle"
                    stroke-dasharray="${Math.round(vote_average) * 10}, 100"
                    d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="5" y="20" class="percentage">${Math.round(vote_average) * 10}</text>
                </svg>
                <h2>
                    <a href="">${title}</a>
                </h2>
                <p>${release_date}</p>
            </div>
        </div>`;
    }
}

popularMovies(popularMovieUrl)