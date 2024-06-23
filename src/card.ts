import { Prng } from "prng";

export class Card {

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
		public readonly name: string,
		// Should be integer values from 0 - 100
		public readonly atk: number,
		public readonly def: number,
		public readonly spd: number
	) { }

	public get total(): number {
		return this.atk + this.def + this.spd;
	}

	public get average(): number {
		return this.total / 3;
	}

}
