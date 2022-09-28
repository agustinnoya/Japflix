let movies = []

function toNormalForm(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

document.addEventListener("DOMContentLoaded", function (e) {
  fetch("https://japceibal.github.io/japflix_api/movies-data.json")
    .then(response => response.json())
    .then(data => { console.log(data); return data })
    .then(data => { movies = data; return data })
    .then(movies => { console.log("fetch", movies); return movies })
    .catch(error => console.log(error))
});

document.getElementById("btnBuscar").addEventListener("click", () => {
  let searchMovies = [];
  let searchInfo = toNormalForm(document.getElementById("inputBuscar").value).toLowerCase();
  console.log(searchInfo);
  for (const movie of movies) {
    const {
      genres, title, overview, tagline
    } = movie
    //console.log(`${title} - ${overview} - ${tagline}`);
    if ((title.toLowerCase()).includes(searchInfo) || ((overview.toLowerCase()).includes(searchInfo)) || ((tagline.toLowerCase()).includes(searchInfo)) || containsGenre(genres, searchInfo)){
      searchMovies.push(movie);
    }
  }
  console.log(searchMovies)
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