
let currentPage = 1;
const resultsPerPage = 8;
const input = document.querySelector('#search');
const main = document.querySelector('#main');
const prevPage = document.getElementById('prev');
const nextPage = document.getElementById('next');

prevPage.addEventListener('click', function () {
  if (currentPage > 1) {
    currentPage--;
    OnChangeSearch(input.value);
  }
});

nextPage.addEventListener('click', function () {
  currentPage++;
  OnChangeSearch(input.value);
});

input.addEventListener('blur', function () {
  currentPage = 1; 
  OnChangeSearch(input.value);
});

function OnChangeSearch(searchParam) {
  main.innerHTML = '';

  axios.get(`https://www.omdbapi.com/?apikey=cea06076&s=${searchParam}&page=${currentPage}`)
    .then(function (response) {
      if (response.data.Search) {
        const movies = response.data.Search;
        const moviesToDisplay = movies.slice(0, resultsPerPage);

        moviesToDisplay.forEach(function (movie) {
          const card = document.createElement('div');
          const title = document.createElement('h3');
          const img = document.createElement('img');
          const year = document.createElement('p');
          const rating = document.createElement('p');

          card.className = 'card';
          title.innerText = movie.Title;
          img.setAttribute("src", movie.Poster);
          img.setAttribute('title', movie.Title);
          year.innerText = 'Year: ' + movie.Year;
          if(movie.imdbRating){
            rating.innerText = 'IMDB Rating: ' + movie.imdbRating; 
          } else {
            rating.innerText = 'IMDB Rating: N/A';
          }
         

          card.appendChild(img);
          card.appendChild(title);
          card.appendChild(year);
          card.appendChild(rating);

          main.appendChild(card);
        });

        if (currentPage > 1) {
          prevPage.style.display = 'block';
        } else {
          prevPage.style.display = 'none';
        }

        if (response.data.totalResults > currentPage * resultsPerPage) {
          nextPage.style.display = 'block';
        } else {
          nextPage.style.display = 'none';
        }
      } else {
        
        const noResults = document.createElement('div');
        noResults.className = 'noResult';
        noResults.innerText = "Judul film tidak ditemukan";
        main.appendChild(noResults);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}




