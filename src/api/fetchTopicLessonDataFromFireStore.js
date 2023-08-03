import { query, collectionGroup, where, getDocs } from "firebase/firestore/lite";
import db from "../Firebase-config";

const fetchTopicLessonDataFromFireStore = async (collectionName, lessonName) => {
  try{
    const q = query(collectionGroup(db, collectionName), where("title", "==", lessonName));
    const querySnapshot = await getDocs(q);
    const dataFromFireBase = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return dataFromFireBase;
  } catch(error){
    console.log(error);
  }
}

export default fetchTopicLessonDataFromFireStore;

