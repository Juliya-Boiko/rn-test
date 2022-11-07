import { useState, useEffect } from "react";
import { db } from '../../firebase/config';
import { collection, getDocs } from "firebase/firestore"; 
import { List } from '../../components/common/List';

export const DefaultPostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    const data = await getDocs(collection(db, "posts"));
    const items = [];
    data.forEach((doc) => {
      const item = {
        id: doc.id,
        ...doc.data(),
      }
      items.push(item);
    });
    setPosts(items);
  };

  return (
    <List data={posts} navigation={navigation} />
  );
};