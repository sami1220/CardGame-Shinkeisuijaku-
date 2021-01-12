(function() {  
  'use strict';
  
  let pairs = 8;
  let cardRandom = [];

  let flipCount = 0;
  let firstCard = null;
  let secondCard = null;

  let startTime;
  let timeRunning = false;
  let correctCount = 0;
  let timeoutId;
  
  function init() {
    let i;
    let card;
    for (i = 1; i <= pairs; i++) {
      cardRandom.push(createCard(i));
      cardRandom.push(createCard(i));
    }
    while(cardRandom.length) {
      card = cardRandom.splice(Math.floor(Math.random() * cardRandom.length), 1)[0];
      document.getElementById('card-stage').appendChild(card); 
    }
  }
  
  function createCard(num) {
    let container;
    let card;
    let inner;
    inner = '<div class="card-front">' + num + '</div><div class="card-back"></div>';
    card = document.createElement('div');
    card.innerHTML = inner;
    card.className = 'card';

    // カードをクリックした時の関数
    card.addEventListener('click', function() {
      flipCard(this);
      if (timeRunning === true) {
        return;
      }
      timeRunning = true;
      startTime = Date.now();
      runTimer();
    });

    container = document.createElement('div');
    container.className = 'all-container';
    container.appendChild(card);
    return container;
  }

  function flipCard(card) {
    if (firstCard !== null && secondCard !== null) {
      return;
    }
    if(card.className.indexOf('open') !== -1) {
      return;
    }
    card.className = 'card open';
    flipCount++;
    if (flipCount % 2 === 1) {
      firstCard = card;
    } else {
      secondCard = card;
      secondCard.addEventListener('transitionend', check);
    }
  }
  
  function check() {
    if (
      firstCard.children[0].textContent !==
      secondCard.children[0].textContent
      ) {
        firstCard.className = 'card';
        secondCard.className = 'card';
      } else {
        correctCount++;
        if(correctCount === pairs) {
          clearTimeout(timeoutId);
        }

      }
      secondCard.removeEventListener('transitionend', check);
      firstCard = null;
      secondCard = null;
    }

    function runTimer() {
      document.getElementById('time').textContent = ((Date.now() - startTime) /1000).toFixed(2);
      timeoutId = setTimeout(function() {
        runTimer()
      }, 10);
    }

    init();
  })();
  