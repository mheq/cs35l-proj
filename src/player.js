import {Stock} from "./stock";

export class Player {
    constructor(name) {
        this.ID = name;
        this.hand = new Stock(false);
        this.guard = new Stock(false);
        this.mystery = new Stock(true);
    }

    //Refers to first encountered populated stock: hand -> guard -> mystery
    priority() {
        if(this.hand.amount != 0) return this.hand;
        else if (this.guard.amount != 0) return this.guard;
        else return this.mystery;
    }

    render(name) {
        if(name == this.ID) {
            return (
                <></>
            );
        }
        return (
          <th>
              <h1>{this.ID}</h1>
              <b>Cards in hand: {this.hand.amount}</b>
              <b>Guard Cards: {this.guard.list()}</b>
              <b>Mystery Cards: {this.mystery.amount}</b>
          </th>
        );
    }
}