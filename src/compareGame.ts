import { Deck } from "deck";

export abstract class CompareGame {

	private static readonly DECKS = [
		Deck.fromNames(["Knight", "Mage", "Rogue", "Cleric", "Bard"]),
		Deck.fromNames(["foo", "bar", "baz", "qux", "quux"]),
		Deck.fromNames(["Ace", "King", "Queen", "Jack", "Joker"]),
		Deck.fromNames(["The Fool", "The Magician", "The Hermit", "The Chariot", "Judgement"]),
		Deck.fromNames(["Rook", "Knight", "Bishop", "Queen", "King"]),
		Deck.fromNames(["Cyan", "Magenta", "Yellow", "Black", "White"]),
		Deck.fromNames(["html", "div", "span", "link", "script"])
	];

	private static randomDeckIdx() {
		return Math.floor(Math.random() * CompareGame.DECKS.length);
	}

	protected player: Deck;
	protected opponent: Deck;

	/**
	 * Initialise a simple comparison game,
	 * player and their opponent are given a random deck from the pool
	 */
	constructor() {
		const playerIdx = CompareGame.randomDeckIdx();
		let opponentIdx = playerIdx;
		while (opponentIdx === playerIdx) {
			opponentIdx = CompareGame.randomDeckIdx();
		}
		this.player = CompareGame.DECKS[playerIdx];
		this.opponent = CompareGame.DECKS[opponentIdx];
	}

	public async start() {
		// Virtual function
	}

}
