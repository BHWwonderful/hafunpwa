import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const auth = getAuth();
const storage = getStorage();
async function createUserByFirebase(email, password, name){
  try{
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      // Sign in
    const user = userCredential.user;
    if(user){
      // 클라우드 스토리지 이미지 경로 설정
      const defaultImagePath = `/userImage/default.svg`;
      const storageRef = ref(storage, defaultImagePath);

      // 다운로드 URL 가져오기
      const photoURL = await getDownloadURL(storageRef);

      await updateProfile(user, { displayName: name, photoURL: photoURL});
    }
  } catch (error) {
    
    const errorCode = error.code;
    const errorMessage = error.message;
    
  }
}

export default createUserByFirebase;

// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Sign in
//     const user = userCredential.user;
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message
//   })