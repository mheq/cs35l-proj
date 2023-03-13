import {pos_to_card, Stock} from "./stock";
import React from "react";

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

    load_hand() {
        let deck = this.hand;
        const load = deck.stock.map((num, index) => {
            return (
                <button className={"visible_cards"} onClick={() => {
                    this.hand(pos_to_card(index));
                }}>
                    <div className="value_text"> {pos_to_card(index)} </div>
                    {num}
                </button>
            );
        });
        return load;
    }

    load_guard() {
        let deck = this.guard;
        if(deck.amount == 0) return (
          <div>No more guard cards!</div>
        );

        const guard_elements = [];
        for (let i = 0; i < deck.stock.length; i++) {
            for (let j = 0; j < deck.stock[i]; j++) {
                guard_elements.push(pos_to_card(i));
            }
        }

        const load = guard_elements.map((num) => {
            return (<>
                <button className="guard_cards" onclose={() => console.log(num)}>
                    <div className="value_text">{num}</div>
                </button>
            </>)
        });

        return load;
    }

    load_mystery() {
        let deck = this.mystery;
        if(deck.amount == 0) return (
            <div>No mystery cards!</div>
        );

        const mystery_elements = [];
        for (let i = 0; i < deck.stock.length; i++) {
            for (let j = 0; j < deck.stock[i]; j++) {
                mystery_elements.push(pos_to_card(i));
            }
        }

        const load = mystery_elements.map((num) => {
            return (<>
                <button className="guard_cards" onclose={() => console.log(num)}>
                    <div className="value_text"> ? </div>
                </button>
            </>)
        });

        return load;
    }

    //Card obtaining methods
    draw_to_guard(source, amt = 1) {
        this.guard.draw_from(source, amt);
    }
    draw_to_hand(source, amt) {
        this.hand.draw_from(source, amt);
    }
    get_mystery(source) {
        this.mystery.draw_from(source, 3);
    }

    render(name = this.ID) {
        if(name != this.ID) {
            return (
                <></>
            );
        }
        return (
            <button className="player_box">
                <h2>{this.ID.substring(0,10)}</h2>
                <div>
                    Cards in hand
                    <div></div>
                    <text className="bold">{this.hand.amount}</text>
                </div>
                <div>
                    Guard Cards
                    <div/>
                    {this.load_guard()}

                </div>
                <div> </div>
                <div> </div>
                <div>
                    Mystery Cards
                    <div></div>
                    {this.load_mystery()}
                </div>
            </button>
        );
    }
}