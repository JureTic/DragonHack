$(document).ready(function () {
  var recording = false;
  var startStopbutton = $("#startStopButton");
  var buttonTxt = $("#startStopButton p");
  startStopbutton.click(function (event) {
    if (!recording) {
      buttonTxt.text("Recording...");
      recording = true;
      speechToEmotion();
    }
  });

  function speechToEmotion() {
    const recognition = new webkitSpeechRecognition()
    recognition.lang = 'en-US'
    recognition.continuous = true

    recognition.onresult = function(event) {
      const results = event.results
      const transcript = results[results.length-1][0].transcript
      //searching
      

      fetch(`/cocktail?text=${transcript}`)
        .then((response) => response.json())
        .then((result) => {
          recognition.stop();
          $("#emotionText").text(result.emotion)
          // TODO: set emotion text field
          // TODO: set up cocktail descriptions
        })
        .catch((e) => {
          console.error('Request error -> ', e)
          recognition.abort()
        })
    }
    //error
    recognition.onerror = function(event) {
      console.error('Recognition error -> ', event.error)
    }

    $("#tryAgainButton").click(function () {
      recognition = new webkitSpeechRecognition();
      recognition.start();
    });

    recognition.start();
  }

});

