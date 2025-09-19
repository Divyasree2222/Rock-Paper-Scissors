let score = JSON.parse(localStorage.getItem('score')) || {wins : 0, losses : 0, ties : 0};

       updateScoreElement();

       document.querySelector('.js-rock-button')
        .addEventListener('click', ()=>{
          playGame('rock');
        });

        document.querySelector('.js-paper-button')
        .addEventListener('click', ()=>{
          playGame('paper');
        });

        document.querySelector('.js-scissors-button')
        .addEventListener('click', ()=>{
          playGame('scissors');
        });

        document.body.addEventListener('keydown', ()=>{
          if(event.key === 'r'){
            playGame('rock');
          }
          else if(event.key === 'p'){
            playGame('paper');
          }
          else if(event.key === 's'){
            playGame('scissors');
          }
          else if(event.key === 'a'){
            autoPlay();
          }
        });

      function playGame(playerMove){
        const computerMove = pickComputerMove();
        let result = '';

        if (playerMove === 'scissors') {
          if (computerMove === 'rock') {
            result = 'You lose.';
            score.losses++;
          } else if (computerMove === 'paper') {
            result = 'You win.';
            score.wins++;
          } else if (computerMove === 'scissors') {
            result = 'Tie.';
            score.ties++;
          }

        } else if (playerMove === 'paper') {
          if (computerMove === 'rock') {
            result = 'You win.';
            score.wins++;
          } else if (computerMove === 'paper') {
            result = 'Tie.';
            score.ties++;
          } else if (computerMove === 'scissors') {
            result = 'You lose.';
            score.losses++;
          }
          
        } else if (playerMove === 'rock') {
          if (computerMove === 'rock') {
            result = 'Tie.';
            score.ties++;
          } else if (computerMove === 'paper') {
            result = 'You lose.';
            score.losses++;
          } else if (computerMove === 'scissors') {
            result = 'You win.';
            score.wins++;
          }
        }

        localStorage.setItem('score', JSON.stringify(score));
          document.querySelector('.js-result')
            .innerHTML = `${result}`;
          document.querySelector('.js-move')
            .innerHTML = `You <img class="move-icon" src="images/${playerMove}-emoji.png"> 
              <img class="move-icon" src="images/${computerMove}-emoji.png"> Computer`;
          updateScoreElement();
        
      }

      function pickComputerMove() {
        const randomNumber = Math.random();

        let computerMove = '';

        if (randomNumber >= 0 && randomNumber < 1 / 3) {
          computerMove = 'rock';
        } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
          computerMove = 'paper';
        } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
          computerMove = 'scissors';
        }

        return computerMove;
      }

      document.querySelector('.js-reset-score-button')
        .addEventListener('click', ()=>{
          document.querySelector('.js-message')
            .innerHTML = `Are you sure you want to reset the score?
             <button class="js-yes-button yes-button">Yes</button>  
             <button class="js-no-button no-button">No</button>`;

           document.querySelector('.js-yes-button')
            .addEventListener('click', () => {
              reset();
              document.querySelector('.js-message').innerHTML = '';
            });

          document.querySelector('.js-no-button')
            .addEventListener('click', () => {
              document.querySelector('.js-message').innerHTML = '';
            });
        });

      function reset(){
        score.wins = 0;
        score.ties = 0;
        score.losses = 0;
        localStorage.setItem('score', JSON.stringify(score));
        document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;
      }

      function updateScoreElement(){
        document.querySelector('.js-score')
          .innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;
      }

      document.querySelector('.js-auto-play-button')
        .addEventListener('click', ()=>{
          autoPlay();
        });
      
      let autoPlaying = false;
      let intervalID;

      function autoPlay(){
        if(!autoPlaying){
          const buttonElem = document.querySelector('.js-auto-play-button');
          buttonElem.innerHTML = 'Stop Auto Play';

          function play(){
          const playerMove = pickComputerMove();
          playGame(playerMove);
        }
        intervalID = setInterval(play,1000);
        autoPlaying = true;
        }
        else{
          const buttonElem = document.querySelector('.js-auto-play-button');
          buttonElem.innerHTML = 'Auto Play';

          clearInterval(intervalID);
          autoPlaying = false;
        }
      }
