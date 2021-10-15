function printDeckOfCards(cards) {
    let output = '';
   
    function createCard(face, suit) {
        let faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        let suits = ['\u2660', '\u2665', '\u2666', '\u2663'];
    
        (suit === 'S' && faces.includes(face)) ? suit = '\u2660' : suit;
        (suit === 'H'&& faces.includes(face)) ? suit = '\u2665' : suit;
        (suit === 'D'&& faces.includes(face)) ? suit = '\u2666' : suit;
        (suit === 'C'&& faces.includes(face)) ? suit = '\u2663' : suit;
    
        if(!faces.includes(face) || !suits.includes(suit)) {
            let error = new Error ('Error'); // creating of an error object            
            error.card = face + suit;
            throw error;
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
        output+= card.toString() + ' ';
    }
    try {
        cards.forEach(card => {
        let faces = card.split('');
        let suit = faces.pop();
        let face = '';
        faces.forEach(f => face += f);
       return createCard(face, suit);
        });
    console.log(output.trim());
    } catch (error) {
        console.log(`Invalid card: ${error.card}`);        
    }     
}

printDeckOfCards(['AS', '10D', 'KH', '2C']);
printDeckOfCards(['5S', '3D', 'QD', '1C']);