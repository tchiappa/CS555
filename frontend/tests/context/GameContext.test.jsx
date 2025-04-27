import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import {useContext, useState} from 'react';
import GameContext, {GameProvider} from "../../src/context/GameContext";

// Mock the planet data.
vi.mock('../../src/planetInfo/data.js', () => ({
    default: {
        planets: [
            {
                name: "Earth",
                information: "Earth is the third planet from the Sun and the only known astronomical object to harbor life.",
                questions: {
                    easy: [
                        {
                            question: "What percentage of Earth's surface is covered by water?",
                            options: ["29%", "50%", "71%", "90%"],
                            answer: "71%",
                        },
                        {
                            question: "What is Earth's atmosphere mostly made of?",
                            options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
                            answer: "Nitrogen",
                        }
                    ],
                    medium: [
                        {
                            question: "What is Earth's axial tilt?",
                            options: ["0°", "23.5°", "45°", "90°"],
                            answer: "23.5°",
                        },
                        {
                            question: "Which layer of Earth generates its magnetic field?",
                            options: ["Crust", "Mantle", "Outer core", "Inner core"],
                            answer: "Outer core",
                        }
                    ],
                    hard: [
                        {
                            question: "What is Earth's moment of inertia factor?",
                            options: ["0.33", "0.50", "0.70", "1.00"],
                            answer: "0.33",
                        },
                        {
                            question: "How much has sea level risen since 1900?",
                            options: ["0 cm", "10 cm", "20 cm", "50 cm"],
                            answer: "20 cm",
                        }
                    ],
                },
            }
        ]
    }
}));

function FullTestComponent() {
    const {
        stationVisits, // number
        setStationVisits, // setter
        playerResources, // array
        setPlayerResources, // setter
        difficulty, // string
        adjustDifficulty, // setter
        getPlanetInfo, // array
        getQuestion, //
        planetaryResources, // array
        setPlanetaryResources, // setter
        fuel, // number
        setFuel, // setter
        points, // number
        setPoints // setter
    } = useContext(GameContext);

    return (
        <div>
        </div>
    );
}

// --------------------------------------------------
// STATION TESTS
// --------------------------------------------------

function StationVisitsTestComponent() {
    const {
        stationVisits, // number
        setStationVisits // setter
    } = useContext(GameContext);

    return (
        <div>
            <div data-testid="stationVisits">{stationVisits}</div>
            <button onClick={() => setStationVisits(stationVisits + 1)}>Increment Station Visits</button>
        </div>
    );
}

describe('GameContext:StationVisits', () => {
    it('provides default values correctly', () => {
        render(
            <GameProvider>
                <StationVisitsTestComponent />
            </GameProvider>
        );

        expect(screen.getByTestId('stationVisits')).toHaveTextContent('0');
    });

    it('increments stationVisits when setStationVisits is called', async () => {
        render(
            <GameProvider>
                <StationVisitsTestComponent />
            </GameProvider>
        );

        await userEvent.click(screen.getByText('Increment Station Visits'));
        expect(screen.getByTestId('stationVisits')).toHaveTextContent('1');
    });
});

// --------------------------------------------------
// QUESTION TESTS
// --------------------------------------------------

function QuestionTestComponent({lastAnswer, secondLastAnswer}) {
    const {
        difficulty, // string
        getQuestion // getter/setter (also sets difficulty)
    } = useContext(GameContext);

    const [question, setQuestion] = useState('');

    function handleGetQuestion() {
        const question = getQuestion({
            planet: 'Earth',
            secondLastAns: secondLastAnswer,
            lastAns: lastAnswer
        });

        if (question) {
            console.log('Question text:', question.question);
            setQuestion(question);
        }
    }

    return (
        <div>
            <div data-testid="question">{question.question}</div>
            <div data-testid="difficulty">{difficulty}</div>

            <button onClick={handleGetQuestion}>Get Question</button>
        </div>
    );
}

describe('GameContext:Questions', () => {
    it('provides default values correctly', () => {
        render(
            <GameProvider>
                <QuestionTestComponent />
            </GameProvider>
        );

        expect(screen.getByTestId('difficulty')).toHaveTextContent('easy');
    });

    it('provides an easy first question', async () => {
        render(
            <GameProvider>
                <QuestionTestComponent lastAnswer={false} secondLastAnswer={false} />
            </GameProvider>
        );

        // Initially, difficulty should be "easy"
        expect(screen.getByTestId('difficulty')).toHaveTextContent('easy');

        await userEvent.click(screen.getByText('Get Question'));

        // Now after clicking, difficulty should upgrade (easy -> medium)
        expect(screen.getByTestId('difficulty')).toHaveTextContent('easy');

        // Also, a question should now appear
        expect(screen.getByTestId('question')).not.toBeEmptyDOMElement();
    });

    it('raises difficulty based on last two answers and fetches a question', async () => {
        render(
            <GameProvider>
                <QuestionTestComponent lastAnswer={true} secondLastAnswer={true} />
            </GameProvider>
        );

        // Initially, difficulty should be "easy"
        expect(screen.getByTestId('difficulty')).toHaveTextContent('easy');

        await userEvent.click(screen.getByText('Get Question'));

        // Now after clicking, difficulty should upgrade (easy -> medium)
        expect(screen.getByTestId('difficulty')).toHaveTextContent('medium');

        // Also, a question should now appear
        expect(screen.getByTestId('question')).not.toBeEmptyDOMElement();
    });
});