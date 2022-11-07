import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../config';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadPhoto = async (post) => {
  const response = await fetch(post.photo.uri);
  const blob = await response.blob();
  const storageRef = ref(storage, `postsImages/${uuidv4()}`);
  try {
    await uploadBytes(storageRef, blob);
  } catch (error) {
    console.log(error.message);
  }
  const data = await getDownloadURL(ref(storage, storageRef));
  return data;
};