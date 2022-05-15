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
    let recognition = new webkitSpeechRecognition()
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
          document.getElementById("recordingscreen").setAttribute("hidden","hidden");
          // TODO: set up cocktail descriptions
          document.getElementById("mainContent1").removeAttribute("hidden");

          document.getElementById("name1").innerHTML = result.cocktails[0].strDrink;
          document.getElementById("img1").src = result.cocktails[0].strDrinkThumb;
          var ingredientstring = "";
          console.log(result);
          for(let i = 1; true ; i++){
            if (result.cocktails[0]["strIngredient" + i] == null ){
              break
            }
            ingredient = result.cocktails[0]["strIngredient" + i];
            if (result.cocktails[0]["strMeasure" + i] == null){
              mesurment = "";
            }
            else {
              mesurment = result.cocktails[0]["strMeasure" + i];
            }
            ingredientstring = ingredientstring + mesurment + " " + ingredient + ", ";

          }
          //strIngredient1
          //strMeasure1
          document.getElementById("ingridients1").innerHTML = ingredientstring;
          document.getElementById("tekst1").innerHTML = result.cocktails[0].strInstructions;

          document.getElementById("name2").innerHTML = result.cocktails[1].strDrink;
          document.getElementById("img2").src = result.cocktails[1].strDrinkThumb;
          ingredientstring = "";
          for(let i = 1; true ; i++){
            if (result.cocktails[1]["strIngredient" + i] == null ){
              break
            }
            ingredient = result.cocktails[1]["strIngredient" + i];
            if (result.cocktails[1]["strMeasure" + i] == null){
              mesurment = "";
            }
            else {
              mesurment = result.cocktails[1]["strMeasure" + i];
            }
            ingredientstring = ingredientstring + mesurment + " " + ingredient + ", ";

          }
          document.getElementById("ingridients2").innerHTML = ingredientstring;
          document.getElementById("tekst2").innerHTML = result.cocktails[1].strInstructions;

          document.getElementById("name3").innerHTML = result.cocktails[2].strDrink;
          document.getElementById("img3").src = result.cocktails[2].strDrinkThumb;
          ingredientstring = "";
          for(let i = 1; true ; i++){
            if (result.cocktails[2]["strIngredient" + i] == null ){
              break
            }
            ingredient = result.cocktails[2]["strIngredient" + i];
            if (result.cocktails[2]["strMeasure" + i] == null){
              mesurment = "";
            }
            else {
              mesurment = result.cocktails[2]["strMeasure" + i];
            }
            ingredientstring = ingredientstring + mesurment + " " + ingredient + ", ";

          }
          document.getElementById("ingridients3").innerHTML = ingredientstring;
          document.getElementById("tekst3").innerHTML = result.cocktails[2].strInstructions;

          console.log(result)

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

