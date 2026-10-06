import { PHOTOS } from "@/lib/gallery";

// Complete title roster from the 2026 fair's judge packets. Keep student names
// out of the public list; the project titles are enough to identify each entry.
export const FAIR_PROJECT_TITLES = [
  "Berry Power",
  "Can I build a popsicle stick bridge that holds the most weight?",
  "Does any amount of salt dissolve in any amount of water?",
  "Does classical violin music make plants grow better?",
  "Eggs-periment Time: Does Fluoride Give Eggshell Teeth More Protection?",
  "Elastic Energy: Power the Fan!",
  "Energy wheel",
  "Exploding volcano",
  "Floating on Force",
  "Forces on a slope",
  "Heat at the Summit",
  "How Does Global Warming Affect Clouds in the Sky?",
  "How to make a paper airplane fly far",
  "How Volcanoes Work",
  "How does sunlight exposure affect the amount of water vapor released by plant leaves?",
  "Humanity's Next Challenge",
  "Is slime a liquid or a solid?",
  "Modern House",
  "My Allergy Menu",
  "Non-Newtonian Fluid",
  "Plant/Experiment Combinations",
  "Project Three Wheel",
  "Rainbow pennies",
  "Rocket powered by a chemical reaction",
  "Sensory-Activated Fall Protection",
  "Surface Tension with Paper Clips",
  "The Great Number Draw",
  "The Pythagorean Cup",
  "Understanding pressure",
  "What makes a paper airplane fly farther?",
  "Which drink attacks your teeth the most?",
  "Which kitchen liquid cleans a penny best?",
] as const;

function photoFor(id: string) {
  const photo = PHOTOS.find((item) => item.id === id);
  if (!photo) throw new Error(`Project photo ${id} is missing from the gallery.`);
  return photo;
}

export const SHOWCASE_PROJECTS = [
  {
    title: "Paper Airplane Experiment",
    summary:
      "What makes a paper plane fly far? The board compares color, shape, and throwing method.",
    photo: photoFor("09"),
    width: 1800,
    height: 1200,
  },
  {
    title: "Global Warming & Clouds",
    summary:
      "A jar model explores how warmer conditions affect cloud formation.",
    photo: photoFor("11"),
    width: 1200,
    height: 1800,
  },
  {
    title: "Will the Balloon Pop?",
    summary:
      "A balloon experiment records evidence to investigate when it will pop.",
    photo: photoFor("21"),
    width: 1800,
    height: 1200,
  },
  {
    title: "Heat at Summit",
    summary:
      "Why can mountain peaks feel colder even though they are closer to the sun?",
    photo: photoFor("29"),
    width: 1800,
    height: 1200,
  },
  {
    title: "Non-Newtonian Fluid Study",
    summary:
      "A hands-on study of a fluid that behaves differently under force.",
    photo: photoFor("32"),
    width: 1800,
    height: 1200,
  },
  {
    title: "Solar and Wind Ideas for Mars",
    summary:
      "One display brings together a solar supply vehicle, wind turbines on Mars, and a solar wind turbine.",
    photo: photoFor("33"),
    width: 1800,
    height: 1200,
  },
  {
    title: "My Allergy Menu",
    summary:
      "Could a color-coded menu help people with food allergies order at restaurants?",
    photo: photoFor("37"),
    width: 1800,
    height: 1200,
  },
  {
    title: "Which Drink Attacks Your Teeth Most?",
    summary:
      "An experiment compares the effects of common drinks on tooth enamel, using eggshells as a substitute.",
    photo: photoFor("40"),
    width: 1800,
    height: 1200,
  },
  {
    title: "Do Plants Actually Grow Faster If They Listen to Classical Music?",
    summary:
      "A student compares plant growth while listening to classical music.",
    photo: photoFor("42"),
    width: 1800,
    height: 1200,
  },
] as const;
