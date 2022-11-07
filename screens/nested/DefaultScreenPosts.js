import { useState, useEffect } from "react";
import { List } from '../../components/common/List';
import { getPosts } from '../../firebase/get/getPosts';

export const DefaultPostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    const items = await getPosts();
    setPosts(items);
  };

  return (
    <List data={posts} navigation={navigation} />
  );
};