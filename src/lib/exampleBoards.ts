/**
 * Example display boards for grades 3 to 5.
 *
 * These are NOT past student work. The 2026 fair is the first MV Science Fair,
 * so there is no archive to draw on, and the one Drive folder that collects
 * board photographs from the application form is empty. Every board below was
 * written by the club as a model, and the page says so out loud. If real boards
 * ever go up here, they need the family's written permission first and the
 * "we built these" note has to come down in the same change.
 *
 * Three constraints shape all of them, and they come from the rest of the site:
 *   1. `/display-and-safety`: the nine required sections all have to appear, so
 *      a family can check a board against the rule by looking at the picture.
 *   2. Same page: nothing physical from a project comes to the venue, so every
 *      example shows photographs and a data table doing the work instead.
 *   3. Every question here is one of the twelve in `projectIdeas.ts`, linked by
 *      `ideaSlug`. A family that likes a board can walk straight into the full
 *      write-up of how to run it.
 *
 * The numbers are invented but they are made to behave like real measurements:
 * the hypothesis is wrong on two of the three boards, one result peaks and then
 * falls instead of rising forever, and each conclusion names the weakest part of
 * its own setup. That is the thing worth copying, and a board full of tidy
 * confirmations would teach the opposite.
 */

/** A bar chart small enough to sit in one panel of a board. */
export interface BoardChart {
  kind: "bar";
  /** Printed under the chart, the way an axis label reads on a real board. */
  caption: string;
  bars: { name: string; value: number }[];
  /** Appended to every printed value, e.g. " cm". */
  unit?: string;
}

/** A multi-series line chart, for anything measured over time. */
export interface BoardLineChart {
  kind: "line";
  caption: string;
  /** x-axis ticks, e.g. days. */
  x: number[];
  xLabel: string;
  /** Unit printed at the top of the y axis, e.g. "cm". */
  yLabel?: string;
  series: { name: string; values: number[] }[];
}

export interface BoardTable {
  caption?: string;
  head: string[];
  rows: string[][];
}

export type BoardBlock = {
  /** Section heading printed on the block. */
  label: string;
  /** Step number on the anatomy map. Omitted on the worked examples. */
  n?: number;
  /** Paragraphs. */
  lines?: string[];
  /** Numbered steps, for a Procedure block. */
  steps?: string[];
  chart?: BoardChart | BoardLineChart;
  table?: BoardTable;
  /** A dashed frame describing the photograph that belongs there. */
  photo?: string;
  /** Pulls the block out as the one the eye should land on first. */
  emphasis?: boolean;
};

export interface BoardSpec {
  /** The banner across the top of the board. */
  title: string;
  left: BoardBlock[];
  center: BoardBlock[];
  right: BoardBlock[];
}

export interface ExampleBoard {
  slug: string;
  /** Heading above the board on the page. */
  name: string;
  grade: string;
  category: "Life & Health Sciences" | "Physical Science & Engineering";
  /** Matches the difficulty vocabulary on /project-ideas. */
  difficulty: "Starter" | "Step up";
  /** Honest estimate of what the project costs a family in time. */
  effort: string;
  /** The idea in `projectIdeas.ts` this board is built from. */
  ideaSlug: string;
  /** Two or three things a family should copy from this board. */
  whyItWorks: string[];
  board: BoardSpec;
}

/* ------------------------------------------------------------------ *
 * The anatomy map: where the nine required sections go.
 * ------------------------------------------------------------------ */

