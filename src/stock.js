export class Stock {
    constructor (hidden = true) {

        const default_amount = 0;

        this.amount = 0;
        this.stock = [];
        this.hidden = hidden;
        this.last_played = null;

        for (let i = 0; i < 13; i++) {
            this.stock.push(default_amount);
            this.amount += default_amount;
        }
    }

    //Add {amt} cards to {card_value}'s position
    add(card_value, amt = 1, deck = null) {
        if (!validate(card_value)) {
            console.log("Invalid Card Value")
            return;
        }

        //Add from existing deck
        if (deck != null && deck.stock.length == 13) {
            const cards = deck.take(card_value, amt);
            const pos = card_to_pos(cards.card_value);

            this.stock[pos] += cards.amt;
            this.amount += cards.amt;
            return;
        }
        //Add from no-where
        if (amt > 0 & amt <= 4) {
            this.stock[card_to_pos(card_value)] += amt;
            this.amount += amt;
        } else
            console.log("Not valid add()");
    }

    //Take {amt} of {card_value} cards from stock
    take(card_value, amt = 1) {
        if (!validate(card_value)) return null;
        if (amt < 0) {
            amt = 0;
            return {card_value, amt};
        }

        //Take amt
        const pos = card_to_pos(card_value);
        if (this.stock[pos] >= amt) {
            this.stock[pos] -= amt;
            this.amount -= amt;
            return {card_value, amt};
        } //Take what exists:
        else if (this.stock[pos] < amt) {
            amt = this.stock[pos];
            this.stock[pos] = 0;
            this.amount -= amt;
            return {card_value, amt};
        }

        amt = 0;
        return {card_value, amt};
    }

    //Returns random valid value
    take_random() {
        //Simulate real probability instead of constant 1/13 of any
        //Make array of amt/total
        const probability = [];
        probability.push(this.stock[0]/this.amount);
        for (let i = 1; i < 13; i++) {
            probability.push(probability[i - 1] + this.stock[i] / this.amount);
        }

        // console.log(probability);

        //Find Corresponding position
        //Generate 1 Random Number
        let randnum = Math.random();
        let pos = this.stock.length - 1;

        while(probability[pos - 1] > randnum) {
            pos -= 1;
        }

        return this.take(pos_to_card(pos));
    }

    stock() {
        return this.stock()
    };

    //Randomly draw {amt} from {deck}
    draw_from(deck = null, amt = 1) {
        if (deck == null) return false;

        //Draw amt
        for (let i = 0; i < amt && deck.amount > 0; i++) {
            const received = deck.take_random();
            if (received != null && received.amt >= 0) {
                // console.log("Took: " + received.card_value
                //     + " (x" + received.amt + ") | x" + (i+1));
                this.add(received.card_value, received.amt);
            }
            else
                i--;

        }
    }

    //Draw all cards in {deck}
    draw_all(deck = null) {
        for(let i = 0; i < 13; i++) {
            this.add(pos_to_card(i), 4, deck);
        }
    }

    //List entire stock (only cards in stock)
    list(log = true) {
        if(this.hidden) return;

        let list = "{ ";
        for (let i = 0; i < 13; i++) {
            if(this.stock[i] != 0) {
                list += pos_to_card(i) + ":" + this.stock[i] + " ";
            }
        }
        list += "} : Total - " + this.amount;

        if(log) console.log(list);
        return list;
    }

    //Display that others will see
    read() {
        let readstring = "";
        if (!this.hidden) {
            readstring += this.list(false) + " : ";
        }
        return readstring + "Count - " + this.amount;
    }

    render() {
        return (
            <>{this.read()}</>
        );
    }
}

export function card_to_pos(value) {
    //Valid Num Value
    if(value >= 2 && value <=10) return value - 2;

    //Valid Face & Ace cards
    if(value === "J") return 9;
    else if(value === "Q") return 10;
    else if(value === "K") return 11;
    else if(value === "A") return 12;

    //non-valid position
    return null;
}

export function pos_to_card(position) {
    if(position >= 0 && position <= 8) return position + 2;
    switch(position) {
        case 9:
            return "J";
        case 10:
            return "Q";
        case 11:
            return "K";
        case 12:
            return "A";
        default:
            return false;
    }
}

function validate(card_value) {
    if((card_value >= 2 && card_value <= 10) || card_value == "J" || card_value == "Q"
        || card_value == "K" || card_value == "A")
        return true;
    return false;
}

function test_all() {
    console.log("Tests - Started")

    //Create full deck and empty hand
    let deck = new Stock( true, false);
    let hand = new Stock( false, false);

    //Hand gets one random card from deck
    test(hand.draw_from(deck) == deck.draw_from(hand), "Deck -> Hand -> Deck",
        "Only card being pulled back from hand to deck should be the one hand pulled")

    //Take Random Amount from hand. Entire
    let drawn =  59 // Should only draw 54;
    console.log("Hand draws " + drawn + " cards from Deck");
    hand.draw_from(deck, drawn);
    test(hand.amount == Math.min(drawn, 52), "right draw amount",
        "The amount pulled should equal to {drawn}");

    //
    deck.draw_all(hand);
    test(deck.amount == 52 && hand.amount ==0, "DRAW ALL",
        "Should pull all cards possible (this.case 52), and should empty by correct amount");

    //Test random amount drawn:
    drawn = Math.floor(Math.random() * 52) + 1;
    hand.draw_from(deck, drawn);
    test(deck.amount == 52 - drawn && hand.amount == drawn,
        "DRAWS CORRECT AMOUNT FOR ARBITRARY {amt}",
        "Should draw proper amount of cards given");
    console.log("Result from test: ");
    hand.list();

    hand.render();

    console.log("Tests - Finished");
}

function test(condition, title = "unnamed", reason = null) {
    const state = (condition) ? "Passed" : "Failed";
    const show_reason = false;

    if(show_reason)
        console.log("Test | " + state + " | " + title.toUpperCase() + "\n\tReason: " + reason);
    else
        console.log("Test | " + state + " | " + title.toUpperCase());
}