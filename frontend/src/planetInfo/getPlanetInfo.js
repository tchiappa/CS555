export const getPlanetInfo = (planetName) => {
    switch (planetName) {
      case "Mercury":
        return {
          information: "Mercury is the closest planet to the Sun and has a rocky surface covered with craters.",
          funFacts: [
            "Mercury has no atmosphere to retain heat, so temperatures vary drastically.",
            "A year on Mercury is just 88 Earth days.",
            "Mercury is the smallest planet in our solar system."
          ],
        };
  
      case "Venus":
        return {
          information: "Venus is similar in size to Earth but has a thick, toxic atmosphere that traps heat.",
          funFacts: [
            "Venus is the hottest planet in the solar system.",
            "It rotates in the opposite direction of most planets.",
            "A day on Venus is longer than a year on Venus!"
          ],
        };
  
      case "Earth":
        return {
          information: "Earth is the only planet known to support life, with vast oceans and a breathable atmosphere.",
          funFacts: [
            "Earth is about 70% water.",
            "It has one moon, which helps stabilize its tilt.",
            "Earth is the densest planet in the solar system."
          ],
        };
  
      case "Mars":
        return {
          information: "Mars is the fourth planet from the Sun and is known as the Red Planet due to iron oxide on its surface.",
          funFacts: [
            "Mars has the tallest volcano in the solar system—Olympus Mons.",
            "A day on Mars is just over 24 hours long.",
            "Mars has two moons: Phobos and Deimos."
          ],
        };
  
      case "Jupiter":
        return {
          information: "Jupiter is the largest planet in the solar system and is known for its Great Red Spot.",
          funFacts: [
            "Jupiter is so big that all other planets could fit inside it.",
            "It has at least 79 moons.",
            "The Great Red Spot is a giant storm that's been raging for centuries."
          ],
        };
  
      case "Saturn":
        return {
          information: "Saturn is famous for its beautiful ring system made of ice and rock particles.",
          funFacts: [
            "Saturn could float in water due to its low density.",
            "Its largest moon, Titan, has rivers and lakes of methane.",
            "Saturn’s rings are over 170,000 miles wide but less than a mile thick."
          ],
        };
  
      case "Uranus":
        return {
          information: "Uranus is an ice giant with a pale blue color due to methane in its atmosphere.",
          funFacts: [
            "Uranus rotates on its side compared to other planets.",
            "It has faint rings and 27 known moons.",
            "Seasons on Uranus last over 20 years."
          ],
        };
  
      case "Neptune":
        return {
          information: "Neptune is the farthest known planet in the solar system and is known for its deep blue color.",
          funFacts: [
            "Neptune has the strongest winds in the solar system.",
            "It was the first planet discovered through mathematical prediction.",
            "A year on Neptune lasts 165 Earth years."
          ],
        };
  
      default:
        return { information: "", funFacts: [] };
    }
  };
  