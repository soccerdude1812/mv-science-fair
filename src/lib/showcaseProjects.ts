import { PHOTOS } from "@/lib/gallery";

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
