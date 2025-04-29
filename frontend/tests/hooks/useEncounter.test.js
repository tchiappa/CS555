import { renderHook, act } from '@testing-library/react';
import { useEncounter } from '../../src/hooks/useEncounter.js'; // Adjust the import path as necessary

// Mock the encounters array
vi.mock('../planetInfo/encounters', () => ({
    encounters: [
        { name: 'Asteroid Field', description: 'A field of asteroids.', options: [{ text: 'Go through', outcome: 'Lose 10 fuel', effects: { fuel: -10 } }] },
        { name: 'Solar Flare', description: 'A burst of solar radiation.', options: [{ text: 'Hide in a nebula', outcome: 'Lose 20 fuel', effects: { fuel: -20 } }] },
    ]
}));

describe('useEncounter hook', () => {
    it('should start with no current encounter', () => {
        const { result } = renderHook(() => useEncounter());
        expect(result.current.currentEncounter).toBeNull();
    });

    it('should trigger an encounter randomly', () => {
        const { result } = renderHook(() => useEncounter());

        // Act to trigger an encounter
        act(() => {
            result.current.maybeTriggerEncounter();
        });

        expect(result.current.currentEncounter).not.toBeNull();
        expect(result.current.currentEncounter).toMatchObject({
            name: expect.any(String),
            description: expect.any(String),
            options: expect.arrayContaining([expect.objectContaining({ text: expect.any(String) })]),
        });
    });

    it('should resolve a encounter and update the stats', () => {
        const { result } = renderHook(() => useEncounter());

        // Trigger a encounter
        act(() => {
            result.current.maybeTriggerEncounter();
        });

        const currentEncounter = result.current.currentEncounter;
        const option = currentEncounter.options[0];
        const updateStatsMock = vi.fn();

        // Resolve the encounter with an option
        act(() => {
            result.current.resolveEncounter(option, updateStatsMock);
        });

        // Ensure the resolved outcome is applied and stats are updated
        expect(result.current.currentEncounter.resolved).toBe(option.outcome);
        expect(updateStatsMock).toHaveBeenCalledWith(option.effects);
    });

    it('should clear the current encounter', () => {
        const { result } = renderHook(() => useEncounter());

        // Trigger an encounter
        act(() => {
            result.current.maybeTriggerEncounter();
        });

        expect(result.current.currentEncounter).not.toBeNull();

        // Clear the encounter
        act(() => {
            result.current.clearEncounter();
        });

        // Ensure the encounter is cleared
        expect(result.current.currentEncounter).toBeNull();
    });
});
