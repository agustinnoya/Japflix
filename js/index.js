let movies = []
let newMoviesArray =[]


//sacar tildes y cosas raras

function toNormalForm(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}


//fetch

document.addEventListener("DOMContentLoaded", function (e) {
  fetch("https://japceibal.github.io/japflix_api/movies-data.json")
    .then(response => response.json())
    .then(data => { console.log(data); return data })
    .then(data => { movies = data; return data })
    .then(movies => { console.log("fetch", movies); return movies })
    .catch(error => console.log(error))
});


//filtrar peliculas y desplegarlas

document.getElementById("btnBuscar").addEventListener("click", () => {
  let searchMovies = [];
  let searchInfo = toNormalForm(document.getElementById("inputBuscar").value).toLowerCase();
  console.log(searchInfo);
  for (const movie of movies) {
    const {
      genres, title, overview, tagline
    } = movie
    if ((title.toLowerCase()).includes(searchInfo) || ((overview.toLowerCase()).includes(searchInfo)) || ((tagline.toLowerCase()).includes(searchInfo)) || containsGenre(genres, searchInfo)){
      searchMovies.push(movie);
    }
  }
  console.log(searchMovies);
  showMovies(searchMovies);
  newMoviesArray = searchMovies;
})

function containsGenre(genres, searchInfo){
  let aux = false
  for (const genre of genres) {
    if (((genre.name).toLowerCase()).includes(searchInfo)){
      aux = true;
    }
  }
  return aux
}


function showMovies(movies) {
  let contentToAppend = ""
  for (let i = 0; i < movies.length; i++) {
    contentToAppend += `
    <div class="movieBox border border-secondary cursor-active" onclick="headerInfo(${i})" style="height: 80px" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">

          <div class="contenido">

            <h5 class="titulo"><strong>${movies[i].title}</strong> </h5>
            <h5 class="titulo rating">
            ${movieReviewScore(movies[i].vote_average)}
            </h5>

          </div>

          <div>
            <p class="descripcion">${movies[i].tagline}</p>
          </div>

        </div>
    `
  }
  document.getElementById("lista").innerHTML = contentToAppend;
} 

function movieReviewScore(score) {
  let star = score/2
  star = Math.round(star)
  let starRateHtml = "";
  let j = 1;
  while (j <= star) {
      starRateHtml += `
      <span class="fa fa-star checked""></span>
      `
      j += 1;
  }
  while (j <= 5) {
      starRateHtml +=`
      <span class="fa fa-star"></span>
      `
      j += 1;
  }
  return starRateHtml;
}


//header

function headerInfo(i){
  let movie = newMoviesArray[i];
  console.log(movie)
  let contentToAppend = ""
  contentToAppend += `
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasTopLabel">${movie.title}</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <p>${movie.overview}</p>
    <hr>
    <p>${movieGenre(movie.genres)}</p>
  </div>    
  `
  document.getElementById("offcanvasTop").innerHTML = contentToAppend;
}

function movieGenre(genres){
  let text = ""
  text += genres[0].name;
  for (let i = 1; i < genres.length; i++){
    text += (" - " + genres[i].name);
  }
  return text
}
