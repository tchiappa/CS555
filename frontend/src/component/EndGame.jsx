import { useContext } from "react";
import TradeContext from "../context/tradeContext";

export const EndGame = () => {
  const {setEnd} = useContext(TradeContext)
  function handleEnd(){
    const confirmed = window.confirm("Are you sure you want to quit?");
    if (confirmed) {
      setEnd(true);
    }
  }


  return (
    <button onClick={handleEnd}>
      End Game
    </button>
  )
}
