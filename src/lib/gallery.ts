export const PHOTOS = Array.from({ length: 61 }, (_, index) => {
  const number = index + 1;
  const id = String(number).padStart(2, "0");
  return {
    id,
    src: `/fair-2026/${id}.jpg`,
    alt: `Photo ${number} from the 2026 MV Science Fair`,
  };
});

const openingPhotoIds = ["09", "12", "26", "33", "42", "51", "57", "61"];
const openingPhotoIdSet = new Set(openingPhotoIds);
export const DISPLAY_PHOTOS = [
  ...openingPhotoIds.flatMap((id) => PHOTOS.filter((photo) => photo.id === id)),
  ...PHOTOS.filter((photo) => !openingPhotoIdSet.has(photo.id)),
];
