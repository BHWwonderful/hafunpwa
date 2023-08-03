import { query, collectionGroup, where, getDocs } from "firebase/firestore/lite";
import db from "../Firebase-config";

const fetchNestedTopicContent = async (docId) => {
  try{
    const q = query(collectionGroup(db, docId));
    const querySnapshot = await getDocs(q);
    const dataFromFirebase = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return dataFromFirebase;
  } catch(error){
    console.log(error);
  }

}

export default fetchNestedTopicContent;