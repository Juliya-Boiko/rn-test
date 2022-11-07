import {
  Text, ImageBackground, StyleSheet, View, Image, TouchableOpacity, FlatList } from "react-native";
import { useState, useEffect } from "react";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../redux/auth/authSlice";
import { logoutUser } from "../redux/auth/authOperations";
import { db } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import EvilIcons from 'react-native-vector-icons/EvilIcons';

export const ProfileScreen = () => {
  const [posts, setPosts] = useState([]);
  const name = useSelector(state => state.auth.user.login);
  const userId = useSelector(state => state.auth.user.id);
  const dispatch = useDispatch();
  //console.log(userID);
  
  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const q = await query(collection(db, "posts"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const items = [];
    querySnapshot.forEach((doc) => {
      const item = {
        id: doc.id,
        ...doc.data(),
      }
      items.push(item);
    });
    //console.log('items ---->', items);
    setPosts(items);
  };

  const logoutHandler = () => {
    logoutUser();
    dispatch(deleteUser());
  };

  return (
    <ImageBackground style={styles.image} source={require('../assets/images/bg-register.jpg')}>
      <View style={styles.profile}>
        <Image source={require('../assets/images/userPhoto.png')} style={styles.userPhoto} />
        <TouchableOpacity style={styles.logout} onPress={logoutHandler}>
          <MaterialIcons name="logout" color='#BDBDBD' size={24} />
        </TouchableOpacity>
        <Text style={styles.userName}>{name}</Text>

        <FlatList
          style={styles.posts}
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) =>
            <View style={styles.postItem}>
              <Image source={{ uri: item.photo }} style={styles.postImage} />
              <Text style={styles.postTitle}>{item.title}</Text>
              <View style={styles.postDetails}>
                <View style={styles.reactions}>
                  <TouchableOpacity style={styles.comments}>
                    <EvilIcons name="comment" color='#BDBDBD' size={24}/>
                  </TouchableOpacity>
                  <View>
                    <EvilIcons name="like" color='#FF6C00' size={24}/>
                  </View>
                </View>
                <View style={styles.location}>
                  <EvilIcons name="location" color='#BDBDBD' size={24} style={styles.locationIcon} />
                  <Text style={styles.locationText} onPress={() => navigation.navigate('Map', { location: item.location })}>Location</Text>
                </View>
              </View>
            </View>
          }
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    paddingTop: 150
  },
  profile: {
    position: 'relative',
    flex: 1,
    paddingVertical: 22,
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#fff',
  },
  userPhoto: {
    position: 'absolute',
    top: -60,
    left: '50%',
    transform: [{ translateX: -50 }],
    height: 120,
  },
  userName: {
    marginBottom: 32,
    fontFamily: 'Roboto-500',
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    color: '#212121',
  },
  logout: {
    marginLeft: 'auto',
    paddingHorizontal: 10,
    paddingBottom: 46,
  },
  posts: {

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
  reactions: {
    flexDirection: 'row',
  },
  comments: {
    marginRight: 24,
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