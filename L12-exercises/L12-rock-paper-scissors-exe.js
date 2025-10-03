let score = JSON.parse(localStorage.getItem('score')) || {
       wins: 0,
       losses: 0,
       ties: 0
      };
      
      updateScoreElement();

     /* if (score === null) {
        score = {
          wins: 0,
          losses: 0,
          ties: 0
        }
      }*/

let isAutoPlaying = false;
let intervalId; //we need to save id of the interval to clear it later

    //const autoPlay = () => {};
function autoPlay() {
if(!isAutoPlaying) {
  intervalId = setInterval( () => { //we saved the interval here
    const playerMove = pickComputerMove();
    playGame(playerMove)
  }, 1000);
  isAutoPlaying = true;
  document.querySelector('.js-auto-play-button').textContent = 'Stop Playing';
}else{
  clearInterval(intervalId); // we cleared interval here
  isAutoPlaying = false;
  document.querySelector('.js-auto-play-button').textContent = 'Auto Play';
}
}

  document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('Rock')
  });
  
  document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('Paper')
  });

  document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGame('Scissors')
  });

  document.querySelector('.js-reset-score-button').addEventListener('click', () => {
    resetScore();
  });

  document.querySelector('.js-auto-play-button').addEventListener('click', ()=>{
    autoPlay();
  })

  document.body.addEventListener('keydown', (event) => {
      if(event.key === 'r') {
      playGame('Rock');
      }else if(event.key === 'p'){
      playGame('Paper');
      }else if(event.key === 's'){
      playGame('Scissors');
      };
  });

  document.body.addEventListener('keydown', (event) => {
      if(event.key === 'a'){
      autoPlay();
      }
  })

  document.body.addEventListener('keydown', (event) => {
    if(event.key === 'Backspace'){
      resetScore();
    }
  })

function playGame (playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'Scissors'){ //scissors
    if(computerMove === 'Rock'){
      result = 'You lose';
    }else if (computerMove === 'Paper'){
      result = 'You win';
    }else if (computerMove === 'Scissors'){
      result = 'Tie';
    }

  }else if (playerMove === 'Paper'){//paper
    if(computerMove === 'Rock'){
      result = 'You win';
    }else if (computerMove === 'Paper'){
      result = 'Tie';
    }else if (computerMove === 'Scissors'){
      result = 'You lose';
    }

  }else if (playerMove === 'Rock'){//rock
    if(computerMove === 'Rock'){
      result = 'Tie';
    }else if (computerMove === 'Paper'){
      result = 'You lose';
    }else if (computerMove === 'Scissors'){
      result = 'You win';
    }
  }

  if(result === 'You win') {
    score.wins += 1;
  }else if (result === 'You lose') {
    score.losses += 1;
  }else if (result === 'Tie') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));//to save inside the local storage
  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You <img src="../images/${playerMove}-emoji.png" alt="" class="move-icon"> <img src="../images/${computerMove}-emoji.png" alt="" class="move-icon">computer`
}

function updateScoreElement () {
  document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
}

function resetScore () {
  const paraElement = document.querySelector('.js-reset-score-tooltip');
  paraElement.innerHTML = `Are you sure you want to reset score? 
                          <button class="js-yes-button yes-button">Yes</button>
                          <button class="js-no-button no-button">No</button>`
  
  const yesBtn = document.querySelector('.js-yes-button');
      yesBtn.addEventListener('click', () => {
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        updateScoreElement()
        paraElement.innerHTML = '';
      })
  const noBtn = document.querySelector('.js-no-button');
      noBtn.addEventListener('click', () => {
        paraElement.innerHTML = '';
      })
};

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1/3){
    computerMove = 'Rock';
  }else if (randomNumber >= 1/3 && randomNumber < 2/3){
    computerMove = 'Paper';
  }else if (randomNumber >= 2/3 && randomNumber < 1){
    computerMove = 'Scissors';
  }

return computerMove;//returning the value from the function

}

