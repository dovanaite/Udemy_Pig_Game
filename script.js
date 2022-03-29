'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score1El = document.querySelector('#score--0');
const score2El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const buttonNew = document.querySelector('.btn--new');
const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');

let scores;
let currentScore;
let activePlayer;
let playing;


const newGame = function(){
//Starting conditions
score1El.textContent = 0;
score2El.textContent = 0;
diceEl.classList.add('hidden');

scores = [0, 0]; // here we keep scores of player0 and player1
currentScore = 0;
activePlayer = 0;
playing = true; // STATE VARIABLE - we set a value "true" if the game is still happening


score1El.textContent = 0;
score2El.textContent = 0;
current0El.textContent = 0;
current1El.textContent = 0;
player0El.classList.remove('player--winner');
player1El.classList.remove('player--winner');
player0El.classList.add('player--active');
player1El.classList.remove('player--active');
diceEl.classList.add('hidden');
}

newGame();


//function that changes players
const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

//Rolling dice functionality
buttonRoll.addEventListener('click', function() {
    if (playing) {
        //1. generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log('dice number:', dice);

        //2. display a dice
        diceEl.classList.remove('hidden');
        diceEl.src = `./dices/dice-${dice}.png`;

        //3.checked rolled value, if it's 1, switch to another player
        if (dice !== 1) {
            //add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        } else {
            //switch to another player
            switchPlayer();
        }
    }


})





buttonHold.addEventListener('click', function() {
    if (playing) {
        // 1. Add currecnt score to active player's score
        scores[activePlayer] += currentScore;
        // scores[1] = scores[1] + currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. Check if player's score is >=100
        if (scores[activePlayer] >= 100) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner'); //we need to add winning class so we can see that this player has won
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active'); //we need to remove "ative" class, if we don't remove, there will be both "winner" and "active" classes
            diceEl.classList.add('hidden');
        } else {
            //Switch to next player
            switchPlayer();
        }
    }

})

buttonNew.addEventListener('click',function(){
    
    newGame();
    
})