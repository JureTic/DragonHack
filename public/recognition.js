document.addEventListener('DOMContentLoaded', speechToEmotion, false)

function speechToEmotion() {
  const recognition = new webkitSpeechRecognition()
  recognition.lang = 'en-US'
  recognition.continuous = true

  recognition.onresult = function(event) {
    const results = event.results
    const transcript = results[results.length-1][0].transcript
    //searching
    setEmoji('searching')

    fetch(`/cocktail?text=${transcript}`)
      .then((response) => response.json())
      .then((cocktail) => {
        
      })
      .catch((e) => {
        console.error('Request error -> ', e)
        recognition.abort()
      })
  }
  //error
  recognition.onerror = function(event) {
    console.error('Recognition error -> ', event.error)
    setEmoji('glass')
  }
  //listening
  recognition.onaudiostart = function() {
    setEmoji('glass')
  }
  //idle
  recognition.onend = function() {
    setEmoji('glass')
  }

  recognition.start();

  function setEmoji(type) {
    const emojiElem = document.querySelector('.emoji img')
    emojiElem.classList = type
  }
}