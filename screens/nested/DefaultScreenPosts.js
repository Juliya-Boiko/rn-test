import { FlatList, View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { collection, getDocs } from "firebase/firestore"; 
import { db } from '../../firebase/config';

export const DefaultPostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts();
    //console.log(posts);
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
    <FlatList
      style={styles.container}
      data={posts}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) =>
        <View style={styles.postItem}>
          <Image source={{ uri: item.photo }} style={styles.postImage} />
          <Text style={styles.postTitle}>{item.title}</Text>
          <View style={styles.postDetails}>
            <TouchableOpacity onPress={() => navigation.navigate('Comments', { postId: item.id })} >
              <EvilIcons name="comment" color='#BDBDBD' size={24}/>
            </TouchableOpacity>
            <View style={styles.location}>
              <EvilIcons name="location" color='#BDBDBD' size={24} style={styles.locationIcon} />
              <Text style={styles.locationText} onPress={() => navigation.navigate('Map', { location: item.location })}>Location</Text>
            </View>
          </View>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  postItem: {
    justifyContent: 'center',
    marginBottom: 32,
  },
  postImage: {
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
  },
  postTitle: {
    marginBottom: 8,
    fontFamily: 'Roboto-500',
    fontSize: 16,
    color: '#212121',
  },
  postDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  location: {
    flexDirection: 'row',
  },
  locationIcon: {
    marginRight: 4,
  },
  locationText: {
    fontFamily: 'Roboto-400',
    fontSize: 16,
    color: '#212121',
    textDecorationLine: 'underline'
  },
});