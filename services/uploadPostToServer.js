import { db } from '../firebase/config';
import { collection, addDoc } from "firebase/firestore";
import { uploadPhotoToServer } from './uploadPhotoToServer';

export const uploadPostToserver = async (post, userId) => {
  const { title, location } = post;
  const photo = await uploadPhotoToServer(post);
  try {
    await addDoc(collection(db, "posts"), { userId, photo, title, location });
  } catch (e) {
    console.error("Error adding document: ", e.message);
  }
};