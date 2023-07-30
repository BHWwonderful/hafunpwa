import { getStorage, ref, getDownloadURL } from "firebase/storage"

const fetchLevelTestImgFromFireStorage = async (img) => {
  const storage = getStorage();
  try{
    const newURL = "leveltestImage/" + `${img}`;
    const url = await getDownloadURL(ref(storage, newURL));

    const response = await fetch(url);
    const blob = await response.blob();
    const imageURL = URL.createObjectURL(blob);
    return imageURL;

  } catch (error) {
    console.error("Error loading image:", error);
  }
}

export default fetchLevelTestImgFromFireStorage;