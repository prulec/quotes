let quotesData
const $quoteBox = document.querySelector('#quote-box')
const $body = document.querySelector('body')
const url = "quotes.json"

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

  /*
  const $icon = document.querySelector('.icon > i')
  $icon.style.color = $body.style.backgroundColor
  */

  const $button = document.querySelector('#new-quote > button')
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

fetch(url)
  .then(res => res.ok ? res.json() : Promise.reject(res))
  .then(json => {
    quotesData = json.quotes
    $quoteBox.style.display = "flex"
    console.log(quotesData.length)
    getQuote(quotesData)
  })
  .catch(err => {
    console.log("Error: ", err.status)
    
    $body.style.backgroundColor = "#5B6157"
  
    const $error = document.createElement("h2")
    $error.textContent = `Error: ${err.status}`
    $error.style.color = "white"
    $error.style.textAlign = "center"
    $error.style.padding = "3rem"
  
    $body.appendChild($error)
  })
