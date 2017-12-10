$(document).ready(function() {

  //setting global variables.
  var roundQuestion;
  var timerInterval;
  var questIter;
  var winCount;
  var loseCount;
  var countDownNum;
  
  //array of objects storing the questions and their info
  var questions = [
    {
      question : "What is the largest living organism on earth?",
      choices : ["Blue Whale","Jaba The Hut","Fungus in Eastern Oregon","Giant Squid"],
      answer: "Fungus in Eastern Oregon",
      wiki : "http://www.bbc.com/earth/story/20141114-the-biggest-organism-in-the-world",
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
      question : "Who invited Bitcoin?",
      choices : ["Steve Jobs","Ellon Musk","Linus Torvalds","Satoshi Nakamoto"],
      answer: "Satoshi Nakamoto",
      wiki : "https://en.wikipedia.org/wiki/Satoshi_Nakamoto",
      imgURL : ""
    },
    {
      question : "What animal species is our closest genetic relative?",
      choices : ["Bonobos","Chimpanzees","Eastern Lowland Gorilla","Bonobos and Chimpanzees equally"],
      answer: "Bonobos and Chimpanzees equally",
      wiki : "http://www.sciencemag.org/news/2012/06/bonobos-join-chimps-closest-human-relatives",
      imgURL : ""
    },
    {
      question : "What animal/insect practices farming besides humans?",
      choices : ["Earthworm","Kangaroos","Leafcutter Ants","Howler Monkeys"],
      answer: "Leafcutter Ants",
      wiki : "https://en.wikipedia.org/wiki/Leafcutter_ant#Ant-fungus_mutualism",
      imgURL : ""
    },
    {
      question : "",
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

  

// object storing all the neccessary game functions.
  var trivia = {
    // count down timer, passing in the starting number as num.
    countDown: function(num) {
      timerInterval = setInterval(function() {
        console.log('interval started');
        console.log(num)
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
        }
      }, 1000)
    },

    // start of each round.
    roundStart: function() {
     // starting the timer.
      $('#timer').text(countDownNum);
      this.countDown(countDownNum);
      // checking if there are questions left.
      if (questIter >= questions.length) {
        trivia.playAgain();
        return;
      };
      // choosing and appending the question for this round
      roundQuestion = questions[questIter];
      $('#answers').empty();
      $('#question').html(roundQuestion.question);
      // building and appending answer choices.
      for (var i = 0; i < roundQuestion.choices.length; i++){
        $('#answers').append($("<button>")
          .addClass('answer-btn')
          .text(roundQuestion.choices[i]));
      };
    },
    // getting the chosen answer from #answer-btn event listener and 
    // deciding what the next function should be based on the results.
    checkAnswer: function(guess, answer) {
      clearInterval(timerInterval);
      if (guess == answer){
        this.roundWin();
      }
      else {
        this.roundLose();
      };
    },

    // telling the user that they won and displaying the relavent article link.
    roundWin: function(){
      $('#answers').html('<h1>You got it!');
      $('#answers').append('<span>Check it out! <a href= "' + 
        roundQuestion.wiki + 
        '" target="_blank" >Article</a></span>'
      );
      //waiting 4 seconds than moving the 
      setTimeout(function(){
        questIter++;
        winCount++;
       trivia.roundStart();
      }, 4000);
     
    },

    roundLose: function(){
      $('#answers').html('<h1>Wrong!');
      $('#answers').append('<p>The correct answer was ' + roundQuestion.answer + '</p>');
      $('#answers').append('<span>Check it out! <a href= "' + roundQuestion.wiki + '" target="_blank" id= "article">Article</a></span>');
      setTimeout(function(){
        questIter++
        loseCount++
        trivia.roundStart();
       }, 4000);
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


  };




// event listeners.

  $('.start-btn').on('click', function(){
    countDownNum = 15;
    winCount = 0;
    loseCount = 0;
    $('#timer-div').show();
    $('.start-btn').hide();
    questIter = 0;  
    trivia.roundStart();
  });

  //listens for answer button press
  $(document).on('click', '.answer-btn', function(){
    var guess = $(this).text();
    trivia.checkAnswer(guess, roundQuestion.answer);
  });






















});

