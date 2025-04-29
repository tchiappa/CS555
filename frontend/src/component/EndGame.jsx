import { useContext } from "react";
import GameContext from "../context/GameContext";

export const EndGame = () => {
  const {setEnd} = useContext(GameContext)
  function handleEnd(){
    const confirmed = window.confirm("Are you sure you want to quit?");
    if (confirmed) {
      setEnd(true);
    }
  }


  return (
    <button className="mt-15 mb-4 px-6 py-6 rounded-xl w-3/4 bg-linear-to-br from-orange-800 to-orange-900 hover:from-orange-900 hover:to-orange-950 text-white hover:scale-105 cursor-pointer" onClick={handleEnd}>
        End Game
    </button>
  )
}
