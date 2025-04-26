import React, {useContext, useState} from "react";
import TradeContext from "../context/tradeContext.jsx";

const messages = [
  "Welcome aboard, Captain. Ready for your first mission?",
  "Fuel is vital — don’t forget to refuel before long trips!",
  "Answer quizzes to earn rewards and boost our capabilities.",
  "Each planet has a story — explore them wisely.",
  "Our next stop might hold surprises. Stay alert!"
];

export default function AICopilot() {
  const {fuel} = useContext(TradeContext);
  const [message, setMessage] = useState(messages[0]);
  const [warning, setWarning] = useState(null);

  React.useEffect(() => {
    if (fuel <= 6 ) {
      setWarning("⚠️ Fuel is too low for travel home!");
    } else if (fuel <= 2) {
      setWarning("⚠️ Fuel is too low for interplanetary travel!");
    } else {
      setWarning(null);
    }

    const interval = setInterval(() => {
      if (!warning) {
        const index = Math.floor(Math.random() * messages.length);
        setMessage(messages[index]);
      }
    }, 20000);

    return () => clearInterval(interval);
  }, [fuel]);

  return (
      <div
          className={`
            my-4 bg-linear-to-br from-slate-800 to-slate-900 text-white px-6 py-6 rounded-xl w-3/4
            ${warning ? "animate-pulse text-red-400 shadow-[0_0_20px_red]" : ""}
          `}>
        <p>🧠 <strong>AI Co-Pilot:</strong></p>
        <p className="italic">{warning || message}</p>
    </div>
  );
}
