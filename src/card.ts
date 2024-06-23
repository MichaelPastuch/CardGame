import { Prng } from "prng";

export class Card {

	private static readonly CLI_WIDTH = 20;
	private static readonly INNER_WIDTH = this.CLI_WIDTH - 2;

	/** Generate card stats based on a given name */
	public static generate(name: string) {
		const checksum = Array.from(name)
			.reduce((acc, char) => acc + char.charCodeAt(0), 0);
		const gen = new Prng(checksum);
		// Generate stat weights
		const weights = [gen.next(), gen.next(), gen.next()];
		const max = weights.reduce((acc, val) => Math.max(acc, val), 0);
		// Determine card "tier" based on total
		const tier = weights.reduce((acc, val) => acc + val, 0) % 12;
		// Max stat is 100, subtract tier to get potential for this card
		const base = 100 - tier;
		// Normalize weights against max
		const stats = weights.map((val) => Math.round(base * val / max));
		return new Card(name, stats[0], stats[1], stats[2]);
	}

	constructor(
		private readonly name: string,
		// Should be integer values from 0 - 100
		private readonly atk: number,
		private readonly def: number,
		private readonly spd: number
	) { }

	public get total(): number {
		return this.atk + this.def + this.spd;
	}

	public get average(): number {
		return this.total / 3;
	}

	/** Center given text with respect to CLI presentation */
	private static cliCenter(text: string, spacer = " ") {
		const clampText = text.length > Card.INNER_WIDTH
			? text.substring(0, Card.INNER_WIDTH - 3) + "..."
			: text;
		const padLeft = Math.floor((Card.INNER_WIDTH - clampText.length) * 0.5);
		const padRight = Card.INNER_WIDTH - clampText.length - padLeft;
		return spacer.repeat(padLeft) + clampText + spacer.repeat(padRight)
	}

	private static cliLine(text: string) {
		return `║${this.cliCenter(text)}║\n`;
	}

	/** "Draw" the card to terminal */
	public get cli(): string {
		const spacer = Card.cliLine("");
		// Center card name in frame
		return `╔${Card.cliCenter(` ${this.name} `, "═")}╗\n` +
			spacer +
			spacer +
			Card.cliLine(`Attack: ${this.atk}`) +
			spacer +
			Card.cliLine(`Defence: ${this.def}`) +
			spacer +
			Card.cliLine(`Speed: ${this.spd}`) +
			spacer +
			spacer +
			`╚${Card.cliCenter(` Total: ${this.total} `, "═")}╝`;
	}

}
