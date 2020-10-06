// get the container for the gif results
const gifResultsContainer = document.getElementById('gifResultsContainer')
// get the form to listen to user events
const form = document.getElementById('form')

form.addEventListener('submit', (e) => {
  e.preventDefault(); // prevent native form submit to server

  const searchTerm = form.querySelector('#userInput').value
  const numOfResults = form.querySelector('#userNum').value
  const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=EM8ojznCEIF17I5x50dWyzU6gw6qiCxK&q=${searchTerm}&limit=${numOfResults}&offset=0&rating=g&lang=en`

  // get data and send to render helper
  fetch(endpoint).then((response) => {
    let responsePromise = response.json()
    responsePromise.then((data => renderGifs(data && data.data ? data.data : [])))
  })  //.catch error
})

function createGifTout(gif) {
  // create tout elemt
  const tout = document.createElement('div')
  // tout.className = 'card col-4'
  tout.innerHTML = `
        <div class="column gif-image">
          <img class="card-img-top" src="${gif.images.downsized.url}" alt="${gif.title}" />

        </div>
      `
  return tout
}

function renderGifs(gifs) {
  // clear results
  gifResultsContainer.innerHTML = ''

  // render each gif
  gifs.forEach((gif) => {
    const tout = createGifTout(gif)
    gifResultsContainer.appendChild(tout)
  })
}
