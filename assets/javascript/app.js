$(document).ready(function() {
  var key = 'PW7OxeB8iUm6Lt5NvbP3Am0i0y8vbTmP';

  //Theme: 
  var questions = [
    {
      question : "What is the largest living organism on earth?",
      choices : ["Blue Whale","Jaba The Hut","Fungus in Eastern Oregon","Giant Squid"],
      answer: "Fungus in Eastern Oregon",
      gifURL : "http://api.giphy.com/v1/gifs/search?q=fungus&apikey=" + key + "&limit=2",
      wiki : "https://en.wikipedia.org/wiki/Largest_organisms#Fungi"
    },
    {
      question : "Which discovery/invention did NOT happen at Bell Labs in New Jersey?",
      choices : ["Invention of the Transistor","Unix Operating Systems","The first observence of Cosmic Microwave Background (radiation left over from the Big Bang)","Discovery of the Double-Helix structure of DNA"],
      answer: "Discovery of the Double-Helix structure of DNA",
      gifURL : "",
    },
    {
      question : "hey",
      choices : ["1","2","3","4"],
      answer: "",
      gifURL : "",
    },
    {
      question : "sup",
      choices : ["1","2","3","4"],
      answer: "",
      gifURL : "",
    },
    {
      question : "ello",
      choices : ["1","2","3","4"],
      answer: "",
      gifURL : "",
    },
    {
      question : "yo",
      choices : ["1","2","3","4"],
      answer: "",
      gifURL : "",
    },
    {
      question : "hi",
      choices : ["1","2","3","4"],
      answer: "",
      gifURL : "",
    },
  ];
  var roundQuestion;
  var randomNum;
  var timerInterval;
  var countDownNum = 20;
  
  

// object of game functions
  var trivia = {
    chooseQuestion: function(){
      randomNum = [Math.floor(Math.random() *questions.length)];
      roundQuestion = questions[randomNum];
      console.log(roundQuestion)
    },

    countDown: function(){
      timerInterval = setInterval(function() {
        countDownNum--
        $('#timer').text(countDownNum);
        if (countDownNum <= 0){
          clearInterval(timerInterval);
          $("body").html("time's up, you lose");
        }}
        , 1000); 
    },

    roundStart: function() {
      // trivia.chooseQuestion();
      roundQuestion = questions[0];
      trivia.countDown();
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

    roundWin: function(){
      trivia.getGif(roundQuestion.gifURL);
      
    },

    roundLose: function(){

    },

    getGif: function(queryURL){
      $.ajax({
        url: queryURL,
        method: "GET"
        }).done(function(response) {
          var url = response.data[1].images.fixed_height.url;
          console.log(response)
          $('.gif-div').html('<img src="' + url + '">');
          $('.gif-div').append('<a href= "' + roundQuestion.wiki + '" target="_blank" >Wiki Article</a>');
        });
    }
  };




// event listeners.
 
  $('.start-btn').on('click', function(){
    $('#timer-div').show();
    $('.start-btn').hide();
    trivia.roundStart();
  });

  $(document).on('click', '.answer-btn', function(){
    var guess = $(this).text();
    trivia.checkAnswer(guess, roundQuestion.answer);
  });

});