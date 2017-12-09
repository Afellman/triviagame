$(document).ready(function() {
  var key = 'PW7OxeB8iUm6Lt5NvbP3Am0i0y8vbTmP';
  var roundQuestion;
  var randomNum;
  var timerInterval;
  var wrongURL = "http://api.giphy.com/v1/gifs/search?q=fungus&apikey=" + key + "&limit=5";
  var gif;
  var iter;
  var winCount;
  var loseCount;

  //Theme: 
  var questions = [
    {
      question : "What is the largest living organism on earth?",
      choices : ["Blue Whale","Jaba The Hut","Fungus in Eastern Oregon","Giant Squid"],
      answer: "Fungus in Eastern Oregon",
      wiki : "https://en.wikipedia.org/wiki/Largest_organisms#Fungi",
      imgURL : ""
    },
    {
      question : "Which discovery/invention did NOT happen at Bell Labs in New Jersey?",
      choices : ["Invention of the Transistor","Unix Operating Systems","The first observence of Cosmic Microwave Background (radiation left over from the Big Bang)","Discovery of the Double-Helix structure of DNA"],
      answer: "Discovery of the Double-Helix structure of DNA",
      wiki : "",
      imgURL : ""
    },
    {
      question : "hey",
      choices : ["1","2","3","4"],
      answer: "",
      wiki : "",
      imgURL : ""
    },
    {
      question : "sup",
      choices : ["1","2","3","4"],
      answer: "",
      wiki : "",
      imgURL : ""
    },
    {
      question : "ello",
      choices : ["1","2","3","4"],
      answer: "",
      wiki : "",
      imgURL : ""
    },
    {
      question : "yo",
      choices : ["1","2","3","4"],
      answer: "",
      wiki : "",
      imgURL : ""
    },
    {
      question : "hi",
      choices : ["1","2","3","4"],
      answer: "",
      wiki : "",
      imgURL : ""
    },
  ];

  

// object of game functions
  var trivia = {
    gameStart: function(){
      $('.start-btn').on('click', function(){
        winCount = 0;
        loseCount = 0;
        $('#timer-div').show();
        $('.start-btn').hide();
        iter = 0;  
        trivia.roundStart();
      });

      

    },

    countDown: function(num){
      timerInterval = setInterval(function() {
        num--;
        $('#timer').text(num);
        if (num <= 0){
          clearInterval(timerInterval);
          $("body").html("time's up, you lose");
        }}
        , 1000); 
    },

    roundStart: function() {
      // trivia.chooseQuestion();
      var countDownNum = 20;
      $('#timer').text(countDownNum);
      this.countDown(countDownNum);
      if (iter >= questions.length) {
        trivia.playAgain();
        return;
      };
      console.log(iter);
      console.log('questions' + questions.length)
      roundQuestion = questions[iter];
      $('#answers').empty();
      $('#question').html(roundQuestion.question);
      for (var i = 0; i < roundQuestion.choices.length; i++){
        $('#answers').append($("<button>")
          .addClass('answer-btn')
          .text(roundQuestion.choices[i]));
      };
    },

    checkAnswer: function(guess, answer) {
      clearInterval(timerInterval);
      console.log(guess, answer)
      if (guess == answer){
        this.roundWin();
      }
      else {
        this.roundLose();
      };
    },

    playAgain: function() {
      console.log('check over before if');
        clearInterval(timerInterval);
        console.log('interval cleared');
        $('#question').html('<h1>Game Over</h1>');
        $('#question').append('<button id="play-again">Play Again?</button>');
        $('#answers').html('You got: ' + winCount + 'correct');
        $('#answers').append('You got: ' + loseCount + 'wrong');
        $(document).on('click', '#play-again', function() {
          console.log('inside func')
          trivia.gameStart();
        });
      },

    roundWin: function(){
      $('#answers').html('<h1>You got it!');
      $('#answers').append('<span>Check it out! </span><a href= "' + roundQuestion.wiki + '" target="_blank" >Wiki Article</a>');
      setTimeout(function(){
        iter++;
        winCount++;
       trivia.roundStart();
      }, 100);
     
    },

    roundLose: function(){
      $('#answers').html('<h1>Wrong!');
      $('#answers').append('<p>The correct answer was ' + roundQuestion.answer + '</p>');
      $('#answers').append('<span>Check it out! </span><a href= "' + roundQuestion.wiki + '" target="_blank" >Wiki Article</a>');
      setTimeout(function(){
        iter++
        loseCount++
        trivia.roundStart();
       }, 100);
    },
  };




// event listeners.
 
 // calls function to start the game.
  trivia.gameStart();

  //listens for answer button press
  $(document).on('click', '.answer-btn', function(){
    var guess = $(this).text();
    trivia.checkAnswer(guess, roundQuestion.answer);
  });

});