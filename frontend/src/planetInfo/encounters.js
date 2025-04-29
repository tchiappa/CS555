export const encounters = [
    {
        type: 'hazard',
        id: 'solar-radiation-surge',
        name: 'Solar Radiation Surge',
        description: 'An intense burst of solar radiation is approaching your ship.',
        options: [
            {
                text: 'Activate Emergency Shielding',
                effects: { fuel: -1, resources: { "Iron Ore": 0 } },
                outcome: 'You power the radiation shields, avoiding damage but burn 1 fuel.'
            },
            {
                text: 'Divert Power to Science Bay to Analyze the Radiation',
                effects: { fuel: 0, resources: { "Water Ice": -1 } },
                outcome: 'You gather valuable data, but lose 1 Water Ice due to coolant use.'
            },
            {
                text: 'Stay on Course and Absorb the Radiation',
                effects: { fuel: 0, resources: { "Iron Ore": -2 } },
                outcome: 'Systems take radiation damage. You lose 2 Iron Ore making repairs.'
            }
        ]
    },{
        type: 'hazard',
        id: 'crew-fatigue',
        name: 'Crew Fatigue',
        description: 'Isolation and stress are causing crew performance to decline.',
        options: [
            {
                text: 'Schedule Extra Rest Time',
                effects: { fuel: 0, resources: { "Red Dust": -1 } },
                outcome: 'Rest improves morale but you lose 1 Red Dust in idle supplies.'
            },
            {
                text: 'Increase Entertainment System Usage',
                effects: { fuel: -1, resources: { "Iron Ore": 0 } },
                outcome: 'Crew relaxes with entertainment, consuming 1 fuel.'
            },
            {
                text: 'Push the Crew to Work Through It',
                effects: { fuel: 0, resources: { "Iron Ore": -2 } },
                outcome: 'Crew mistakes cost you 2 Iron Ore due to inefficient work.'
            }
        ]
    },{
        type: 'hazard',
        id: 'comm-blackout',
        name: 'Communication Blackout',
        description: 'You’ve lost contact with mission control during deep space travel.',
        options: [
            {
                text: 'Attempt a System Reboot',
                effects: { fuel: -1, resources: { "Red Dust": 0 } },
                outcome: 'The reboot restores systems but costs 1 fuel.'
            },
            {
                text: 'Use Backup Satellite System',
                effects: { fuel: 0, resources: { "Iron Ore": -1 } },
                outcome: 'The backup system works but uses 1 Iron Ore in spare parts.'
            },
            {
                text: 'Continue Without Contact',
                effects: { fuel: 0, resources: { "Water Ice": -1 } },
                outcome: 'Navigation errors cause life support strain. You lose 1 Water Ice.'
            }
        ]
    },{
        type: 'hazard',
        id: 'zero-g-disorientation',
        name: 'Zero-G Disorientation',
        description: 'A crew member struggles with prolonged zero-gravity exposure.',
        options: [
            {
                text: 'Simulate Gravity Using Ship Rotation',
                effects: { fuel: -2, resources: { "Red Dust": 0 } },
                outcome: 'Ship rotation stabilizes the crew member but burns 2 fuel.'
            },
            {
                text: 'Use Medical Supplies to Stabilize Them',
                effects: { fuel: 0, resources: { "Water Ice": -1 } },
                outcome: 'Medical hydration helps, costing 1 Water Ice.'
            },
            {
                text: 'Ignore and Proceed With Tasks',
                effects: { fuel: 0, resources: { "Iron Ore": -1 } },
                outcome: 'Crew health suffers. You lose 1 Iron Ore correcting mistakes.'
            }
        ]
    },{
        type: 'hazard',
        id: 'life-support-leak',
        name: 'Life Support Leak',
        description: 'A leak in the life support system threatens onboard conditions.',
        options: [
            {
                text: 'Repair Immediately',
                effects: { fuel: 0, resources: { "Iron Ore": -1 } },
                outcome: 'You stop the leak using 1 Iron Ore for quick repairs.'
            },
            {
                text: 'Reroute Airflow to Contain Leak',
                effects: { fuel: -1, resources: { "Red Dust": 0 } },
                outcome: 'Rerouting stabilizes the system but uses 1 fuel.'
            },
            {
                text: 'Defer Repairs to a Later Stop',
                effects: { fuel: 0, resources: { "Water Ice": -1 } },
                outcome: 'Leak worsens. 1 Water Ice is lost due to spoilage.'
            }
        ]
    },{
        type: 'encounter',
        id: 'roaming-comet',
        name: 'Roaming Comet',
        description: 'A comet streaks across your path, shedding icy particles and rocky debris.',
        options: [
            {
                text: 'Collect Surface Ice',
                effects: { fuel: -1, resources: { "Water Ice": 1 } },
                outcome: 'You match velocity with the comet and gather 1 Water Ice sample.'
            },
            {
                text: 'Drill into Rocky Core',
                effects: { fuel: -2, resources: { "Iron Ore": 1 } },
                outcome: 'You burn fuel for a steady approach and extract 1 Iron Ore from the comet’s rocky nucleus.'
            },
            {
                text: 'Observe and Move On',
                effects: { fuel: 0, resources: {} },
                outcome: 'You record the comet’s trajectory and continue your journey.'
            }
        ]
    },{
        type: 'encounter',
        id: 'abandoned-probe',
        name: 'Abandoned Probe',
        description: 'A decades-old probe from Earth floats inert, its solar panels cracked and body pitted.',
        options: [
            {
                text: 'Salvage Reactor Housing',
                effects: { fuel: -2, resources: { "Uranium Pellets": 1 } },
                outcome: 'You navigate carefully and recover 1 Uranium Pellet from its decaying power core.'
            },
            {
                text: 'Recover Structural Materials',
                effects: { fuel: -1, resources: { "Metal Silicates": 1 } },
                outcome: 'You collect durable alloy fragments and gain 1 Metal Silicates.'
            },
            {
                text: 'Record and Leave It Intact',
                effects: { fuel: 0, resources: {} },
                outcome: 'You respect its historical value and log its position. No materials recovered.'
            }
        ]
    },{
        type: 'encounter',
        id: 'plasma-storm',
        name: 'Solar Plasma Storm',
        description: 'A burst of high-energy plasma races outward from the Sun, disrupting nearby space.',
        options: [
            {
                text: 'Collect Charged Particles',
                effects: { fuel: -2, resources: { "Red Dust": 1 } },
                outcome: 'You enter the edge of the storm and gather 1 Red Dust sample.'
            },
            {
                text: 'Capture Ionized Gases',
                effects: { fuel: -1, resources: { "Helium-Rich Gas (Jupiter)": 1 } },
                outcome: 'You scoop solar-energized gases and collect 1 Helium-Rich Gas.'
            },
            {
                text: 'Avoid the Disturbance',
                effects: { fuel: 0, resources: {} },
                outcome: 'You steer clear of the turbulence and move on safely.'
            }
        ]
    },{
        type: 'encounter',
        id: 'micrometeoroid-cluster',
        name: 'Micrometeoroid Cluster',
        description: 'Tiny but fast-moving particles form a dense patch that reflects sunlight.',
        options: [
            {
                text: 'Collect Hydrocarbon Samples',
                effects: { fuel: -1, resources: { "Hydrocarbon Crystals (Titan)": 1 } },
                outcome: 'You retrieve fragments containing organic molecules and gain 1 Hydrocarbon Crystal.'
            },
            {
                text: 'Harvest Ice Particulates',
                effects: { fuel: -1, resources: { "Ammonia Ice (Enceladus)": 1 } },
                outcome: 'You filter ice grains and store 1 Ammonia Ice.'
            },
            {
                text: 'Pass Through at Minimum Power',
                effects: { fuel: 0, resources: {} },
                outcome: 'You reduce systems and glide through safely without collecting materials.'
            }
        ]
    },{
        type: 'encounter',
        id: 'magnetosphere-shock',
        name: 'Magnetospheric Shock Front',
        description: 'Charged particles ripple through a planet’s magnetic boundary, glowing faintly.',
        options: [
            {
                text: 'Sample Charged Particle Stream',
                effects: { fuel: -1, resources: { "Supercooled Helium": 1 } },
                outcome: 'You dip sensors into the stream and recover 1 Supercooled Helium.'
            },
            {
                text: 'Collect Exotic Ice Accretions',
                effects: { fuel: -2, resources: { "Exotic Ices": 1 } },
                outcome: 'You carefully maneuver to capture rare ices, gaining 1 Exotic Ices.'
            },
            {
                text: 'Log and Monitor Remotely',
                effects: { fuel: 0, resources: {} },
                outcome: 'You observe the interaction at a distance. No resources collected.'
            }
        ]
    }
    // Add more hazards here
];