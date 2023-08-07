import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const auth = getAuth();
const storage = getStorage();

const updateProfile = async (name, email, ImgFile) => {

  try{
    const imageRef = ref(storage, `userImage/${ImgFile.name}`)

    await uploadBytes(imageRef, ImgFile);

    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    })
    await updateEmail(auth.currentUser, email)
  } catch (error) {
    console.log(error);
  }
}