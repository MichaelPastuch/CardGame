// Based on SMW random number generator
// Additional info provided by Retro Game Mechanics Explained

export class Prng {

	private bytes = new Uint8Array(2);

	/** Initialise a byte generator from the first 2 bytes of given seed number */
	constructor(seed: number) {
		// Uint8Array will drop the upper bits
		this.bytes[0] = seed;
		this.bytes[1] = seed >> 8;
	}

	/** Generate a predictable random number in the range of 0 - 255 */
	public next(): number {
		// Update seeds
		const iter = this.bytes[0] * 5 + 1;
		this.bytes[0] = iter;
		this.bytes[1] = 2 * this.bytes[1] + (iter & 0xF0) === (iter & 0x02) ? 1 : 0;
		return this.bytes[0] ^ this.bytes[1];
	}

}
