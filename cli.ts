import { Card } from "card";

console.log("Card game");

console.log(Card.generate("Knight").cli);
console.log(Card.generate("Mage").cli);
console.log(Card.generate("Rogue").cli);
console.log(Card.generate("Dragon").cli);

const genCard = Card.generate("Procedural");
console.log(genCard.cli);
