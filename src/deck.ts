import { Card } from "card";
import { Prng } from "prng";

/** Manage a list of cards with a deck "state machine" */
export class Deck {

	// Fisher-Yates shuffle, mutates given array
	private static shuffle(prng: Prng, cards: Card[]) {
		let idx = cards.length;
		while (idx) {
			// Pick a random card
			const pickIdx = prng.next() % idx;
			idx--;
			// Swap with current card
			const temp = cards[idx];
			cards[idx] = cards[pickIdx];
			cards[pickIdx] = temp;
		}
	}

	public static fromNames(names: ReadonlyArray<string>) {
		return new Deck(names.map((name) => Card.generate(name)));
	}

	private prng: Prng;
	private game: Card[] = [];
	private discard: Card[] = [];

	constructor(private readonly cards: ReadonlyArray<Card>) {
		const seed = cards.reduce((acc, card) => acc + card.total, 0);
		this.prng = new Prng(seed);
	}

	public startGame() {
		this.game = this.cards.slice();
		Deck.shuffle(this.prng, this.game);
		this.discard = [];
	}

	public get numCards(): number {
		return this.cards.length;
	}

	public get nextCard(): Card | undefined {
		const next = this.game.pop();
		if (next) {
			this.discard.push(next);
		}
		return next;
	}

}
