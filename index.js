var dealerSum = 0;
var mySum = 0;

var dealerAceCount = 0;
var myAceCount = 0; 

var hidden;
var deck;

var canHit = true; 

let messageEl = document.getElementById("message-el")

window.onload = function() {
    buildDeck(); 
    shuffleDeck(); 
    startGame();
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];

    deck = [];
    for (let i = 0; i < types.length; i++) { // for every index of i and j for types and values -> form a different cards within the deck//
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]); 
        }
    }

}

function shuffleDeck() { // changing the card order in the deck randomly by storing the card in temp and change its order//
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck); 
}

function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden); // keeps the card hidden away from user//
    dealerAceCount += checkAce(hidden);
    while (dealerSum < 17) { // requirement to make dealer to pick a card if the sum value <17 //
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card); 
        dealerAceCount += checkAce(card); 
        document.getElementById("dealer-cards").append(cardImg); 
    }
    console.log(dealerSum);

    for (let i = 0; i < 2; i++) { 
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        mySum += getValue(card);
        myAceCount += checkAce(card);
        document.getElementById("my-cards").append(cardImg);
    }

    console.log(mySum);
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);

}

function hit() { //adding a card into your sum//
    if (!canHit) {
        return;
    } else{

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    mySum += getValue(card);
    myAceCount += checkAce(card);
    document.getElementById("my-cards").append(cardImg);

    if (reduceAce(mySum, myAceCount) > 21) { // tells that your sum > 21 so no point in having more cards// 
        canHit = false;
    }

}
}

function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    mySum = reduceAce(mySum, myAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";

    let message = "";
    if (mySum > 21) {
        message = "You Lose!";
    }
    else if (dealerSum > 21) {
        message = "You win!";
    }
    
    else if (mySum == dealerSum) {
        message = "Tie!";
    }
    else if (mySum > dealerSum) {
        message = "You Win!";
    }
    else if (mySum < dealerSum) {
        message = "You Lose!";
    }

    dealerSum = document.getElementById("dealer-sum").innerText;
    mySum = document.getElementById("my-sum").innerText;
    message = document.getElementById("results").innerText;
}

function getValue(card) {
    let data = card.split("-"); 
    let value = data[0];

    if (isNaN(value)) { //sometimes the Ace can have a value == 11 if needed//
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card) {  
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) { // as Ace's vale declared as == 11 -> playersum > 21 logically // 
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}
