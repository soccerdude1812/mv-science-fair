const descriptions = [
  "A student stands behind the lectern in front of a blue stage curtain.",
  "A student speaks to the room from the wooden lectern.",
  "A student looks toward the audience from the lectern.",
  "A student pauses at the lectern during an announcement.",
  "A student stands at the lectern with one hand on its edge.",
  "A student looks down at notes while speaking at the lectern.",
  "A student faces the audience beside the stage curtain.",
  "A student finishes speaking at the lectern.",
  "Two students sit beside a large project board at their table.",
  "A lit project board stands among the fair exhibits.",
  "A project board about global warming is displayed on an easel.",
  "Two students stand in front of a project display in the fair room.",
  "Families and students gather among project tables in the bright room.",
  "An illuminated project board is displayed beside the stage curtain.",
  "A student in a brown shirt speaks at the lectern.",
  "A student turns toward the microphone at the lectern.",
  "A student looks down at notes while presenting from the stage.",
  "A student speaks at the lectern in front of the blue curtain.",
  "A student speaks into the microphone at the front of the room.",
  "A student pauses between remarks at the lectern.",
  "A student stands behind a project board covered with drawings and notes.",
  "A student speaks at the lectern with the blue curtain behind him.",
  "A closer view of a student speaking at the lectern.",
  "A student gestures while speaking at the microphone.",
  "A student continues speaking at the lectern.",
  "A student speaks at the microphone during the fair.",
  "A student looks across the room while speaking at the lectern.",
  "A student stands beside the lectern in front of the curtain.",
  "A student stands beside a tri-fold project board covered with drawings and notes.",
  "A student stands in front of a science project display.",
  "Students, families, and organizers gather around project boards.",
  "A family looks over a project display at a student table.",
  "Several student project boards stand together in the exhibit room.",
  "Two students talk beside a project board near the windows.",
  "A student answers a visitor's question beside a project display.",
  "A student and visitor talk in front of a science fair board.",
  "A student smiles beside a project board titled My Allergy Menu.",
  "A student speaks at the lectern in front of the blue curtain.",
  "A student continues a presentation at the lectern.",
  "A tri-fold board asks which drink attacks your teeth most.",
  "Two students stand beside a project about tooth health.",
  "A high school student listens as a younger student points to a project board.",
  "A high school student gestures while discussing a project with its presenter.",
  "A younger student points to a display while talking with a high school student.",
  "A student explains a project to a visitor beside the display board.",
  "A student continues explaining the project to a visitor.",
  "A student answers a visitor's question beside the project board.",
  "A student stands beside a tall project display as visitors walk through the room.",
  "A volunteer holds a clipboard while students talk about a project.",
  "An organizer holds a clipboard while students present their project.",
  "A student gestures toward a project board while another student listens.",
  "A student points to a detail on the project board.",
  "A student talks beside a tri-fold project display.",
  "A younger student stands beside a large project display.",
  "Students and visitors gather in front of a project board.",
  "A group leans in to look over a student's project display.",
  "An organizer and student stand together at the lectern.",
  "A student speaks at the lectern beside an organizer.",
  "An organizer and student stand beside the microphone.",
  "A student waves while an organizer stands beside him at the lectern.",
  "A student waves to the room while an organizer stands beside him.",
];

const eventPhotos = descriptions.map((description, index) => {
  const number = index + 1;
  const id = String(number).padStart(2, "0");
  return {
    id,
    src: `/fair-2026/${id}.jpg`,
    alt: `Photo ${id}: ${description}`,
  };
});

export const OPENING_PHOTO = {
  id: "62",
  src: "/fair-2026/opening-remarks.jpg",
  alt: "A student organizer speaks at the podium to open the science fair.",
};

export const PHOTOS = [...eventPhotos, OPENING_PHOTO];

const openingPhotoIds = ["62", "09", "12", "26", "33", "42", "51", "57", "61"];
const openingPhotoIdSet = new Set(openingPhotoIds);
export const DISPLAY_PHOTOS = [
  ...openingPhotoIds.flatMap((id) => PHOTOS.filter((photo) => photo.id === id)),
  ...PHOTOS.filter((photo) => !openingPhotoIdSet.has(photo.id)),
];
