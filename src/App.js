import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";
import {Stock, card_to_pos, pos_to_card} from "./stock.js"
import {Player} from "./player.js"

export class Game extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            draw_pile : new Stock(true),
            discard_pile : new Stock(false),
            play_pile : new Stock(false),
            last_played : null,
            players : [],
            buffer: new Array(),
            started: false,
            current_player: null,
        };

        this.initialize();
        this.state.started = true;
    }

    //
    // Setup
    //

    initialize() {
        if (this.state.started) return;

        for (let i = 0; i < 13; i++) {
            this.state.draw_pile.add(pos_to_card(i), 4);
        }

        this.setState(this.state.draw_pile);
        this.setState({started : true});
    }

    initializePlayers() {

    }

    //
    //Setup and updates
    //

    load(deck) {
        const load = deck.stock.map((num, index) => {
            return(
                <button className={"visibleCards"} onClick={() => {
                    this.queue(pos_to_card(index))
                }}>
                    <div className="valueText"> {pos_to_card(index)} </div>
                    {num}
                </button>
            );
        });
        return load;
    }

    //
    //Interactive Functions
    //

    queue(value) {
        for (let i = 0; i < this.state.buffer.length ; i++) {
            if(value != this.state.buffer[i])
                this.reset_buffer();
        }
        if (this.state.buffer.length == 4) this.reset_buffer();

        this.state.buffer.push(value);
        this.setState({buffer: this.state.buffer});
    }

    reset_buffer() {
        this.setState((buffer) => {
            buffer = [];
            this.setState({buffer: buffer})
        });
    }

    //
    //Rendering and Components
    //

    render() {
        return (
            <div className="centered">
                {this.gameComponents()}
                <div className="box">{this.load(this.state.draw_pile)}</div>
                <div className="centered">
                {this.state.buffer.map((val) => {
                    return  (<text className="queue"> {val} </text>);
                })} </div>
                <button onClick={() => this.reset_buffer()}>Reset Buffer</button>
                {this.playerComponents()}
            </div>
        );
    }

    gameComponents() {
        return (
            <>
                Draw : {this.state.draw_pile.read()} <div/>
                Discard : {this.state.discard_pile.read()} <div/>
            </>
        );
    }

    playerComponents() {
        return (
            <table>
                <colgroup></colgroup>
            </table>
        );
    }

}