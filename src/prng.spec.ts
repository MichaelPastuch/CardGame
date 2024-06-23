import { expect, test } from "bun:test";
import { Prng } from "prng";

test("pring", () => {

	const prng = new Prng(0);
	const numSamples = 1000;
	const mid = 128;
	const deviate = 74;
	const tolerance = 8;

	// Generate a set of random numbers
	const testSet = Array.from({ length: numSamples }).map(() => prng.next());

	// Average should be close to mid
	const average = testSet.reduce((acc, val) => acc + val, 0) / numSamples;
	expect(average).toBeWithin(mid - tolerance, mid + tolerance);

	// About 68% of values ideally within 1 standard deviation
	const variance = testSet.reduce((acc, val) => acc + (val - average) ** 2, 0) / numSamples;
	const standardDeviation = Math.sqrt(variance);
	expect(standardDeviation).toBeWithin(deviate - tolerance, deviate + tolerance);

	// Sort samples for validating range
	const sorted = testSet.sort((left, right) => left - right);
	// Min/max should be close to the byte range
	const min = sorted[0];
	expect(min).toBeLessThanOrEqual(1);
	const max = sorted[numSamples - 1];
	expect(max).toBeGreaterThanOrEqual(254);
	// Median should be close to mid
	const median = sorted[Math.floor(numSamples / 2)];
	expect(median).toBeWithin(mid - tolerance, mid + tolerance);

	// console.debug({ average, standardDeviation, min, max, median });
});
