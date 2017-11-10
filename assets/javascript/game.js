// The Object for the user's input.
  var user = {
    wins: 0,
    losses: 0,
    guesses: 10,
    correctGuesses: 0,
    currentLetter: "",
    wordList: ["Tyrion", "Daenerys", "Cersei", "Arya", "Sansa", "Eddard", "Catelyn", "Theon", "Samwell", "Margaery", "Ygritte", "Khal", "Brienne", "Jaime", "Littlefinger", "Jon", "Hodor", "Missandei", "Tormund", "Daario"],
    // The word that is being guessed
    theWord: "",
    // An array of the word as it is being solved
    theWordLetters: [],
    // An array of the Displayed word with _ and guessed letters
    answerArray: [],
    // Array of Wrong Guesses
    wrongGuesses: [],
    // All Guesses
    allGuesses: [],
    // All Guesses Array
    lettersLeft: 0,
  }
  var resetWins = function() {
    user.wins= 0;
    user.losses = 0;
    playAgain();
  };
  function resetGame(){
    user.guesses = 10;
    user.allGuesses = [];
    user.correctGuesses = 0;
    user.theWordLetters = [];
    user.answerArray = [];
    user.wrongGuesses = [];
    user.theWord = pickTheWord();
    document.getElementById("char-image").setAttribute("src", "assets/images/GOT-start.jpg");
    renderPage();
  };
  user.theWord = pickTheWord();

  function playAgain(){
    resetGame();
    user.theWord = pickTheWord();
    startNewWord();
    document.getElementById("char-image").setAttribute("src", "assets/images/GOT-start.jpg");
  };
  //
  function pickTheWord(){
    var word = user.wordList[Math.floor(Math.random()*user.wordList.length)];
    user.lettersLeft = word.length;
    return word;
  };
  //
  // Make sure the user enters an alphabet character.
  var isAlphabetCharacter = function(letter) {
    return letter.length === 1 && /[a-z]/i.test(letter);
  };
    // Don't let the user repeat a letter guess.
  var repeatGuess = function( guess ) {
    return user.allGuesses.indexOf(guess) === -1;
  };
  // Put the word into an array of letters.
  function splitTheWordIntoLetters() {
    user.theWordLetters = user.theWord.toUpperCase().split('');
  };
  // Display the stats on the page
  function renderPage(){
    document.getElementById("guesses-wrong").innerHTML = user.wrongGuesses;
    document.getElementById("guesses-left").innerHTML = user.guesses;
    document.getElementById("wins").innerHTML = user.wins;
    document.getElementById("losses").innerHTML = user.losses;
  };
  // Determines if the user has guesses all of the letters by
  // counting _'s remaining in solution array
  var guessedAllLetters = function(guessesArr) {
  // takes an array of letters and underscore as an argument
    return guessesArr.indexOf("_") === -1;
  };
  //
  var startNewWord = function() {
    console.log("Secret word - " + user.theWord );
    splitTheWordIntoLetters();
    // Put _ in the letter places for display --- Maybe or do this on initialization
    for (var j = 0; j < user.theWord.length; j++) {
      user.answerArray[j] = "_";
    }
    document.getElementById("answerArray").innerHTML = user.answerArray.join(" ");
  }
  //
  startNewWord();
  //
  // The Game starts whenever the user presses a key.
  document.onkeyup = function(event) {
  // Determines which key was pressed.
  user.currentLetter = event.key.toUpperCase();
  //
  if(!isAlphabetCharacter(user.currentLetter)) {
    return;
  }
  // Check for repeats
  if(!repeatGuess(user.currentLetter)) {
    alert("You already guessed that letter!");
    return;
  }
  user.allGuesses.push( user.currentLetter );
  //
  if ( user.theWordLetters.indexOf( user.currentLetter ) != -1 ) {
    for ( var x = 0; x < user.lettersLeft; x++ ){
      if ( user.theWordLetters[x] == user.currentLetter ){
        user.answerArray[x] = user.currentLetter;
        user.correctGuesses++;
        document.getElementById("answerArray").innerHTML = user.answerArray.join(" ");
      }
    }
  }
  else {
    user.guesses--;
    user.wrongGuesses.push( user.currentLetter );
    renderPage();
  }

  // If there are no letters left to guess the game is over.
  if ( guessedAllLetters( user.answerArray ) ){
    // document.getElementById("solution").innerHTML = user.theWord;
    document.getElementById("char-image").setAttribute("src", "assets/images/" + user.theWord.toLowerCase()+".jpg");
    user.wins++;
  }
  if ( user.guesses === 0 ){
    user.losses++;
    playAgain();
  }


    // Display Game stats
  renderPage();
  };


