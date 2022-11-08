import { db } from "../config";
import { collection, query, where, getDocs } from "firebase/firestore";

export const getUserPosts = async (id) => {
  const q = await query(collection(db, "posts"), where("userId", "==", id));
  const querySnapshot = await getDocs(q);
  const items = [];
  querySnapshot.forEach((doc) => {
    const item = {
      id: doc.id,
      ...doc.data(),
    }
    items.push(item);
  });
  return items;
};