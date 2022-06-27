let quotesData
const $quoteBox = document.querySelector('#quote-box')
const $body = document.querySelector('body')

const getColor = () => {
  const darkMode = Math.round(Math.random()) ? true : false
  const $by = document.querySelector('#by')
  
  if (darkMode) {
    
    $quoteBox.style.backgroundColor = "rgba(0,0,0,0.8)"
    
    $body.style.backgroundColor = `rgba(
      ${Math.floor(Math.random() * (255-140) + 140)},
      ${Math.floor(Math.random() * (255-140) + 140)},
      ${Math.floor(Math.random() * (255-140) + 140)}, 1
    )`
  } else {
    
    $quoteBox.style.backgroundColor = "rgba(255,255,255,0.8)"
    
    $body.style.backgroundColor = `rgba(
      ${Math.floor(Math.random() * 116)},
      ${Math.floor(Math.random() * 116)},
      ${Math.floor(Math.random() * 116)}, 1
    )`
  }
  
  $by.style.color = $quoteBox.style.backgroundColor
  
  $body.style.color = $body.style.backgroundColor

  const $icon = document.querySelector('#icon > i')
  $icon.style.color = $body.style.backgroundColor

  const $button = document.querySelector('#new-quote')
  $button.style.color = $body.style.backgroundColor
    
}

const getQuote = (quotesArray) => {
  const index = Math.floor(Math.random() * quotesArray.length)
  const { quote, author } = quotesArray[index]
  document.querySelector("#quote-text").textContent = quote
  document.querySelector("#author").textContent = `- ${author}`
  getColor()
}

// EJECUCIÓN

fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
  .then(res => res.ok ? res.json() : Promise.reject(res))
  .then(json => {
    quotesData = json.quotes
    $quoteBox.style.display = "inherit"
    getQuote(quotesData)
  })
  .catch(err => {
    console.log("Error: ", err.status)
    
    $body.style.backgroundColor = "#5B6157"
  
    const $error = document.createElement("h3")
    $error.textContent = `Error: ${err.status}`
    $error.style.color = "white"
    $error.style.textAlign = "center"
    $error.style.padding = "20px"
  
    $body.appendChild($error)
  })
