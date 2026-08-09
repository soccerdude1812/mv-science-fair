/**
 * Example project catalog for grades 3 to 5.
 *
 * Every idea here has to survive three constraints that come from the rest of
 * the site, so read those before adding one:
 *   1. `/display-and-safety`: the venue has NO electricity. Anything shown at
 *      the fair is battery powered or not powered at all.
 *   2. Same page: live organisms and biohazardous material may not be brought
 *      to the venue. Growing something is fine; bring photographs instead.
 *   3. Hazardous substances are out entirely. Kitchen-cupboard materials only.
 *
 * `extraForm` is not decoration. It maps an idea to the safety form we would
 * actually ask for at approval, so a family sees the paperwork coming before
 * they commit to a topic instead of after.
 */

export type Category =
  | "Life & Health Sciences"
  | "Physical Science & Engineering"
  | "Chemistry & Materials"
  | "Technology & Innovation";

export type Difficulty = "Starter" | "Step up" | "Stretch";

export interface ProjectIdea {
  slug: string;
  question: string;
  category: Category;
  difficulty: Difficulty;
  time: string;
  /** One line for the card. */
  teaser: string;
  bigIdea: string;
  youWillNeed: string[];
  howToStart: string[];
  whatToMeasure: string;
  makeItYours: string[];
  /** Which safety form this would trigger at approval, if any. */
  extraForm?: "Human Participation Approval Form" | "Hazardous Materials & Safety Approval Form";
  /** Rule that bites this specific idea, in plain language for a 4th grader. */
  headsUp?: string;
}

export const CATEGORIES: Category[] = [
  "Life & Health Sciences",
  "Physical Science & Engineering",
  "Chemistry & Materials",
  "Technology & Innovation",
];

/** Chip pigment per category. Coral stays reserved for CTAs, per DESIGN.md. */
export const CATEGORY_COLOR: Record<Category, string> = {
  "Life & Health Sciences": "green",
  "Physical Science & Engineering": "blue",
  "Chemistry & Materials": "marigold",
  "Technology & Innovation": "blue",
};

