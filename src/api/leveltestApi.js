import { query, collection, where, getDocs } from "firebase/firestore/lite";
import db from "../Firebase-config";

const fetchLevelTestDataFromFireBase = async (userLevel) => {
  const q = query(collection(db, 'leveltest'), where("level", "==", userLevel));
  const querySnapshot = await getDocs(q);
  const dataFromFirebase = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return dataFromFirebase;
}

export default fetchLevelTestDataFromFireBase;