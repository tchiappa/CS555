import { useState } from 'react';
import { hazards } from '../planetInfo/hazards';

export function useHazard() {
    const [currentHazard, setCurrentHazard] = useState(null); // No hazard yet

    const maybeTriggerHazard = () => {
        const hazard = hazards[Math.floor(Math.random() * hazards.length)];
        setCurrentHazard(hazard);
        return hazard;

        // if (Math.random() < 0.3) {
        //     const hazard = hazards[Math.floor(Math.random() * hazards.length)];
        //     setCurrentHazard(hazard);
        //     return hazard;
        // }
        // return null;
    };

    const resolveHazard = (option, updateStats) => {
        updateStats(option.effects); // Apply fuel/resource effects
        setCurrentHazard({ ...currentHazard, resolved: option.outcome }); // Store the outcome
    };

    const clearHazard = () => {
        setCurrentHazard(null); // Dismiss modal
    };

    return {
        currentHazard,       // Current hazard, or null
        maybeTriggerHazard,  // Call this to see if a hazard should appear
        resolveHazard,       // Handle player choice
        clearHazard          // Dismiss after resolution
    };
}
