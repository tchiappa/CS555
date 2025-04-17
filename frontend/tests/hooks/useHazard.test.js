import { renderHook, act } from '@testing-library/react';
import { useHazard } from '../../src/hooks/useHazard'; // Adjust the import path as necessary

// Mock the hazards array
vi.mock('../planetInfo/hazards', () => ({
    hazards: [
        { name: 'Asteroid Field', description: 'A field of asteroids.', options: [{ text: 'Go through', outcome: 'Lose 10 fuel', effects: { fuel: -10 } }] },
        { name: 'Solar Flare', description: 'A burst of solar radiation.', options: [{ text: 'Hide in a nebula', outcome: 'Lose 20 fuel', effects: { fuel: -20 } }] },
    ]
}));

describe('useHazard hook', () => {
    it('should start with no current hazard', () => {
        const { result } = renderHook(() => useHazard());
        expect(result.current.currentHazard).toBeNull();
    });

    it('should trigger a hazard randomly', () => {
        const { result } = renderHook(() => useHazard());

        // Act to trigger a hazard
        act(() => {
            result.current.maybeTriggerHazard();
        });

        expect(result.current.currentHazard).not.toBeNull();
        expect(result.current.currentHazard).toMatchObject({
            name: expect.any(String),
            description: expect.any(String),
            options: expect.arrayContaining([expect.objectContaining({ text: expect.any(String) })]),
        });
    });

    it('should resolve a hazard and update the stats', () => {
        const { result } = renderHook(() => useHazard());

        // Trigger a hazard
        act(() => {
            result.current.maybeTriggerHazard();
        });

        const currentHazard = result.current.currentHazard;
        const option = currentHazard.options[0];
        const updateStatsMock = vi.fn();

        // Resolve the hazard with an option
        act(() => {
            result.current.resolveHazard(option, updateStatsMock);
        });

        // Ensure the resolved outcome is applied and stats are updated
        expect(result.current.currentHazard.resolved).toBe(option.outcome);
        expect(updateStatsMock).toHaveBeenCalledWith(option.effects);
    });

    it('should clear the current hazard', () => {
        const { result } = renderHook(() => useHazard());

        // Trigger a hazard
        act(() => {
            result.current.maybeTriggerHazard();
        });

        expect(result.current.currentHazard).not.toBeNull();

        // Clear the hazard
        act(() => {
            result.current.clearHazard();
        });

        // Ensure the hazard is cleared
        expect(result.current.currentHazard).toBeNull();
    });
});
