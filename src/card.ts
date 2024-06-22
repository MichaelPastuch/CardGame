
export class Card {

	private static readonly CLI_WIDTH = 20;
	private static readonly INNER_WIDTH = this.CLI_WIDTH - 2;

	/** Generate card stats based on a given name */
	public static generate(name: string) {
		// Very crude name character code hash + bitwise "tinkering"
		const magicNumber = 170;
		const hash = name
			.split("")
			.reduce((acc, char) => acc + char.charCodeAt(0), 0);
		const strBase = (hash | magicNumber);
		const magBase = ((strBase << 2) | magicNumber);
		const spdBase = ((magBase << 2) | magicNumber);
		// Clamop stats to 0-32
		return new Card(name, strBase % 33, magBase % 33, spdBase % 33);
	}

	constructor(
		private readonly name: string,
		// Should be integer values
		private readonly str: number,
		private readonly def: number,
		private readonly spd: number
	) { }

	public get total(): number {
		return this.str + this.def + this.spd;
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

	/**
	 * "Draw" the card
	 */
	public get cli(): string {
		const spacer = Card.cliLine("");
		// Center card name in frame
		return `╔${Card.cliCenter(` ${this.name} `, "═")}╗\n` +
			spacer +
			spacer +
			Card.cliLine(`Strength: ${this.str}`) +
			spacer +
			Card.cliLine(`Defence: ${this.def}`) +
			spacer +
			Card.cliLine(`Speed: ${this.spd}`) +
			spacer +
			spacer +
			`╚${Card.cliCenter(` Total: ${this.total} `, "═")}╝`;
	}

}
