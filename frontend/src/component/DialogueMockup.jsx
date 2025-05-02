import React, { useEffect, useState, useRef } from "react";
import { dialogueTree } from "../planetInfo/DialougeData";

export default function DialogueMockup({ onClose, fuelUsedPercent, pointsEarned, resourcesCollected, currentFuel, startFuel }) {
  const [currentNode, setCurrentNode] = useState("mission-summary");
  const node = dialogueTree[currentNode];
  const speechRef = useRef(null);
  const scaledFuelBarWidth = (currentFuel / 10) * 100; // scale assuming 10 is max


  const totalResources = resourcesCollected && typeof resourcesCollected === "object"
    ? Object.values(resourcesCollected).reduce((a, b) => a + b, 0)
    : 0;

  const nodeMessage = typeof node?.message === "function"
    ? node.message(fuelUsedPercent, pointsEarned, totalResources, currentFuel)
    : node?.message;

  useEffect(() => {
    if (nodeMessage) {
      window.speechSynthesis.cancel();
      const utter = new window.SpeechSynthesisUtterance(nodeMessage);
      utter.rate = 1;
      utter.pitch = 1.1;
      utter.lang = "en-US";
      speechRef.current = utter;

      if (!node.options || node.options.length === 0) {
        utter.onend = () => {
          if (onClose) onClose();
        };
      } else {
        utter.onend = null;
      }

      window.speechSynthesis.speak(utter);
    }

    return () => {
      window.speechSynthesis.cancel();
      if (speechRef.current) {
        speechRef.current.onend = null;
      }
    };
  }, [nodeMessage, node?.options, onClose]);

  if (!node) return <div className="text-white p-6">Dialogue data error.</div>;

  const showMissionSummary = currentNode === "mission-summary";
  const hasSummaryData = totalResources > 0;

  return (
    <div className="bg-slate-900 rounded-3xl p-8 max-w-xl mx-auto my-8 shadow-xl text-white font-orbitron relative">
      <div className="flex items-center mb-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3214/3214483.png"
          alt="Mission Control Avatar"
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h2 className="text-2xl text-sky-400 m-0">Mission Control</h2>
          <p className="text-slate-400 text-sm m-0">Communications Channel</p>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-4 text-base mb-6 leading-relaxed shadow-md">
        {!showMissionSummary && nodeMessage}

        {showMissionSummary && hasSummaryData ? (
          <>
            <h3 className="text-xl font-bold text-white">Mission Summary</h3>

            <div>
              <p className="font-semibold mb-1">Points Earned</p>
              <div className="flex items-center gap-2">
                <div className="w-full bg-slate-700 rounded-full h-2.5">
                  <div
                    className="bg-yellow-400 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, Math.max(0, pointsEarned))}%` }}
                  ></div>
                </div>
                <span className="text-sm text-white font-semibold">{pointsEarned}</span>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-1">Fuel Left</p>
              <div className="flex items-center gap-2">
                <div className="w-full bg-slate-700 rounded-full h-2.5">
                  <div
                    className="bg-cyan-400 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${scaledFuelBarWidth}%` }}
                  ></div>
                </div>
                <span className="text-sm text-white font-semibold">{fuelUsedPercent}</span>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">Resources Collected</p>
              <div className="flex flex-wrap gap-4 text-sm">
                {Object.entries(resourcesCollected).map(([key, val]) => (
                  <div key={key} className="flex items-center gap-1 text-white">
                    <span className="inline-block w-2 h-2 rounded-full bg-cyan-400"></span>
                    <span className="capitalize font-medium">{key}</span>
                    <span className="font-semibold">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="font-semibold mb-1">Efficiency</p>
              <div className="flex items-center gap-2">
                <div className="w-full bg-slate-700 rounded-full h-2.5">
                  <div
                    className="bg-cyan-400 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${100 - fuelUsedPercent}%` }}
                  ></div>
                </div>
              </div>
              <p className="mt-2 text-sm text-white">
                {fuelUsedPercent <= 30
                  ? "Great job! Your resource management was highly efficient."
                  : fuelUsedPercent <= 60
                  ? "You're doing well! Consider small improvements for even better results."
                  : "Consider using fuel more efficiently in future missions."}
              </p>
            </div>
          </>
        ) : showMissionSummary ? (
          <p className="text-slate-400">No mission data available yet. Complete a mission to view your performance.</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-4">
        {node.options.map((opt, idx) => (
          <button
            key={idx}
            className="bg-sky-400 text-slate-900 font-semibold rounded-xl px-4 py-3 text-base transition hover:bg-sky-500"
            onClick={() => setCurrentNode(opt.next)}
          >
            {opt.text}
          </button>
        ))}
      </div>

      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-slate-400 text-2xl hover:text-white"
      >
        &times;
      </button>
    </div>
  );
}



