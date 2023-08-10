import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import db from "../Firebase-config";
import { query, collection, addDoc } from "firebase/firestore/lite";


const auth = getAuth();
const storage = getStorage();
async function createUserByFirebase(email, password, name, userLevel = "beginner"){
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

      const q = query(collection(db, 'user'));
      const querySnapshot = await addDoc(q, {
        name: name,
        uid: user.uid,
        email: email,
        photoURL: photoURL,
        userLevel: userLevel,
      })

      return querySnapshot;

    }
  } catch (error) {
    
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    
  }
}

export default createUserByFirebase;