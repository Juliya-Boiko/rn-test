import { db } from '../config';
import { collection, getDocs } from "firebase/firestore"; 

export const getPosts = async () => {
  const data = await getDocs(collection(db, "posts"));
  const items = [];
  data.forEach((doc) => {
    const item = {
      id: doc.id,
      ...doc.data(),
    }
    items.push(item);
  });
  return items;
};