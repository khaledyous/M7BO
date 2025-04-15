class Card {
    constructor(rank, suit) {
      this.rank = rank;
      this.suit = suit;
    }
  
    render(onClick) {
      const div = document.createElement("div");
      div.className = "card";
      div.textContent = `${this.rank} ${this.suit}`;
      if (onClick) div.addEventListener("click", () => onClick(this));
      return div;
    }
  }
  
  class Deck {
    constructor() {
      this.cards = [];
      const suits = ["♥", "♠", "♦", "♣"];
      const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
      for (let suit of suits) {
        for (let rank of ranks) {
          this.cards.push(new Card(rank, suit));
        }
      }
    }
  
    shuffle() {
      this.cards.sort(() => Math.random() - 0.5);
    }
  
    draw() {
      return this.cards.pop();
    }
  }
  
  let deck, playerHand = [], computerHand = [], discardPile = [];
  const playerHandDiv = document.getElementById("player-hand");
  const discardPileDiv = document.getElementById("discard-pile");
  const drawButton = document.getElementById("draw-button");
  const message = document.getElementById("message");
  
  function startGame() {
    deck = new Deck();
    deck.shuffle();
  
    playerHand = [];
    computerHand = [];
    discardPile = [];
  
    for (let i = 0; i < 7; i++) {
      playerHand.push(deck.draw());
      computerHand.push(deck.draw());
    }
  
    discardPile.push(deck.draw());
    render();
  }
  
  function render() {
    // Toon aflegstapel
    discardPileDiv.innerHTML = "";
    const topCard = discardPile[discardPile.length - 1];
    discardPileDiv.appendChild(topCard.render());
  
    // Toon spelerkaarten
    playerHandDiv.innerHTML = "";
    playerHand.forEach(card => {
      const cardEl = card.render(() => playCard(card));
      playerHandDiv.appendChild(cardEl);
    });
  
    checkGameEnd();
  }
  
  function canPlay(card) {
    const topCard = discardPile[discardPile.length - 1];
    return card.rank === topCard.rank || card.suit === topCard.suit;
  }
  
  function playCard(card) {
    if (!canPlay(card)) {
      message.textContent = "Je kunt deze kaart niet spelen!";
      return;
    }
    discardPile.push(card);
    playerHand = playerHand.filter(c => c !== card);
    message.textContent = "Goede zet!";
    render();
    setTimeout(computerTurn, 1000);
  }
  
  drawButton.addEventListener("click", () => {
    const card = deck.draw();
    if (!card) {
      message.textContent = "Geen kaarten meer!";
      return;
    }
    playerHand.push(card);
    message.textContent = "Je hebt een kaart gepakt.";
    render();
    setTimeout(computerTurn, 1000);
  });
  
  function computerTurn() {
    const topCard = discardPile[discardPile.length - 1];
    const playable = computerHand.find(c => canPlay(c));
    if (playable) {
      discardPile.push(playable);
      computerHand = computerHand.filter(c => c !== playable);
      message.textContent = `Computer speelt ${playable.rank} ${playable.suit}`;
    } else {
      const drawn = deck.draw();
      if (drawn) {
        computerHand.push(drawn);
        message.textContent = "Computer kon niet spelen en pakte een kaart.";
      } else {
        message.textContent = "Computer kan niet spelen. Geen kaarten meer.";
      }
    }
    render();
  }
  
  function checkGameEnd() {
    if (playerHand.length === 0) {
      message.textContent = "🎉 Jij wint!";
      drawButton.disabled = true;
    } else if (computerHand.length === 0) {
      message.textContent = "💀 De computer wint!";
      drawButton.disabled = true;
    }
  }
  
  startGame();
  