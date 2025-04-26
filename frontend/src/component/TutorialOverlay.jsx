// src/component/TutorialOverlay.jsx
import React, {useContext, useState} from "react";
import ContainerContext from "../context/ContainerContext.jsx";

const tutorialSteps = [
  {
    title: "Welcome, Space Cadet!",
    description: "You're about to begin your interplanetary adventure. Let's learn how to fly your ship!",
    emoji: "🚀"
  },
  {
    title: "Choose a Planet",
    description: "Select any available planet from the menu to travel there. But be careful of the fuel cost!",
    emoji: "🪐"
  },
  {
    title: "Answer Science Quizzes",
    description: "Upon arrival, you’ll face fun science questions. Answer them to collect minerals and fuel.",
    emoji: "🧠"
  },
  {
    title: "Space Station",
    description: "Visit the space station to refuel by trading in collected resources.",
    emoji: "🔧"
  },
  // {
  //   title: "Refuel and Repair",
  //   description: "Visit the ship maintenance panel to refuel and repair using collected resources.",
  //   emoji: "🔧"
  // },
  {
    title: "Meet Your Co-Pilot!",
    description: "The AI Co-Pilot will guide you with tips and warnings. Trust your space buddy!",
    emoji: "🤖"
  }
];

export default function TutorialOverlay({ onFinish }) {
  const [step, setStep] = useState(0);

  const {setSidebarsActive} = useContext(ContainerContext);

  setSidebarsActive(false);

  const nextStep = () => {
    if (step < tutorialSteps.length - 1) {
      setStep(step + 1);
    } else {
      setSidebarsActive(true);
      onFinish();
    }
  };

  return (
    <div className="fixed top-0 left-0 z-[9999] w-screen h-screen bg-black/75 flex justify-center items-center text-white">
      <div className="bg-black/75 text-white text-center p-20 rounded-4xl w-lg h-lg">
        <h2 className="text-xl">{tutorialSteps[step].emoji} {tutorialSteps[step].title}</h2>
        <p className="text-lg mt-5">{tutorialSteps[step].description}</p>
        <button onClick={nextStep} className="mt-5 p-2 px-6 bg-blue-600 hover:bg-blue-800 disabled:bg-zinc-600 text-white disabled:text-zinc-400 mb-2 rounded-lg">
          {step === tutorialSteps.length - 1 ? "Let’s Go!" : "Next »"}
        </button>
      </div>
    </div>
  );
}