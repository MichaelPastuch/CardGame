import { expect, describe, test } from "bun:test";
import { Prng } from "prng";

describe("prng", () => {

	const prng = new Prng(0);
	const numSamples = 255;
	const mid = 128;
	const deviate = 74;
	const tolerance = 8;

	// Generate a set of random numbers
	const testSet = Array.from({ length: numSamples })
		.map(() => prng.next())
		// Sort samples for validating range
		.sort((left, right) => left - right);

	const average = testSet.reduce((acc, val) => acc + val, 0) / numSamples;

	test("average close to middle of number range", () => {
		expect(average).toBeWithin(mid - tolerance, mid + tolerance);
	});

	// About 68% of values ideally within 1 standard deviation
	const variance = testSet.reduce((acc, val) => acc + (val - average) ** 2, 0) / numSamples;
	const standardDeviation = Math.sqrt(variance);

	test("standard deviation close to expected", () => {
		expect(standardDeviation).toBeWithin(deviate - tolerance, deviate + tolerance);
	});

	const min = testSet[0];
	test("minimum close to 0", () => {
		expect(min).toBeLessThanOrEqual(1);
	});

	const max = testSet[numSamples - 1];
	test("maximum close to 255", () => {
		expect(max).toBeGreaterThanOrEqual(254);
	});

	const median = testSet[Math.floor(numSamples / 2)];
	test("median close to middle of number range", () => {
		expect(median).toBeWithin(mid - tolerance, mid + tolerance);
	});

	console.debug({ average, standardDeviation, min, max, median });
});