export const BOARD_ANATOMY: BoardSpec = {
  title: "Your Question, Big Enough To Read From The Doorway",
  left: [
    {
      n: 3,
      label: "Question or Problem",
      lines: [
        "One sentence. The thing you actually wanted to find out, written the way you would say it out loud.",
      ],
    },
    {
      n: 4,
      label: "Hypothesis or Design Goal",
      lines: [
        "What you predicted before you started, and why you thought so. Write it in the past tense and never edit it to match your results.",
      ],
    },
    {
      n: 5,
      label: "Materials",
      lines: [
        "A plain list. Include the sizes and amounts, because that is what makes your test repeatable.",
      ],
    },
    {
      n: 6,
      label: "Procedure",
      lines: [
        "Numbered steps, short enough that someone else could follow them and get your results. Say how many trials you ran.",
      ],
    },
  ],
  center: [
    {
      n: 2,
      label: "Abstract",
      lines: [
        "One paragraph, four sentences, written last: why it matters, what you did, what you found, what it means.",
      ],
    },
    {
      label: "Photographs",
      photo:
        "Not one of the nine, and still the block that does the most work. Your setup, shot the same way every time, is how a judge sees an experiment that stayed at home.",
    },
    {
      n: 7,
      label: "Data and Results",
      emphasis: true,
      lines: [
        "The biggest block on the board, in the middle, where the eye lands first. One chart that answers the question, with both axes labelled and units on the numbers.",
      ],
    },
  ],
  right: [
    {
      label: "Data table",
      lines: [
        "Still section 7. The numbers behind the chart, every trial, including the ones that went wrong.",
      ],
    },
    {
      n: 8,
      label: "Conclusion",
      lines: [
        "Did the data match your prediction, yes or no. Then what you would change, and what you would test next.",
      ],
    },
    {
      n: 9,
      label: "Citations",
      lines: [
        "Author, year, title, where you found it, and the date you read it. Every image, chart and fact you did not measure yourself needs one.",
      ],
    },
  ],
};

/** Title is section 1, printed across the banner rather than in a panel. */
export const ANATOMY_TITLE_NOTE =
  "Section 1 is the title itself. Readable from about three metres, and no name on the front of the board.";

/* ------------------------------------------------------------------ *
 * The worked examples.
 * ------------------------------------------------------------------ */

