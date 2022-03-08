// main variables
let theInput = document.querySelector('.get-repos input'),
  getButton = document.querySelector('.get-button'),
  reposData = document.querySelector('.show-data')

getButton.addEventListener('click', function () {
  getRepos()
})

// get repos function
function getRepos() {
  if (theInput.value == '') {
    reposData.innerHTML = `<span>Please Write Github Username</span>`
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((response) => response.json())
      .then((repos) => {
        // empty the container
        reposData.innerHTML = ''
        // loop on repos
        repos.forEach((repo) => {
          // create main div
          let mainDiv = document.createElement('div')

          // create repo name text
          let repoName = document.createTextNode(repo.name)

          // append repoName to mainDiv
          mainDiv.appendChild(repoName)

          // create repo url
          let theUrl = document.createElement('a')

          // create repo url text
          let urlText = document.createTextNode('Visit')

          // append the text of url to url
          theUrl.appendChild(urlText)

          // add the hypertext reference to url
          theUrl.href = `https://github.com/${theInput.value}/${repo.name}`

          // open the url in new window
          theUrl.target = '_blank'

          // append url link to main div
          mainDiv.appendChild(theUrl)

          // create stars count span
          let starsSpan = document.createElement('span')

          // create stars text
          let starsSpanText = document.createTextNode(
            `Stars ${repo.stargazers_count}`,
          )
          // add stars text to stars span
          starsSpan.appendChild(starsSpanText)

          // append starsSpan to main div
          mainDiv.appendChild(starsSpan)

          // add class on main div
          mainDiv.className = 'repo-box'

          // append the main div to container
          reposData.appendChild(mainDiv)

          // empty input value
          theInput.value = ''
        })
      })
  }
}

// json placeholder