export const PROJECT_IDEAS: ProjectIdea[] = [
  // ---------------- Life & Health Sciences ----------------
  {
    slug: "music-and-math",
    question: "Does music help or hurt when you do math?",
    category: "Life & Health Sciences",
    difficulty: "Step up",
    time: "About a week",
    teaser:
      "Time people solving the same kind of math problems in silence, with quiet music, and with loud music.",
    bigIdea:
      "People argue about this constantly and almost nobody actually tests it. You are measuring whether sound changes how fast and how accurately someone works. The tricky part is fairness: the problems have to be equally hard every round, or you are measuring the worksheet instead of the music.",
    youWillNeed: [
      "Three short math worksheets of the same difficulty",
      "A timer",
      "A speaker or headphones",
      "At least five people willing to be timed",
    ],
    howToStart: [
      "Write three worksheets that are the same kind of problem and the same length.",
      "Decide your three conditions: silence, quiet music, loud music.",
      "Give every person all three conditions, but change the order between people so practice does not fake your results.",
      "Time each round and count how many answers were correct.",
    ],
    whatToMeasure:
      "Seconds to finish, and number correct. Both matter, because someone can go faster by being sloppier.",
    makeItYours: [
      "Compare music with words against music without words.",
      "Try reading comprehension instead of math.",
      "Test whether the effect is different for kids and adults.",
    ],
    extraForm: "Human Participation Approval Form",
    headsUp:
      "This one involves other people, so we will ask for the Human Participation Approval Form when we approve your project. It is short. Everyone you test has to be a volunteer who can stop whenever they want.",
  },
  {
    slug: "paper-towel-strength",
    question: "Which paper towel really holds the most water?",
    category: "Life & Health Sciences",
    difficulty: "Starter",
    time: "A weekend",
    teaser:
      "The commercials all claim it. Weigh the towels wet and dry and find out who is telling the truth.",
    bigIdea:
      "Advertising makes a measurable claim, which means you can check it. The honest version of this project controls for size: a bigger sheet holding more water is not a better towel, so you compare by area or by weight, not by sheet.",
    youWillNeed: [
      "Three or four brands of paper towel",
      "A kitchen scale",
      "A bowl of water",
      "A ruler",
    ],
    howToStart: [
      "Cut every brand to the exact same size.",
      "Weigh each dry piece and write it down.",
      "Soak it for the same number of seconds, lift it, let it drip for the same number of seconds.",
      "Weigh it wet. Water held equals wet weight minus dry weight.",
    ],
    whatToMeasure:
      "Grams of water held per gram of dry towel. That makes thick and thin brands comparable.",
    makeItYours: [
      "Add cost per sheet and work out the best value, not just the best towel.",
      "Test how much weight a wet towel can hold before it tears.",
      "Compare a store brand to the most expensive one.",
    ],
  },
  {
    slug: "plants-and-light",
    question: "Do plants always grow toward the light?",
    category: "Life & Health Sciences",
    difficulty: "Step up",
    time: "Three to four weeks",
    teaser:
      "Grow seedlings in a box with a window cut in one side and watch what they do about it.",
    bigIdea:
      "Plants can sense which direction light comes from and bend toward it. You are testing how strong that pull is: will a seedling grow around a barrier to reach light, and what happens if you rotate the box halfway through?",
    youWillNeed: [
      "Bean seeds, which sprout fast",
      "Small pots and soil",
      "A shoebox with a hole cut in one end",
      "A ruler and a camera",
    ],
    howToStart: [
      "Plant several seeds the same way on the same day.",
      "Put some pots in the box with the hole and leave others in normal light as your comparison.",
      "Water every pot the same amount on the same schedule.",
      "Photograph and measure every two days.",
    ],
    whatToMeasure:
      "Height, and the angle the stem leans. Photos on the same background make the change obvious on your board.",
    makeItYours: [
      "Rotate the box 180 degrees halfway through and see if the plant corrects.",
      "Try different colors of light using colored cellophane.",
      "Test whether a plant will grow through a small maze to reach the hole.",
    ],
    headsUp:
      "Grow them at home, but do not bring the plants to the fair. Live organisms are not allowed at the venue, so bring photographs, your measurements, and your graphs instead. That is what judges want to see anyway.",
  },

  // ---------------- Physical Science & Engineering ----------------
  {
    slug: "strongest-bridge-shape",
    question: "Which shape makes the strongest bridge?",
    category: "Physical Science & Engineering",
    difficulty: "Starter",
    time: "A weekend",
    teaser:
      "Build paper bridges in different shapes and pile on pennies until they fail.",
    bigIdea:
      "Engineers do not make bridges strong by using more material, they do it by choosing a shape that sends the load where the material is strong. Flat paper is weak. Folded into an arch or a triangle beam, the same sheet holds a surprising amount.",
    youWillNeed: [
      "Printer paper, all the same",
      "Two books of equal height for supports",
      "A cup and a lot of pennies",
      "A ruler",
    ],
    howToStart: [
      "Pick three or four shapes: flat, folded into a V, an arch, and a tube.",
      "Use exactly one sheet of paper for every bridge and the same gap between books.",
      "Rest the cup in the middle and add pennies one at a time.",
      "Record the count at the moment the bridge touches the table.",
    ],
    whatToMeasure:
      "Number of pennies held before collapse. Run each shape three times and use the average, because one lucky build is not evidence.",
    makeItYours: [
      "Test whether corrugating the paper into many small folds beats one big arch.",
      "Keep the shape and change the span between the books.",
      "Work out strength per gram of paper.",
    ],
  },
  {
    slug: "paper-airplane-weight",
    question: "Does a heavier paper airplane fly farther?",
    category: "Physical Science & Engineering",
    difficulty: "Starter",
    time: "An afternoon, plus write-up",
    teaser:
      "Add paperclips one at a time and measure where each throw lands.",
    bigIdea:
      "There is usually a sweet spot. Too light and the plane stalls and flutters, too heavy and it dives. You are hunting for the weight where distance peaks, which is a real engineering trade-off and not just a straight line.",
    youWillNeed: [
      "Identical paper for every plane",
      "Paperclips",
      "A tape measure",
      "A long hallway or a calm day outside",
    ],
    howToStart: [
      "Fold several planes the exact same design. Practice until your folds are consistent.",
      "Throw the plane with no clips ten times and mark where the nose lands.",
      "Add one clip to the nose and repeat. Then two, then three.",
      "Throw from the same spot, at the same height, as evenly as you can.",
    ],
    whatToMeasure:
      "Distance in centimeters. Ten throws per weight, then average, because throws vary a lot.",
    makeItYours: [
      "Move the clip to the tail or the wings instead of the nose.",
      "Compare two fold designs at their best weight.",
      "Measure time in the air as well as distance, and see if the winner changes.",
    ],
  },
  {
    slug: "foil-boat-cargo",
    question: "How many pennies can a foil boat hold before it sinks?",
    category: "Physical Science & Engineering",
    difficulty: "Starter",
    time: "An afternoon, plus write-up",
    teaser:
      "Same square of foil, different hull shapes. Find the design that carries the most.",
    bigIdea:
      "A lump of foil sinks and a foil boat floats, using identical metal. What changes is how much water the shape pushes out of the way. You are discovering buoyancy by building it rather than reading about it.",
    youWillNeed: [
      "Aluminum foil cut into equal squares",
      "A tub or sink of water",
      "Lots of pennies",
      "A towel, because this gets wet",
    ],
    howToStart: [
      "Cut at least four squares of foil to exactly the same size.",
      "Fold each into a different hull: flat and wide, deep and narrow, a bowl, a boxy barge.",
      "Float one and add pennies one at a time, spread evenly.",
      "Stop when water comes over the side and record the count.",
    ],
    whatToMeasure:
      "Pennies held at the moment of sinking. Rebuild and repeat three times per shape.",
    makeItYours: [
      "Measure the footprint of each hull and see whether wider always wins.",
      "Try salt water against fresh water with the same boat.",
      "Predict the winner before you test, and write down whether you were right.",
    ],
  },

  // ---------------- Chemistry & Materials ----------------
  {
    slug: "stop-apple-browning",
    question: "What stops an apple slice from turning brown?",
    category: "Chemistry & Materials",
    difficulty: "Starter",
    time: "A weekend",
    teaser:
      "Lemon juice, water, milk, plastic wrap. Photograph every hour and see which one wins.",
    bigIdea:
      "Browning is a chemical reaction between the apple and oxygen in the air. Anything that blocks the oxygen or slows the reaction should help. You are testing kitchen remedies that people swear by and finding out which ones actually do something.",
    youWillNeed: [
      "One apple, so every slice starts the same",
      "Lemon juice, water, milk, plastic wrap",
      "Small plates and a camera",
    ],
    howToStart: [
      "Cut the slices all at once, the same thickness, from the same apple.",
      "Leave one slice completely untreated. That is your comparison and the project is meaningless without it.",
      "Treat the others, one method each.",
      "Photograph all of them together, in the same light, every hour for six hours.",
    ],
    whatToMeasure:
      "Rank the slices by how brown they look at each hour, or score them 1 to 5. Photographing them side by side makes the judging honest.",
    makeItYours: [
      "Try other fruits and see whether the winner stays the winner.",
      "Test whether the fridge beats every coating.",
      "Compare lemon juice strengths by watering it down.",
    ],
    headsUp:
      "Because this uses food, we may ask about allergies at approval. Nothing gets eaten at the fair, and your board shows photographs rather than the actual slices.",
  },
  {
    slug: "melt-ice-fastest",
    question: "What makes ice melt the fastest?",
    category: "Chemistry & Materials",
    difficulty: "Starter",
    time: "An afternoon, plus write-up",
    teaser:
      "Salt, sugar, sand, or nothing at all. Time it and find out why roads get salted.",
    bigIdea:
      "Salt lowers the temperature at which water freezes, so ice with salt on it melts even when the room has not changed. Sugar does something similar but weaker, and sand does almost nothing chemically. This is the reason road crews use salt in winter.",
    youWillNeed: [
      "An ice cube tray so every cube is the same size",
      "Table salt, sugar, sand",
      "Identical plates or cups",
      "A timer",
    ],
    howToStart: [
      "Freeze cubes from the same tray, filled to the same line.",
      "Put one cube on each plate and leave one plain as your comparison.",
      "Add the same measured spoonful of each substance.",
      "Check every two minutes and record when each cube is fully melted.",
    ],
    whatToMeasure:
      "Minutes to fully melt. Keep every plate in the same room, away from sun and heat vents, or you are measuring the room instead.",
    makeItYours: [
      "Try different amounts of salt to find where extra stops helping.",
      "Compare table salt to coarse rock salt.",
      "Measure the water temperature as it melts and see which one gets coldest.",
    ],
  },
  {
    slug: "clean-a-penny",
    question: "Which kitchen liquid cleans an old penny best?",
    category: "Chemistry & Materials",
    difficulty: "Starter",
    time: "An afternoon, plus write-up",
    teaser:
      "Vinegar, lemon juice, soda, soapy water. One of these strips tarnish in seconds.",
    bigIdea:
      "The dull layer on an old penny is copper oxide. Acids dissolve it, which is why lemon juice and vinegar work fast while soapy water mostly does not. You are ranking household liquids by how acidic they effectively are, without needing a lab.",
    youWillNeed: [
      "Ten or more dull pennies",
      "Vinegar, lemon juice, cola, soapy water, plain water",
      "Small cups and a timer",
    ],
    howToStart: [
      "Sort pennies so every cup starts with similar dullness.",
      "Put the same amount of each liquid in its own cup.",
      "Drop pennies in at the same moment and start the timer.",
      "Pull them out at set times, rinse, dry, and photograph them together.",
    ],
    whatToMeasure:
      "Score shininess 1 to 5 at each time point, and photograph all of them side by side under the same light.",
    makeItYours: [
      "Add a pinch of salt to the vinegar and see what changes.",
      "Test whether time or the liquid matters more.",
      "Leave a cleaned penny out for a week and watch it tarnish again.",
    ],
    headsUp:
      "Kitchen liquids only, and an adult should be nearby. Nothing stronger than vinegar. If you want to use a real cleaning product, we will ask for the Hazardous Materials form first, and none of it may come to the fair.",
  },

  // ---------------- Technology & Innovation ----------------
  {
    slug: "block-a-wifi-signal",
    question: "What blocks a WiFi signal best?",
    category: "Technology & Innovation",
    difficulty: "Step up",
    time: "About a week",
    teaser:
      "Wrap a phone in different materials and watch the signal strength drop.",
    bigIdea:
      "WiFi is radio waves, and some materials absorb or reflect them far better than others. Metal is dramatic. You are turning an invisible thing into a graph, which is exactly what good science does.",
    youWillNeed: [
      "A phone or tablet with a WiFi speed test app",
      "Aluminum foil, cardboard, a book, a towel, plastic",
      "A tape measure",
      "An adult's permission to use the device",
    ],
    howToStart: [
      "Pick one spot in the house and measure the distance to the router. Never move either one.",
      "Run a speed test with nothing around the phone. That is your baseline.",
      "Wrap the phone in one material and run the test again.",
      "Unwrap, wait a minute, then test the next material.",
    ],
    whatToMeasure:
      "Download speed and signal bars for each material. Three tests per material, then average, because networks fluctuate on their own.",
    makeItYours: [
      "Test how many layers of foil it takes before the signal dies completely.",
      "Compare a wet towel to a dry one.",
      "Map signal strength room by room and draw a heat map of your home.",
    ],
  },
  {
    slug: "cardboard-phone-stand",
    question: "Can you design a cardboard stand that holds the most weight?",
    category: "Technology & Innovation",
    difficulty: "Step up",
    time: "About a week",
    teaser:
      "Design it, test it to destruction, redesign it. That loop is the whole point.",
    bigIdea:
      "This is engineering rather than an experiment, and judges love it when a student shows the failures. The interesting part is not version one, it is what you changed after it collapsed and whether your change actually helped.",
    youWillNeed: [
      "Cardboard from boxes",
      "Scissors and tape or glue",
      "Books or weights to load it",
      "A notebook for sketching each version",
    ],
    howToStart: [
      "Sketch a design before you cut anything.",
      "Build version one and load it until it fails. Photograph the failure.",
      "Write down why you think it failed, then change exactly one thing.",
      "Repeat for at least four versions.",
    ],
    whatToMeasure:
      "Weight held at failure for each version, and the mass of cardboard used. Strength per gram is the number that shows real improvement.",
    makeItYours: [
      "Set a rule that each version must use less cardboard than the last.",
      "Design for a specific angle, like hands-free video calls.",
      "Compare corrugation running one way against the other.",
    ],
  },
  {
    slug: "what-conducts-electricity",
    question: "What can electricity travel through?",
    category: "Technology & Innovation",
    difficulty: "Step up",
    time: "A weekend",
    teaser:
      "Build a simple battery circuit and test every object in the house for conductors and insulators.",
    bigIdea:
      "A circuit only works when the loop is complete. By putting different objects into the gap, you sort the world into conductors and insulators, and you discover a few surprises. Pencil graphite conducts. Most metals do. Most everything else does not.",
    youWillNeed: [
      "A battery holder with AA batteries",
      "A small bulb or LED with wires",
      "Alligator clips",
      "Objects to test: coins, keys, paperclips, rubber bands, paper, a pencil lead, foil",
    ],
    howToStart: [
      "Build the circuit and confirm the bulb lights when the wires touch each other.",
      "Open a gap in the circuit with two loose clip ends.",
      "Clip a test object across the gap and record whether the bulb lights.",
      "Sort everything you tested into two lists.",
    ],
    whatToMeasure:
      "Lights or does not light, for each object. If you have a bulb that can be dim, note brightness too, because some things conduct weakly.",
    makeItYours: [
      "Test salt water against plain water using two clips in a cup.",
      "Draw a thick pencil line on paper and see how long a line still conducts.",
      "Find something that surprised you and explain why it behaves that way.",
    ],
    headsUp:
      "Battery powered only, never a wall outlet, and always with an adult. That also makes it one of the few projects you can safely demonstrate live at the fair, since the venue has no electricity.",
  },
];

export function getIdea(slug: string): ProjectIdea | undefined {
  return PROJECT_IDEAS.find((p) => p.slug === slug);
}

export function ideasByCategory(category: Category): ProjectIdea[] {
  return PROJECT_IDEAS.filter((p) => p.category === category);
}
