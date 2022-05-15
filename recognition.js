const recognition = new webkitSpeechRecognition()
recognition.lang = 'en-US'
recognition.continuous = true

recognition.onresult = function(event) {
  const results = event.results;
  const transcript = results[results.length-1][0].transcript
  
  console.log('text ->', transcript)
}

recognition.onend = function() {
  console.log('disconnected')
}

recognition.start()