import "./App.css";
import React, {useState} from "react";
import StartingPage from "./StartingPage";
import { Scene } from "./Scene";
import { TradeProvider } from "./context/tradeContext";

function App() {
  const [showJourney, setShowJourney] = useState(false);

  return (
    <TradeProvider>
      <div>
        {!showJourney ? (
          <StartingPage onStart={() => setShowJourney(true)} />
        ) : (
          <>
            <Scene />
          </>
        )}
      </div>
    </TradeProvider>
  );
}

export default App;
