const cards = document.querySelectorAll('.memory-card');

var eltscore = document.getElementById('score');

var score = 0;

const titre = document.querySelector("h3");
//let i = 0;
titre.style.position = "relative";
let topPos =0;
let dir = -1; //Mise à jour de la vairiable direction




let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


// function hautbas() {
//   // console.log(i);
//   // i++;
//   if (topPos == 30) {dir = 1}
//     else if (topPos == -80) { dir = -1}
//   topPos += -2 * dir;
//   titre.style.top = `${topPos}px`
//    requestAnimationFrame(hautbas);
   
//  }
//  requestAnimationFrame(hautbas);

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

  
    
    return;
  }

  // second click
  secondCard = this;
 

  checkForMatch();
 
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  
  
  isMatch  ? disableCards() : unflipCards();

  if (isMatch) {
    // eltscore.textContent += 'Gagné';
    score += 50;
    eltscore.textContent = score;
    
  }
  

  // eltscore.textContent += 'Gagné';
  // score += 50;
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    
    

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
  
   score = Math.max(0, score-30);
   
   eltscore.textContent = score;
  
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));


