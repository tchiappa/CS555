export const hazards = [
    {
        id: 'meteor-shower',
        name: 'Meteor Shower Detected!',
        description: 'A dense field of meteors is in your path.',
        options: [
            {
                text: 'Reroute around it',
                effects: { fuel: -10, resources: {} },
                outcome: 'You used extra fuel but avoided damage.',
            },
            {
                text: 'Activate shields and pass through',
                effects: { fuel: -5, resources: {
                        "Iron Ore": -3
                    }},
                outcome: 'You passed through with some hull damage.',
            },
        ],
    },
    {
        id: 'solar-flare',
        name: 'Solar Flare Incoming!',
        description: 'Intense radiation threatens your systems.',
        options: [
            {
                text: 'Power down and wait it out',
                effects: { fuel: -3, resources: {
                        "Iron Ore": -2
                    }},
                outcome: 'Minimal exposure, but systems were strained.',
            },
            {
                text: 'Deploy shielding tech',
                effects: { fuel: -2, resources: {
                        "Uranium Pellets": 2
                    }},
                outcome: 'You protected your ship and gathered resources!',
            },
        ],
    },
    // Add more hazards here
];