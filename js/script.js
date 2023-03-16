// global state
const global = {
  currentPage: window.location.pathname,
};
console.log(global.currentPage);

// display the popular movies
const displayPopularMovies = async () => {
  const { results } = await fetchAPIData('movie/popular');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
				${
          movie.poster_path
            ? `	<img
							src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
							class="card-img-top"
							alt="${movie.title}"
                />`
            : `	<img
							src="../images/no-image.jpg"
							class="card-img-top"
							alt="${movie.title}"
					/>`
        }
				</a>
				<div class="card-body">
					<h5 class="card-title">${movie.title}</h5>
					<p class="card-text">
						<small class="text-muted">Release: ${movie.release_date}</small>
					</p>
				</div>



    `;
    document.querySelector('#popular-movies').appendChild(div);
  });
};

// display the popular tvshows
const displayPopularTvShows = async () => {
  const { results } = await fetchAPIData('tv/popular');

  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <a href="tv-details.html?id=${show.id}">
				${
          show.poster_path
            ? `	<img
							src="https://image.tmdb.org/t/p/w500/${show.poster_path}"
							class="card-img-top"
							alt="${show.name}"
                />`
            : `	<img
							src="../images/no-image.jpg"
							class="card-img-top"
							alt="${show.name}"
					/>`
        }
				</a>
				<div class="card-body">
					<h5 class="card-title">${show.name}</h5>
					<p class="card-text">
						<small class="text-muted">Air Date: ${show.first_air_date}</small>
					</p>
				</div>



    `;
    document.querySelector('#popular-shows').appendChild(div);
  });
};

// fetch data from the TMDB API
const fetchAPIData = async (endpoint) => {
  const API_KEY = '3b5978dd09b03850afb94675ec87b1eb';
  const API_URL = 'https://api.themoviedb.org/3/';

  showSpinner();
  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`,
  );
  const data = await response.json();
  hideSpinner();
  return data;
};

const showSpinner = () => {
  document.querySelector('.spinner').classList.add('show');
};

const hideSpinner = () => {
  document.querySelector('.spinner').classList.remove('show');
};

// Highlight active link
const highlightActiveLink = () => {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
};

//. init App
const init = () => {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularTvShows();
    case '/movie-details.html':
      console.log('Movie-Details');
    case '/tv-details.html':
      console.log('Tv-Details');
    case '/search.html':
      console.log('Search');

    default:
      break;
  }
  highlightActiveLink();
};

document.addEventListener('DOMContentLoaded', init);
