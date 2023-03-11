import "./App.css";
import React, { useState, useEffect } from "react";
import { Stock, card_to_pos, pos_to_card } from "./stock.js";
import { Player } from "./player.js";
import Auth from "./Auth";

function App() {
  const [draw_pile, setDrawPile] = useState(new Stock(true));
  const [discard_pile, setDiscardPile] = useState(new Stock(false));
  const [play_pile, setPlayPile] = useState(new Stock(false));
  const [last_played, setLastPlayed] = useState(null);
  const [players, setPlayers] = useState([]);
  const [buffer, setBuffer] = useState([]);
  const [started, setStarted] = useState(false);
  const [current_player, setCurrentPlayer] = useState(null);

  function load(deck) {
    const load = deck.stock.map((num, index) => {
      return (
        <button
          className={"visibleCards"}
          onClick={() => {
            queue(pos_to_card(index));
          }}>
          <div className="valueText"> {pos_to_card(index)} </div>
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

  function reset_buffer() {
    setBuffer([]);
  }

  function gameComponents() {
    return (
      <>
        Draw : {draw_pile.read()} <div />
        Discard : {discard_pile.read()} <div />
      </>
    );
  }

  function playerComponents() {
    return (
      <table>
        <colgroup></colgroup>
      </table>
    );
  }

  return (
    <>
      <Auth />
      <div className="centered">
        {gameComponents()}
        <div className="box">{load(draw_pile)}</div>
        <div className="centered">
          {buffer.map((val) => {
            return <text className="queue"> {val} </text>;
          })}
        </div>
        <button onClick={() => reset_buffer()}>Reset Buffer</button>
        {playerComponents()}
      </div>
    </>
  );
}

export default App;
