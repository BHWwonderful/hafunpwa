import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
async function createUserByFirebase(email, password){
  try{
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      // Sign in
    const user = userCredential.user;
    console.log(user);
    return user;
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