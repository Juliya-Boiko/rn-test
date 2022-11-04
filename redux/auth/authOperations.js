import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";

export const registerUser = async ({ login, email, password }) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, { displayName: login });
    const user = await auth.currentUser;
    return user;
  } catch (error) {
    console.log(error.message); 
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const user = await auth.currentUser;
    return user;
  } catch (error) {
    console.log(error.message); 
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth).then(() => {
      console.log('LOGOUT SUCCESS')
    });
  } catch (error) {
    console.log(error);
  }
};
