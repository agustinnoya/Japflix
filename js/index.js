
info = ""

document.addEventListener("DOMContentLoaded", function (e) {
  fetch("https://japceibal.github.io/japflix_api/movies-data.json")
    .then(response => response.json())
    .then(data => { console.log(data); return data })
    .then(data => { info = data; return data })
    .then(info => { console.log("fetch", info); return info })
    .catch(error => console.log(error))
});