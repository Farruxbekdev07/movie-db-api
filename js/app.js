// import { main_url, api_key, img_url } from "./url.js";
const main_url = "https://api.themoviedb.org/3";
const api_key = "api_key=36d82ad03d63de894682d8510d844053";
const img_url = "https://image.tmdb.org/t/p/w200";
("https://api.themoviedb.org/3/movie/popular?api_key=");

const trendMovieUrl = main_url + "/trending/all/day?" + api_key;
const trendMovieUrlWeek = main_url + "/trending/all/week?" + api_key;
const latestMovieUrl = main_url + "/movie/latest?" + api_key;
const popularMovieUrl = main_url + "/movie/popular?" + api_key;
const searchApi = main_url + "/search/movie?" + api_key;

const trendMovieWrapper = document.getElementsByClassName("movie-card-wrapper");
const latestWrapper = document.getElementById("latest-card-wrapper");
const trendTodayWrapper = document.getElementById("trend-today-wrapper");
const trendWeekWrapper = document.getElementById("trend-week-wrapper");
const onTv = document.getElementById("on_tv");
const inTheaters = document.getElementById("in_theaters");
const trendToday = document.getElementById("trend-today");
const trendWeek = document.getElementById("trend-week");
const onTvWrapper = document.getElementById("on_tv_wrapper");
const inTheatersWrapper = document.getElementById("in_theaters_wrapper");

const latestOnTv = document.getElementById("latest-tv");
const latestOnTvWrapper = document.getElementById("latest-tv-wrapper");
const latestInTheaters = document.getElementById("latest-theaters");
const latestInTheatersWrapper = document.getElementById("latest-theaters-wrapper");

trendToday.addEventListener("click", (event) => {
  event.preventDefault();
  trendingMovie(trendMovieUrl, 'trending');
  console.log("true");
  trendTodayWrapper.classList.add("anchor-selected");
  trendWeekWrapper.classList.remove("anchor-selected");
  trendWeekWrapper.classList.add("anchor");
  trendTodayWrapper.classList.remove("anchor");
});

trendWeek.addEventListener("click", (event) => {
  event.preventDefault();
  trendingMovie(trendMovieUrlWeek, 'trending');
  console.log("true");
  trendWeekWrapper.classList.add("anchor-selected");
  trendTodayWrapper.classList.remove("anchor-selected");
  trendTodayWrapper.classList.add("anchor");
  trendWeekWrapper.classList.remove("anchor");
});

onTv.addEventListener("click", (event) => {
  event.preventDefault();
  trendingMovie(popularMovieUrl, 'popular');
  console.log("true");
  onTvWrapper.classList.add("anchor-selected");
  inTheatersWrapper.classList.remove("anchor-selected");
  inTheatersWrapper.classList.add("anchor");
  onTvWrapper.classList.remove("anchor");
});

inTheaters.addEventListener("click", (event) => {
  event.preventDefault();
  trendingMovie(trendMovieUrlWeek, 'popular');
  console.log("true");
  inTheatersWrapper.classList.add("anchor-selected");
  onTvWrapper.classList.remove("anchor-selected");
  onTvWrapper.classList.add("anchor");
  inTheatersWrapper.classList.remove("anchor");
});

latestOnTv.addEventListener('click', (event) => {
  event.preventDefault()
  trendingMovie(popularMovieUrl, 'latest')
  console.log('true');
  latestOnTvWrapper.classList.add('anchor-selected')
  latestInTheatersWrapper.classList.remove('anchor-selected')
  latestInTheatersWrapper.classList.add('anchor')
  latestOnTvWrapper.classList.remove('anchor')
});

latestInTheaters.addEventListener('click', (event) => {
  event.preventDefault()
  trendingMovie(trendMovieUrlWeek, 'latest')
  console.log('true');
  latestInTheatersWrapper.classList.add('anchor-selected')
  latestOnTvWrapper.classList.remove('anchor-selected')
  latestOnTvWrapper.classList.add('anchor')
  latestInTheatersWrapper.classList.remove('anchor')
})

function trendingMovie(url, popular) {
  if (popular == 'trending') {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        trendingMovieShow(data.results);
      });
  }

  else if(popular == 'popular') {
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      popularMovieShow(data.results);
    });
  }

  else if(popular == 'latest') {
    fetch(url)
    .then((res) => res.json())
    .then((latestData) => {
      latestMovieShow(latestData.results);
    });
  }
}

function trendingMovieShow(data) {
  console.log(data);
  trendMovieWrapper[0].innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const {
      title,
      vote_average,
      poster_path,
      release_date,
      original_title,
      first_air_date,
      name,
      id,
    } = data[i];
    trendMovieWrapper[0].innerHTML += `
      <div class="card">
          <div class="image-wrapper">
              <a onclick="details(\`${id}\`)">
                  <img src="${img_url + poster_path}" alt="${title}">
              </a>
              <div class="option">
                  <i class="fa-solid fa-ellipsis"></i>
              </div>
          </div>
          <div class="card-content">
          <div>
              <svg viewBox="0 0 36 36" class="circular-chart">
                <path class="circle"
                  stroke-dasharray="${Math.round(vote_average) * 10}, 100"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text class="percentage">${Math.round(vote_average) * 10}</text>
              </svg>
            </div>
              <h2>
                  <a href="">${title ?? original_title ?? name}</a>
              </h2>
              <p>${release_date ?? first_air_date}</p>
          </div>
      </div>
      `;
  }
}

function latestMovieShow(data) {
  console.log(data);
  latestWrapper.innerHTML = "";
  // console.log(title, poster_path, backdrop_path);
  for (let i = 0; i < data.length; i++) {
    const { title, poster_path, backdrop_path } = data[i];
    latestWrapper.innerHTML += `
    <div class="movie-video">
        <div class="image-wrapper">
            <div class="option">
                <i class="fa-solid fa-ellipsis"></i>
            </div>
            <i class="fa-solid fa-play"></i>
            <img src="${img_url + poster_path ?? backdrop_path}" alt="${title}">
        </div>
        <h2>${title}</h2>
    </div>
    `;
  }
}

function popularMovieShow(data) {
  console.log(data);
  trendMovieWrapper[1].innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const { title, vote_average, poster_path, release_date } = data[i];
    trendMovieWrapper[1].innerHTML += `
      <div class="card">
          <div class="image-wrapper">
              <a  href="#">
                  <img src="${img_url + poster_path}" alt="${title}">
              </a>
              <div class="option">
                  <i class="fa-solid fa-ellipsis"></i>
              </div>
          </div>
          <div class="card-content">
              <svg viewBox="0 0 36 36" class="circular-chart">
                  <path class="circle"
                    stroke-dasharray="${Math.random(vote_average) * 10}, 100"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text x="5" y="20" class="percentage">${Math.random(vote_average) * 10}</text>
              </svg>
              <h2>
                  <a href="">${title}</a>
              </h2>
              <p>${release_date}</p>
          </div>
      </div>
      `;
  }
}

trendingMovie(trendMovieUrl, 'trending');
trendingMovie(popularMovieUrl, 'latest')
trendingMovie(popularMovieUrl, 'popular');

function details(id) {
  location.href = `${location.protocol}//${location.host}/html/details.html?id=${id}`;
  console.log(
    (location.href = `${location.protocol}//${location.host}/html/details.html?id=${id}`)
  );
}