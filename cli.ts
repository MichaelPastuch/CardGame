import { Deck } from "deck";

console.log("Card game");

const testDeck = Deck.fromNames(["Knight", "Mage", "Rogue", "Dragon"]);

// Dump deck to console
testDeck.startGame();
let next = testDeck.nextCard;
while (next) {
	console.log(next.cli);
	next = testDeck.nextCard;
}
