import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const signInWithEmailAndPasswordByFireBase = async (email, password) => {
  try{
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(user)

  } catch(error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    window.alert(errorMessage);
  }
}

export default signInWithEmailAndPasswordByFireBase;