export const EXAMPLE_BOARDS: ExampleBoard[] = [
  {
    slug: "paper-towels",
    name: "Which Paper Towel Really Holds the Most Water?",
    grade: "Grades 3 to 4",
    category: "Life & Health Sciences",
    difficulty: "Starter",
    effort: "A weekend, kitchen scale and three brands of towel",
    ideaSlug: "paper-towel-strength",
    whyItWorks: [
      "Every square was cut to the same 10 cm by 10 cm, so the brand is the only thing that changed. A bigger sheet holding more water would have proved nothing.",
      "The prediction was wrong and the board says so in the first line of the conclusion. Judges score honest reasoning, not lucky guesses.",
      "One chart, one number, both axes labelled. You can read the answer from across the room and then go find the table that backs it up.",
    ],
    board: {
      title: "Which Paper Towel Really Holds the Most Water?",
      left: [
        {
          label: "Question",
          lines: [
            "Every paper towel advert says theirs soaks up the most. Which brand really holds the most water for its own weight?",
          ],
        },
        {
          label: "Hypothesis",
          lines: [
            "I predicted Brand C would win, because it is the thickest and it feels the heaviest when it is dry.",
          ],
        },
        {
          label: "Materials",
          lines: [
            "Three brands of paper towel. Kitchen scale reading to 0.1 g. Ruler and scissors. Bowl of room-temperature water. Timer. Cooling rack to drip over.",
          ],
        },
        {
          label: "Procedure",
          steps: [
            "Cut a 10 cm by 10 cm square from each brand.",
            "Weigh the dry square and write the weight down.",
            "Hold it flat under water for 10 seconds.",
            "Lift it out and let it drip for exactly 10 seconds.",
            "Weigh it wet. Water held is wet weight minus dry weight.",
            "Repeat five times for each brand, with a fresh square every time.",
          ],
        },
      ],
      center: [
        {
          label: "Abstract",
          lines: [
            "Paper towel brands make a claim you can measure, so I measured it. I cut three brands to the same size, soaked and dripped each one on the same timer, and weighed them dry and wet, five squares per brand. Brand B held the most water for its own weight, 5.8 g of water per gram of towel, even though Brand C held more water per sheet. Comparing by sheet rewards a brand for making its sheets bigger, so weight is the fairer test.",
          ],
        },
        {
          label: "Photographs",
          photo:
            "The three squares cut to size next to the ruler, and one square on the scale reading 2.4 g",
        },
        {
          label: "Data and Results",
          emphasis: true,
          chart: {
            kind: "bar",
            caption: "Grams of water held per gram of dry towel, average of 5 trials",
            unit: " g",
            bars: [
              { name: "Brand A", value: 4.1 },
              { name: "Brand B", value: 5.8 },
              { name: "Brand C", value: 5.3 },
            ],
          },
        },
      ],
      right: [
        {
          label: "Data table",
          table: {
            caption: "Five trials per brand, in grams",
            head: ["Brand", "Dry", "Water held", "Per gram"],
            rows: [
              ["A", "1.9", "7.8", "4.1"],
              ["B", "2.4", "13.9", "5.8"],
              ["C", "3.1", "16.4", "5.3"],
            ],
          },
        },
        {
          label: "Conclusion",
          lines: [
            "My hypothesis was wrong. Brand C did soak up the most water per sheet, 16.4 g, but it is also the heaviest sheet, so per gram of towel it came third. Brand B held 5.8 g of water for every gram of itself and won on the measure that is actually fair.",
            "If you compare brands by the sheet, you are measuring how big the sheet is, not how good the towel is.",
          ],
        },
        {
          label: "What I would change",
          lines: [
            "Two of my Brand A trials came out identical, which makes me think my scale is not precise enough. Next time I would use one that reads to 0.01 g, and I would work out cost per gram of water held, because the cheapest towel was not the worst.",
          ],
        },
        {
          label: "Citations",
          lines: [
            "Science Buddies. (2026). Which Paper Towel Is the Most Absorbent? Retrieved 14 March 2026 from sciencebuddies.org.",
            "Mountain View Public Library. (2024). The Science of Everyday Materials, p. 31.",
          ],
        },
      ],
    },
  },

  {
    slug: "paper-airplane-weight",
    name: "Does a Heavier Paper Airplane Fly Farther?",
    grade: "Grade 5",
    category: "Physical Science & Engineering",
    difficulty: "Starter",
    effort: "An afternoon of throwing, plus a week of write-up",
    ideaSlug: "paper-airplane-weight",
    whyItWorks: [
      "Ten throws at each weight instead of one, and the longest and shortest throws are printed on the board rather than quietly dropped.",
      "The answer is a shape, not a winner. Distance climbs, peaks at two paperclips, and falls again, which is a real engineering trade-off.",
      "It names the weakest part of the setup, and that weak part is the student's own throwing arm. That sentence is worth more to a judge than a tidier graph.",
    ],
    board: {
      title: "Does a Heavier Paper Airplane Fly Farther?",
      left: [
        {
          label: "Question",
          lines: [
            "Adding weight is supposed to help a paper plane push through the air. Is there a point where more weight starts to hurt instead?",
          ],
        },
        {
          label: "Hypothesis",
          lines: [
            "I predicted the plane would fly farther with each paperclip up to about three clips, then get too heavy and dive.",
          ],
        },
        {
          label: "Materials",
          lines: [
            "Twenty sheets of the same printer paper. Fifteen identical paperclips. A 30 m tape measure. Masking tape for the throwing line. An empty school hallway, so there is no wind.",
          ],
        },
        {
          label: "Procedure",
          steps: [
            "Fold four planes from one design, folding until they came out the same.",
            "Tape a throwing line to the floor and mark my throwing height on the wall.",
            "Throw with no clips, ten times, measuring to where the nose landed.",
            "Add one clip to the nose and throw ten more. Then two clips, then three, then four.",
            "Write down every throw, including the ones that nose-dived.",
          ],
        },
      ],
      center: [
        {
          label: "Abstract",
          lines: [
            "I wanted to know whether a heavier paper plane always flies farther. I threw the same design fifty times, ten throws each at five different nose weights, from one line in one hallway. Distance rose from 412 cm with no clips to 601 cm with two clips, then dropped to 389 cm with four. There is a sweet spot rather than a straight line, and after it the extra weight stops helping and starts pulling the nose down.",
          ],
        },
        {
          label: "Photographs",
          photo:
            "The same plane from the side with 0, 2 and 4 clips on the nose, and the tape measure running down the hallway",
        },
        {
          label: "Data and Results",
          emphasis: true,
          chart: {
            kind: "bar",
            caption: "Average distance flown, 10 throws at each weight",
            unit: " cm",
            bars: [
              { name: "0 clips", value: 412 },
              { name: "1 clip", value: 528 },
              { name: "2 clips", value: 601 },
              { name: "3 clips", value: 544 },
              { name: "4 clips", value: 389 },
            ],
          },
        },
      ],
      right: [
        {
          label: "Data table",
          table: {
            caption: "Distance in centimetres, 10 throws each",
            head: ["Clips", "Average", "Longest", "Shortest"],
            rows: [
              ["0", "412", "505", "300"],
              ["1", "528", "610", "415"],
              ["2", "601", "688", "502"],
              ["3", "544", "640", "430"],
              ["4", "389", "470", "295"],
            ],
          },
        },
        {
          label: "Conclusion",
          lines: [
            "Distance peaked at two paperclips, 601 cm on average, and fell away on both sides of it. So the answer is no: heavier helps only up to a point, and after that the plane is too heavy to stay in the air.",
            "I was right about the shape and wrong about where the peak would be. I guessed three clips and it was two.",
          ],
        },
        {
          label: "What I would change",
          lines: [
            "My throws were not identical, and the gap between my longest and shortest throw at one weight was 200 cm. A rubber band launcher would take my arm out of the experiment. I would also time how long each plane stayed up, because the farthest plane might not be the one that flew longest.",
          ],
        },
        {
          label: "Citations",
          lines: [
            "NASA Glenn Research Center. (2024). Four Forces on an Airplane. Retrieved 2 April 2026 from grc.nasa.gov.",
            "Blackburn, K. (2023). The Paper Airplane Guy: Fold, Throw, Measure. p. 44.",
          ],
        },
      ],
    },
  },

  {
    slug: "plants-and-light",
    name: "Will a Bean Plant Grow Around a Wall to Reach Light?",
    grade: "Grade 5 and up",
    category: "Life & Health Sciences",
    difficulty: "Step up",
    effort: "Three weeks of measuring every other day",
    ideaSlug: "plants-and-light",
    whyItWorks: [
      "Three weeks of measurements taken every two days, photographed against the same ruler and the same background, so the change is obvious instead of claimed.",
      "It reports the result that did not fit: the tallest plants turned out to be the weakest ones. Noticing that is the whole skill.",
      "Nothing living comes to the fair, so the photographs and the graph do the entire job. That is the version of this project that can actually be judged on September 26.",
    ],
    board: {
      title: "Will a Bean Plant Grow Around a Wall to Reach Light?",
      left: [
        {
          label: "Question",
          lines: [
            "Seedlings lean toward a window. If I put a cardboard wall between a bean plant and its only light, will the stem grow around the wall or give up?",
          ],
        },
        {
          label: "Hypothesis",
          lines: [
            "I predicted the plants in the boxes would bend toward the hole and grow around the wall, and that they would end up shorter than plants in open light because they were getting less of it.",
          ],
        },
        {
          label: "Materials",
          lines: [
            "Twelve bean seeds. Twelve identical pots and one bag of soil. Two shoeboxes, each with a 4 cm hole cut in one end, and a cardboard wall taped inside one of them. Ruler, protractor, camera, and one measuring cup used for every watering.",
          ],
        },
        {
          label: "Procedure",
          steps: [
            "Plant twelve seeds, 2 cm deep, on the same day.",
            "Split them into three groups of four: maze box, plain box with a hole, and open light on the windowsill.",
            "Give every pot 50 ml of water at the same time each morning.",
            "Measure height and lean angle every two days for three weeks.",
            "Photograph each pot against the same wall with the same ruler in the frame.",
          ],
        },
      ],
      center: [
        {
          label: "Abstract",
          lines: [
            "Plants can sense where light is coming from, so I tested how far they will go to reach it. Twelve bean seedlings grew in three conditions for twenty days: open light, a box with one hole, and the same box with a cardboard wall in the way. Every plant in a box leaned toward the hole, and the maze plants bent around the wall to an average of 61 degrees. The boxed plants also grew taller than the ones in open light, which I had predicted backwards.",
          ],
        },
        {
          label: "Photographs",
          photo:
            "The same maze pot on day 4, day 10 and day 20, same wall, same ruler in frame, plus one shot looking into the box from the hole end",
        },
        {
          label: "Data and Results",
          emphasis: true,
          chart: {
            kind: "line",
            caption: "Average height in centimetres, four plants per group",
            xLabel: "Day",
            yLabel: "cm",
            x: [0, 4, 8, 12, 16, 20],
            series: [
              { name: "Hole box", values: [0, 3.4, 7.5, 11.0, 14.2, 16.4] },
              { name: "Maze box", values: [0, 2.9, 6.1, 9.0, 11.8, 14.1] },
              { name: "Open light", values: [0, 3.1, 6.4, 9.2, 11.5, 13.0] },
            ],
          },
        },
      ],
      right: [
        {
          label: "Data table",
          table: {
            caption: "Day 20 averages",
            head: ["Group", "Height", "Lean"],
            rows: [
              ["Open light", "13.0 cm", "6°"],
              ["Hole box", "16.4 cm", "38°"],
              ["Maze box", "14.1 cm", "61°"],
            ],
          },
        },
        {
          label: "Conclusion",
          lines: [
            "Yes. The maze plants bent around the wall instead of stopping at it, reaching 61 degrees by day 20, so a bean plant will change direction rather than sit in the dark.",
            "The part I got wrong is more interesting. The boxed plants grew taller, not shorter. But taller did not mean healthier: the maze stems were the longest and the thinnest, they were pale, and two of them fell over and had to be propped up. Stretching toward a small light is not the same as growing well.",
          ],
        },
        {
          label: "What I would change",
          lines: [
            "Four plants per group is not many, and one maze seed never sprouted, so that group is really three. I would measure stem thickness as well as height, because height on its own made my weakest plants look like the winners.",
          ],
        },
        {
          label: "Citations",
          lines: [
            "Missouri Botanical Garden. (2025). Phototropism: How Plants Find the Light. Retrieved 9 March 2026 from mbgnet.net.",
            "Burnie, D. (2023). Eyewitness: Plant. p. 18.",
          ],
        },
      ],
    },
  },
];

/* ------------------------------------------------------------------ *
 * Habits, stated as a pair so the failure mode sits next to the fix.
 * ------------------------------------------------------------------ */

export const BOARD_HABITS: { do: string; instead: string }[] = [
  {
    do: "Change one thing and hold everything else still.",
    instead: "Change the brand, the size and the soaking time all at once, then have no idea which one mattered.",
  },
  {
    do: "Run the same test three to ten times and average it.",
    instead: "Run it once and report that number as the answer.",
  },
  {
    do: "One chart that answers the question, both axes labelled, units on the numbers.",
    instead: "Four small charts of everything you recorded, none of them labelled.",
  },
  {
    do: "Say plainly whether your prediction was right or wrong.",
    instead: "Quietly rewrite the hypothesis afterwards so it matches the results.",
  },
  {
    do: "Photograph the setup the same way every time, since the project itself stays home.",
    instead: "Bring the plants, the bottles and the ramp, which are not allowed in the room.",
  },
  {
    do: "Short blocks in big type, readable standing up.",
    instead: "Paragraphs printed at 11 point that a judge has to lean in to read.",
  },
];
