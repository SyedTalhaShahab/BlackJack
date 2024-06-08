
let DS = 0;
let YS = 0;

let dealerAceCount = 0;
let yourAceCount = 0;

let hidden;
let deck;

let canHit = true; //allows the player (you) to draw while yourSum <= 21

let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let types = ["C", "D", "H", "S"];
deck = [];

window.onload = function () {
    build_the_deck_function();
    shuffle_the_deck_function();
    game_starter();
}

function build_the_deck_function() {
    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]); //A-C -> K-C, A-D -> K-D
        }
    }
    // console.log(deck);
}

function shuffle_the_deck_function() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); // (0-1) * 52 => (0-51.9999)
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    // console.log(deck);
}

function game_starter() {
    hidden = deck.pop();
    DS += get_the_value(hidden);
    dealerAceCount += check_ace(hidden);
    // console.log(hidden);
    // console.log(dealerSum);
    while (DS < 17) {
        //<img src="./cards/4-C.png">
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        DS += get_the_value(card);
        dealerAceCount += check_ace(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    // console.log(dealerSum);

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        YS += get_the_value(card);
        yourAceCount += check_ace(card);
        document.getElementById("your-cards").append(cardImg);
    }

    // console.log(yourSum);
    document.getElementById("hit").addEventListener("click", letter_hit);
    document.getElementById("stay").addEventListener("click", stay_function_part1);

}

// the function checks if it can hit before executing the code inside the if block, which is the reverse of the initial implementation.
function letter_hit() {
    if (canHit) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        YS += get_the_value(card);
        yourAceCount += check_ace(card);
        document.getElementById("your-cards").append(cardImg);

        if (reduce_ace(YS, yourAceCount) > 21) { //A, J, 8 -> 1 + 10 + 8
            canHit = false;
        }
    }
}



// Using a switch statement for determining the result message:
function stay_function_part1() {
    DS = reduce_ace(DS, dealerAceCount);
    YS = reduce_ace(YS, yourAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";

    let message;
    switch (true) {
        case (YS > 21):
            message = "You Lose!";
            break;
        case (DS > 21):
            message = "You Win!";
            break;
        case (YS === DS):
            message = "Tie!";
            break;
        case (YS > DS):
            message = "You Win!";
            break;
        case (YS < DS):
            message = "You Lose!";
            break;
    }

    document.getElementById("dealer-sum").innerText = DS;
    document.getElementById("your-sum").innerText = YS;
    document.getElementById("results").innerText = message;
}


// Using an object lookup for face card values can make the code more concise and potentially faster:
function get_the_value(card) {
    const faceCardValues = {
        "A": 11,
        "J": 10,
        "Q": 10,
        "K": 10
    };

    let data = card.split("-");
    let value = data[0];

    return faceCardValues[value] || parseInt(value);
}


    // use a ternary operator for a more concise implementation:
function check_ace(card) {
    return card[0] === "A" ? 1 : 0;
}


// use a for loop for a different looping structure:
function reduce_ace(playerSum, player_ACE_Count) {
    for (; playerSum > 21 && player_ACE_Count > 0; player_ACE_Count--) {
        playerSum -= 10;
    }
    return playerSum;
}

/*                                  DOUCMENTATION



Initialization and Global Variables:

Variables like DS (Dealer's sum), YS (Your sum), dealerAceCount, and yourAceCount track the current game state.
deck stores the cards, and canHit determines if the player can still draw a card.
Loading and Setup:

window.onload calls three functions to build the deck, shuffle it, and start the game.
Deck Building:

build_the_deck_function() constructs a deck of cards with all values and types.
Shuffling:

shuffle_the_deck_function() shuffles the deck using a random index swap method.
Game Start:

game_starter() initializes the game by drawing cards for the dealer and the player.
The dealer's first card is hidden, and they keep drawing until their sum is 17 or higher.
The player gets two cards and can draw more unless their sum exceeds 21.
Event Listeners:

document.getElementById("hit").addEventListener("click", letter_hit) sets up the "Hit" button.
document.getElementById("stay").addEventListener("click", stay_function) sets up the "Stay" button.
Gameplay Functions:

letter_hit() handles the logic for drawing a new card.
stay_function() concludes the player's turn, reveals the dealer's hidden card, and determines the game result.
Utility Functions:

get_the_value(card) returns the numerical value of a card.
check_ace(card) checks if a card is an Ace.
reduce_ace(playerSum, player_ACE_Count) adjusts the sum if Aces are counted as 11 but cause the player to exceed 21.
*/
