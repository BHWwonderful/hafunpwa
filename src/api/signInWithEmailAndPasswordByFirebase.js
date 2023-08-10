import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const signInWithEmailAndPasswordByFireBase = async (email, password) => {
  try{
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

  } catch(error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    if(errorMessage.includes("user-not-found")){
      window.alert("User doesn't exist")
    }
  }
}

export default signInWithEmailAndPasswordByFireBase;