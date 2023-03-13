import logo from "./logo.svg";
import "./App.css";
import React, {useEffect, useState} from "react";
import { Stock, card_to_pos, pos_to_card } from "./stock.js";
import { Player } from "./player.js";

function Game() {
    const [draw_pile, setDrawPile] = useState(new Stock(true));
    const [discard_pile, setDiscardPile] = useState(new Stock(false));
    const [play_pile, setPlayPile] = useState(new Stock(false));
    const [last_played, setLastPlayed] = useState(null);
    const [players, setPlayers] = useState([]);
    const [buffer, setBuffer] = useState([]);
    const [started, setStarted] = useState(false);
    const [loaded_players, setLoaded] = useState(false);
    const [current_player, setCurrentPlayer] = useState(null);
    const [condition, setCondition] = useState(null);
    const [owner, setOwner] = useState(null);
    const [counter, setCount] = useState(1);

    /**********************************************************
                        INITIALIZING GAME
     **********************************************************/

    function initialize() {
        if (started) return;

        for (let i = 0; i < 13; i++) {
            draw_pile.add(pos_to_card(i), 4);
        }

        setDrawPile(draw_pile);
        setStarted(true);
    }

    function init_player(player) {
        player.draw_to_hand(draw_pile, 3);
        player.draw_to_guard(draw_pile, 3);
        player.get_mystery(draw_pile);

        console.log(player);
        console.log(draw_pile);
        setPlayers(players)
        setDrawPile(draw_pile)
    }

    function load(deck) {
        const load = deck.stock.map((num, index) => {
            if(num == 0) return (<> </>);

            return (
                <button
                    className={"visible_cards"}
                    onClick={() => {
                        queue(pos_to_card(index));
                    }}>
                    <div className="value_text"> {pos_to_card(index)} </div>
                    {num}
                </button>
            );
        });
        return load;
    }

    function queue(value) {
        for (let i = 0; i < buffer.length; i++) {
            if (value != buffer[i]) reset_buffer();
        }
        if (buffer.length == 4) reset_buffer();

        setBuffer((prevBuffer) => [...prevBuffer, value]);
    }

    function check_valid_play(value) {
        value = card_to_pos(value);
        const in_play = card_to_pos(last_played)
        switch (in_play) {
            case 5:
                return (value <= last_played);
                break;
            default:
                return (value >= last_played);
        }
    }

    /**********************************************************
                            INTERACTION
     **********************************************************/

    function reset_buffer() {
        setBuffer([]);
    }

    function load_buff() {
        if (buffer.length == 0) {
            return (<>
                <div>EMPTY</div>
            </>)
        }

        const load = buffer.map((val) => {
            return <text className="bold"> {val} </text>;
        });
        return (<>
            <>HOLDING</>
            <div></div>
            <>{load}</>
            </>);
    }

    function start(){

    }

    /**********************************************************
                        RENDERING COMPONENTS
     **********************************************************/
    function game_components() {
        return (
            <>
                <div className="holder" color="yellow">
                    <th className="inline_holder">
                        Discard Pile
                        <div></div>
                        <button className="pile">
                            <text className="bold">{discard_pile.amount}</text>
                        </button>
                    </th>
                    <th className="inline_holder">
                        Play Pile
                        <div></div>
                        {load(play_pile)}
                        <div></div>
                        {play_pile.read()}
                    </th>
                    <th className="inline_holder">
                        Draw Pile
                        <div></div>
                        <button className="pile">
                            <text className="bold">{draw_pile.amount}</text>
                        </button>
                    </th>
                </div>
                <button className="pile">Last Played</button>

                <div className="holder_mini">
                    {load_buff()}
                </div>
                <button onClick={() => reset_buffer()}>Refresh</button>
            </>
        );
    }

    function player_components() {
        let target = players.map((value) => {
            return (value.render(value.ID));
        })

        return (
            <div className="holder">
                {target}
            </div>
        );
    }

    function user_components(id = owner) {
        for (let i = 0; i < players.length; i++) {
            if(id == players[i].ID) {
                //Load topmost from hand > guard > mystery
                let top_deck = null;
                let load_func = null;
                if(players[i].hand.amount > 0)  {
                    top_deck = players[i].hand;
                    load_func = () => load(top_deck);
                }
                else if(players[i].guard.amount > 0) {
                    top_deck = players[i].guard;
                    load_func = () => load(top_deck);
                }
                else if(players[i].guard.amount > 0) {
                    top_deck = players[i].mystery;
                    load_func = () => players[i].load_mystery();
                }

                if(top_deck == null) return;

                return (<div className="holder">
                    {load(players[0].hand)}
                </div>);
            }
        }

        return (<text className="bold">
            you are not a user
        </text>);
    }

    function test_components() {
        // if(!started) {
        const arr = [];
        arr.push(new Player("Jane Doe"));
        arr.push(new Player("John Doe"));
        arr.push(new Player("Longnamelongnamelongname"));
        arr.push(new Player("Frankenstein"));
        setPlayers(arr)
        setStarted(true);
        console.log("Tested Component creation");
        refresh();
    }

    function test_functions() {
        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            init_player(player);
        }
        console.log("Test function")
        refresh();
    }
    /**********************************************************
                         HELPER FUNCTIONS
     **********************************************************/

    function refresh() {
        setCount(counter * -1);

    }

    initialize();

    /**********************************************************
                            STRUCTURE
     **********************************************************/

    return (
        <html className="bg_text">
            {game_components()}
            <div> </div>
            {player_components()}
            <div></div>
            {user_components("Frankenstein")}
            <button onClick={() => {test_components()}}>Test</button>
            <div> </div>
            <button onClick={() => {test_functions()}}>Populate Frankenstein</button>
        </html>
    );
}

export default Game;
