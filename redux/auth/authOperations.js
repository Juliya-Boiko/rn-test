import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const loginUser = ({ login, email, password }) => async (dispatch, getState) => {
  try {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = () => async (dispatch, getState) => {
  try {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = () => async (dispatch, getState) => {
  try {
    
  } catch (error) {
    console.log(error);
  }
};
