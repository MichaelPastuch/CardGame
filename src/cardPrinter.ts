import { Card } from "card";

/** Utility class for "printing" cards to strings */
export class CardPrinter {

	private static readonly CLI_WIDTH = 20;
	private static readonly INNER_WIDTH = this.CLI_WIDTH - 2;

	/** Center given text with respect to CLI presentation */
	private static centerText(text: string, spacer = " ") {
		const clampText = text.length > CardPrinter.INNER_WIDTH
			? text.substring(0, CardPrinter.INNER_WIDTH - 3) + "..."
			: text;
		const padLeft = Math.floor((CardPrinter.INNER_WIDTH - clampText.length) * 0.5);
		const padRight = CardPrinter.INNER_WIDTH - clampText.length - padLeft;
		return spacer.repeat(padLeft) + clampText + spacer.repeat(padRight)
	}

	private static printLine(text: string) {
		return `║${this.centerText(text)}║\n`;
	}

	/** "Draw" the card to terminal */
	public static print(card: Card): string {
		const spacer = CardPrinter.printLine("");
		// Center card name in frame
		return `╔${CardPrinter.centerText(` ${card.name} `, "═")}╗\n` +
			spacer +
			spacer +
			CardPrinter.printLine(`Attack: ${card.atk}`) +
			spacer +
			CardPrinter.printLine(`Defence: ${card.def}`) +
			spacer +
			CardPrinter.printLine(`Speed: ${card.spd}`) +
			spacer +
			spacer +
			`╚${CardPrinter.centerText(` Total: ${card.total} `, "═")}╝`;
	}
}