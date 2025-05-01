export const dialogueTree = {
    "mission-summary": {
      message: () => "", // message handled visually in DialogueMockup
      options: [
        { text: "Back to Mission Control", next: "start" }
      ]
    },
      start: {
        message: "Commander, prepare for your mission briefing. Let's get you ready for space exploration!",
        options: [
          { text: "Check Fuel Status", next: "fuelUsage" },
          { text: "Check Resources Prepared", next: "resourcesCollected" },
        
        ]
      },
    
      fuelUsage: {
        message: (fuelUsedPercent, pointsEarned, resourcesCollected, currentFuel) => {
          if (currentFuel < 5) {
            return `⚠️ Critical Alert: Only ${currentFuel} fuel units remaining! Please conserve fuel during your journey.`;
          } else {
            return `Fuel levels optimal. Current reserves: ${currentFuel} units. You're good to go!`;
          }
        },
        options: [{ text: "View Mission Points", next: "pointsAndRating" }]
      },
    
      resourcesCollected: {
        message: (fuelUsedPercent, pointsEarned, resourcesCollected, currentFuel) =>
          `Resource packs loaded: ${resourcesCollected} units. Materials ready for exploration.`,
        options: [{ text: "Proceed to Points Overview", next: "pointsAndRating" }]
      },
    
      pointsAndRating: {
        message: (fuelUsedPercent, pointsEarned, resourcesCollected, currentFuel) => {
          if (pointsEarned <= 0) {
            return `Mission Control Note: Every journey teaches valuable lessons. Don't give up! Points earned: ${pointsEarned}.`;
          } else if (pointsEarned <= 100) {
            return `Steady start, Commander! Points earned: ${pointsEarned}. Ready for bigger challenges! 🚀`;
          } else {
            return `Phenomenal entry! You earned ${pointsEarned} points. You're becoming a legend among the stars! 🌟🌌`;
          }
        },
        options: [{ text: "View Earned Achievements", next: "achievements" }]
      },
    
      achievements: {
        message: (fuelUsedPercent, pointsEarned, resourcesCollected, currentFuel) => {
          let medals = [];
    
          if (currentFuel >= 15) {
            medals.push("🏅 Fuel Saver Medal");
          }
          if (pointsEarned > 150) {
            medals.push("🏅 Star Commander Award");
          } else if (pointsEarned >= 80) {
            medals.push("🏅 Rising Pilot Badge");
          }
          if (resourcesCollected >= 10) {
            medals.push("🏅 Resource Master Ribbon");
          }
    
          if (medals.length === 0) {
            return "No official achievements earned yet. 🌟 Keep exploring — greatness awaits!";
          }
    
          return `Achievements Unlocked:\n\n${medals.join("\n")}`;
        },
        options: []
      },
    
      missionSummary: {
          message: () => "", // We’ll handle the visuals in DialogueMockup.jsx
          options: [
            { text: "Back to Mission Control", next: "start" }
          ]
        }
        
    };
    