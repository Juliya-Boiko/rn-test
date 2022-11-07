import { db } from '../../firebase/config';
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

export const uploadComment = async (data, id) => {
  const docRef = doc(db, "posts", id);
  await updateDoc(docRef, {
    comments: arrayUnion(data),
  });
};