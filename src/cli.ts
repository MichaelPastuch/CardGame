import { Card } from "card";
import { CardPrinter } from "cardPrinter";
import { CompareGame } from "compareGame";

class CliCompareGame extends CompareGame {

	private static readonly ROUNDS = 5;

	private static async promptPlayer(query: string) {
		console.log(query);
		let response = "";
		for await (const line of console) {
			response = line;
			break;
		}
		return response;
	}

	private winCount = 0;

	public override async start() {
		console.log("Starting comparison game");
		this.player.startGame();
		this.opponent.startGame();

		for (let round = 1; round <= CliCompareGame.ROUNDS; round++) {
			await this.playRound(round);
		}

		console.log("End of game");
		console.log(`You won ${this.winCount} time(s) out of ${CliCompareGame.ROUNDS} rounds`);
		if (this.winCount > Math.floor(CliCompareGame.ROUNDS / 2)) {
			console.log("Congratulations!");
		} else {
			console.log("Better luck next time!");
		}
	}

	private compare(playerNum: number, opponentNum: number) {
		console.log(`Player: ${playerNum}, Opponent: ${opponentNum}`);
		if (playerNum > opponentNum) {
			console.log("Success!");
			this.winCount++;
		} else if (playerNum < opponentNum) {
			console.log("Defeat!");
		} else {
			console.log("Tie!");
		}
	}

	private async cardBattle(playerCard: Card, opponentCard: Card) {
		console.log("Select an attribute to compare:");
		const option = await CliCompareGame.promptPlayer("1. Attack, 2. Defence, 3. Speed");
		// TODO Consider moving card comparison function into Card class
		switch (option) {
			case "1":
				this.compare(playerCard.atk, opponentCard.atk);
				break;
			case "2":
				this.compare(playerCard.def, opponentCard.def);
				break;
			case "3":
				this.compare(playerCard.spd, opponentCard.spd);
				break;
			default:
				console.log("Invalid option, let's try that again");
				await this.cardBattle(playerCard, opponentCard);
		}
	}

	private async playRound(round: number) {
		console.log(`Round ${round}`);
		const playerCard = this.player.nextCard;
		const opponentCard = this.opponent.nextCard;
		if (!playerCard || !opponentCard) {
			throw new Error("No cards left to play");
		}
		console.log(CardPrinter.print(playerCard));
		await this.cardBattle(playerCard, opponentCard);
	}

}

// Play the game
await new CliCompareGame().start();
