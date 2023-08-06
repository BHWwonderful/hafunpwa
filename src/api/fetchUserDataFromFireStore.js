import { query, collection, where, getDocs } from "firebase/firestore/lite";
import db from "../Firebase-config";

const fetchUserDataFromFireStore = async (uid) => {
  const q = query(collection(db, 'user'), where('uid', "==", uid));
  const querySnapshot = await getDocs(q);
  const dataFromFirebase = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return dataFromFirebase;
}

export default fetchUserDataFromFireStore;