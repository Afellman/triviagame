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
  var countDownNum;
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
      choices : [
        "Invention of the Transistor","Unix Operating Systems",
      "The first observence of Cosmic Microwave Background (radiation left over from the Big Bang)",
      "Discovery of the Double-Helix structure of DNA"
      ],
      answer: "Discovery of the Double-Helix structure of DNA",
      wiki : "https://en.wikipedia.org/wiki/Bell_Labs",
      imgURL : ""
    },
    {
      question : "Who designed Bitcoin?",
      choices : ["Steve Jobs","Ellon Musk","Linux Torvalds","Unknown"],
      answer: "Unknown",
      wiki : "https://en.wikipedia.org/wiki/Satoshi_Nakamoto",
      imgURL : ""
    },
    {
      question : "What animal is our closest genetic relative?",
      choices : ["Bonobos","Chimpanzees","","Bonobos and Chimpanzees"],
      answer: "Bonobos and Chimpanzees",
      wiki : "http://www.sciencemag.org/news/2012/06/bonobos-join-chimps-closest-human-relatives",
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

    countDown: function(num){
      timerInterval = setInterval(function() {
        console.log('interval started');
        num--;
        $('#timer').text(num);
        if (num <= 0){
          clearInterval(timerInterval);
          // $(".main").empty();
          $('#timer-div').hide();
          $('#answers').empty();
          $('#question').html("<h1>Time's up!</h1>")
          setTimeout(function() {
            
            trivia.playAgain();
          }, 3000);
        };
      }
        , 1000); 
    },

    roundStart: function() {
      console.log('round started')
      $('#timer').text(countDownNum);
      this.countDown(countDownNum);
      if (iter >= questions.length) {
        trivia.playAgain();
        return;
      };
      
      
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
      
      if (guess == answer){
        this.roundWin();
      }
      else {
        this.roundLose();
      };
    },

    playAgain: function() {
      
        clearInterval(timerInterval);
        
        $('#timer-div').hide();
        $('#question').html('<h1>Game Over</h1>');
        $('#question').append('<button id="play-again">Play Again?</button>');
        $('#answers').html('<h3>Correct answers = ' + winCount +' </h3>');
        $('#answers').append('<h3>Incorrect answers = ' + loseCount + '</h3>');
        $(document).on('click', '#play-again', function() {
          
          $('#question').empty();
          $('#answers').empty();
          $('.start-btn').show();
        });
      },

    roundWin: function(){
      $('#answers').html('<h1>You got it!');
      $('#answers').append('<span>Check it out! <a href= "' + roundQuestion.wiki + '" target="_blank" >Article</a></span>');
      setTimeout(function(){
        iter++;
        winCount++;
       trivia.roundStart();
      }, 4000);
     
    },

    roundLose: function(){
      $('#answers').html('<h1>Wrong!');
      $('#answers').append('<p>The correct answer was ' + roundQuestion.answer + '</p>');
      $('#answers').append('<span>Check it out! <a href= "' + roundQuestion.wiki + '" target="_blank" >Article</a></span>');
      setTimeout(function(){
        iter++
        loseCount++
        trivia.roundStart();
       }, 4000);
    },
  };




// event listeners.

  $('.start-btn').on('click', function(){
    countDownNum = 5;
    winCount = 0;
    loseCount = 0;
    $('#timer-div').show();
    $('.start-btn').hide();
    iter = 0;  
    trivia.roundStart();
  });

  //listens for answer button press
  $(document).on('click', '.answer-btn', function(){
    var guess = $(this).text();
    trivia.checkAnswer(guess, roundQuestion.answer);
  });

});