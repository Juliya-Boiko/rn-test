import { FlatList, View, Image, StyleSheet, Button, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import EvilIcons from 'react-native-vector-icons/EvilIcons';

export const DefaultPostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts(prevState => [...prevState, route.params]);
    }
  }, [route.params]);
  
  const mapHandler = () => {
    navigation.navigate('Map');
    //console.log(data);
  };

  const commentsHandler = () => {
    navigation.navigate('Comments');
  };

  return (
    <FlatList
      style={styles.container}
      data={posts}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) =>
        <View style={styles.postItem}>
          <Image source={{ uri: item.post.photo.uri }} style={styles.postImage} />
          <Text style={styles.postTitle}>{item.post.title}</Text>
          <View style={styles.postDetails}>
            <TouchableOpacity onPress={commentsHandler}>
              <EvilIcons name="comment" color='#BDBDBD' size={24}/>
            </TouchableOpacity>
            <View style={styles.location}>
              <EvilIcons name="location" color='#BDBDBD' size={24} style={styles.locationIcon} />
              <Text style={styles.locationText} onPress={() => navigation.navigate('Map', { item })}>Location</Text>
            </View>
          </View>
        </View>
      }
    />
  );
  
  //console.log(route.params);
  //return <Text>PostsScreen</Text>
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