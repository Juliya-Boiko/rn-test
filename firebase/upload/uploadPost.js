import { db } from '../config';
import { collection, addDoc } from "firebase/firestore";
import { uploadPhoto } from './uploadPhoto';

export const uploadPost = async (post, userId) => {
  const { title, location } = post;
  const photo = await uploadPhoto(post);
  try {
    await addDoc(collection(db, "posts"), { userId, photo, title, location });
  } catch (e) {
    console.error("Error adding document: ", e.message);
  }
};

