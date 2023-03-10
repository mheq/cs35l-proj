import { Stock } from "./stock";

function Player({ name }) {
  const hand = new Stock(false);
  const guard = new Stock(false);
  const mystery = new Stock(true);

  const priority = () => {
    if (hand.amount !== 0) return hand;
    else if (guard.amount !== 0) return guard;
    else return mystery;
  };

  const render = () => {
    if (name === this.ID) {
      return <></>;
    }
    return (
      <th>
        <h1>{name}</h1>
        <b>Cards in hand: {hand.amount}</b>
        <b>Guard Cards: {guard.list()}</b>
        <b>Mystery Cards: {mystery.amount}</b>
      </th>
    );
  };
  return <>{render()}</>;
}

export default Player;
