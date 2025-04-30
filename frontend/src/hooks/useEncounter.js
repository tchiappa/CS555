import {useState} from 'react';
import { encounters } from '../planetInfo/encounters.js';

export function useEncounter() {
    const [currentEncounter, setCurrentEncounter] = useState(null); // No hazard yet

    const maybeTriggerEncounter = () => {
        const encounter = encounters[Math.floor(Math.random() * encounters.length)];
        setCurrentEncounter(encounter);
        return encounter;

        // if (Math.random() < 0.3) {
        //     const encounter = encounters[Math.floor(Math.random() * encounters.length)];
        //     setCurrentEncounter(encounter);
        //     return encounter;
        // }
        // return null;
    };

    const resolveEncounter = (option, updateStats) => {
        updateStats(option.effects); // Apply fuel/resource effects
        setCurrentEncounter({ ...currentEncounter, selection: option.text, resolved: option.outcome }); // Store the outcome
    };

    const clearEncounter = () => {
        setCurrentEncounter(null); // Dismiss modal
    };

    return {
        currentEncounter,       // Current encounter, or null
        maybeTriggerEncounter,  // Call this to see if a encounter should appear
        resolveEncounter,       // Handle player choice
        clearEncounter          // Dismiss after resolution
    };
}
