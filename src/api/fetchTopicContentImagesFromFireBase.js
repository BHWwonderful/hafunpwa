import { getStorage, ref, getDownloadURL } from "firebase/storage";


const fetchTopicContentImagesFromFireStore = async (imgs) => {
  const storage = getStorage();
  const imageUrls = [];

  try {
    for (const img of imgs) {
      const newURL = "topicImage/" + `${img}`;
      const url = await getDownloadURL(ref(storage, newURL));

      const response = await fetch(url);
      const blob = await response.blob();
      const imageURL = URL.createObjectURL(blob);

      imageUrls.push(imageURL);
    }

    return imageUrls;
  } catch(error) {
    console.error("Error loading images:", error);
  }
}

export default fetchTopicContentImagesFromFireStore;