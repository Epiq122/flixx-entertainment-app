// global state
const global = {
  currentPage: window.location.pathname,
};
console.log(global.currentPage);

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
      console.log('Home');
      break;
    case '/shows.html':
      console.log('Shows');
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
