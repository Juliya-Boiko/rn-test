import { db } from '../../firebase/config';
import { doc, getDoc } from "firebase/firestore";

export const getComments = async (id) => {
  const docRef = doc(db, "posts", id);
  const { comments } = await (await getDoc(docRef)).data();
  return comments;
};