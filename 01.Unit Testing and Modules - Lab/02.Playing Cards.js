function solve(face, suit) {
    let faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let suits = ['\u2660', '\u2665', '\u2666', '\u2663'];

    (suit === 'S') ? suit = '\u2660' : suit;
    (suit === 'H') ? suit = '\u2665' : suit;
    (suit === 'D') ? suit = '\u2666' : suit;
    (suit === 'C') ? suit = '\u2663' : suit;

    if (!faces.includes(face) || !suits.includes(suit)) {
        throw new Error('Error');
    }

    class Card {
        constructor(face, suit) {
            this.face = face;
            this.suit = suit;
        }

        toString() {
            return `${face}${suit}`;
        }
    }

    let card = new Card(face, suit);
    return card.toString();
}

let result1 = solve('A', 'S');
let result2 = solve('10', 'H');
let result3 = solve('1', 'C');// Error
console.log(result1);
console.log(result2);
console.log(result3);


