// global state ( access throughout any functions )
const global = {
  currentPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
  },
  api: {
    apiKey: '3b5978dd09b03850afb94675ec87b1eb',
    apiUrl: 'https://api.themoviedb.org/3/',
  },
};

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

// display movie details
const displayMovieDetails = async () => {
  const movieId = window.location.search.split('=')[1];
  console.log(movieId);

  const movie = await fetchAPIData(`movie/${movieId}`);

  // overlay for background image
  displayBackgroundImage('movie', movie.backdrop_path);

  const div = document.createElement('div');

  div.innerHTML = ` <div class="details-top">
          <div>
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
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${
              movie.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
              movie.budget,
            )}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
              movie.revenue,
            )}</li>
            <li><span class="text-secondary">Runtime:</span> ${
              movie.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies
            .map((company) => `<span>${company.name}</span>`)
            .join(' ')}</div>
        </div>`;
  document.querySelector('#movie-details').appendChild(div);
};

// display tv details

const displayTvShowDetails = async () => {
  const showId = window.location.search.split('=')[1];

  const show = await fetchAPIData(`tv/${showId}`);

  // overlay for background image
  displayBackgroundImage('show', show.backdrop_path);

  const div = document.createElement('div');

  div.innerHTML = `<div class="details-top">
          <div>
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
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
             ${show.vote_average.toFixed(1)}/ 10
            </p>
            <p class="text-muted">Release Date: ${show.release_date}</p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo
              aut, illum nesciunt esse cum tempora ipsa animi unde repellendus
              recusandae, quidem libero labore beatae sint nostrum inventore!
              Inventore libero sit exercitationem non magni odio nobis dolorum
              quae, deserunt quo unde labore consequuntur amet voluptatum vitae
              omnis dignissimos error quasi tempora?
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
                ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${
              show.homepage
            }" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${
              show.number_of_episodes
            }</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${
                show.last_air_date
              }
            </li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies
            .map((company) => `<span>${company.name}</span>`)
            .join(',')}</div>
        </div>`;
  document.querySelector('#show-details').appendChild(div);
};

// display backdrop on movie and tv show details page

const displayBackgroundImage = (type, backgroundPath) => {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';
  if (type == 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
};

const displaySliderMovies = async () => {
  const { results } = await fetchAPIData('movie/now_playing');
  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `

				  <a href="movie-details.html?id=${movie.id}">
					<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
				  </a>
				  <h4 class="swiper-rating">
					<i class="fas fa-star text-secondary"></i> ${movie.vote_average}/ 10
				  </h4>

    `;
    document.querySelector('.swiper-wrapper').appendChild(div);
    initSwiper();
  });
};

const displaySearchResults = (results) => {
  results.forEach((result) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <a href="${global.search.type}-details.html?id=${result.id}">
				${
          result.poster_path
            ? `	<img
							src="https://image.tmdb.org/t/p/w500/${result.poster_path}"
							class="card-img-top"
							alt="${global.search.type === 'movie' ? result.title : result.name}"
                />`
            : `	<img
							src="../images/no-image.jpg"
							class="card-img-top"
							alt="${global.search.type === 'movie' ? result.title : result.name}"
					/>`
        }
				</a>
				<div class="card-body">
					<h5 class="card-title">alt="${
            global.search.type === 'movie' ? result.title : result.name
          }"</h5>
					<p class="card-text">
						<small class="text-muted">Release: alt="${
              global.search.type === 'movie'
                ? result.release_date
                : result.first_air_date
            }"</small>
					</p>
				</div>



    `;
    document.querySelector('#search-results').appendChild(div);
  });
};

const initSwiper = () => {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
};

// Search movies and shows
const search = async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');

  if (global.search.term !== '' && global.search.term !== null) {
    const { results, total_pages, page } = await searchAPIData();

    if (results.length === 0) {
      showAlert('Sorry, no results found');
      return;
    }

    displaySearchResults(results);
    document.querySelector('#search-term').value = '';
  } else {
    showAlert('Please enter a search term');
  }
};

// fetch data from the TMDB API
const fetchAPIData = async (endpoint) => {
  // const API_KEY = '3b5978dd09b03850afb94675ec87b1eb';
  // const API_URL = 'https://api.themoviedb.org/3/';
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  showSpinner();
  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`,
  );
  const data = await response.json();
  hideSpinner();
  return data;
};

// Make search request
const searchAPIData = async () => {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  showSpinner();
  const response = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}`,
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

// show alert
const showAlert = (message, className = 'error') => {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alertEl);

  setTimeout(() => alertEl.remove(), 3000);
};

const addCommasToNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

//. init App
const init = () => {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displaySliderMovies();
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularTvShows();
    case '/movie-details.html':
      displayMovieDetails();
    case '/tv-details.html':
      displayTvShowDetails();
    case '/search.html':
      search();

    default:
      break;
  }
  highlightActiveLink();
};

document.addEventListener('DOMContentLoaded', init);

{
  /*  */
}
