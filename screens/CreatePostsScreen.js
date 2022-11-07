
import { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';
import AntDesign from 'react-native-vector-icons/AntDesign';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from '../firebase/config';
import { collection, addDoc } from "firebase/firestore";
import { useSelector } from 'react-redux';

const initialState = {
  photo: '',
  location: {
    coords: null,
    reversedLocation: ''
  },
  title: ''
}

export const CreatePostsScreen = ({ navigation }) => {
  const [post, setPost] = useState(initialState);
  const [camera, setCamera] = useState(null);
  const [status, requestPermission] = Camera.useCameraPermissions();
  const userId = useSelector(state => state.auth.user.id);  

  const takePhoto = async () => {
    requestPermission(true);
    await Location.requestForegroundPermissionsAsync();
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = location.coords;
    let response = await Location.reverseGeocodeAsync({
      latitude,
      longitude
    });
    const reversedLocation = response[0].city;
    setPost((prevState) => ({ ...prevState, location: { coords: {...location.coords}, reversedLocation: reversedLocation }, photo: photo }));
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(post.photo.uri);
    const blob = await response.blob();
    const uniqueId = uuidv4();
    const storageRef = ref(storage, `postsImages/${uniqueId}`);
    try {
      await uploadBytes(storageRef, blob).then((snapshot) => {
      });
    } catch (error) {
      console.log(error.message);
    }
    const data = await getDownloadURL(ref(storage, storageRef));
    return data;
  };

  const uploadPostToserver = async () => {
    const data = await uploadPhotoToServer();
    try {
      await addDoc(collection(db, "posts"), {
        userId: userId,
        photo: data,
        title: post.title,
        location: post.location
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const submitHandler = async () => {
    //console.log(post);
    uploadPostToserver();
    navigation.navigate('DefaultScreen');
    setPost(initialState);
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        <TouchableOpacity style={styles.cameraBtn} onPress={takePhoto}>
          <AntDesign name="camera" color='#BDBDBD' size={20} />
        </TouchableOpacity>
      </Camera>
      <TextInput
        placeholder='Назва'
        placeholderTextColor='#BDBDBD'
        style={styles.input}
        //onFocus={() => setIsKeyboardShown(true)}
        value={post.title}
        onChangeText={(value) => setPost((prevState) => ({ ...prevState, title: value }))} 
      />
      <TouchableOpacity style={styles.publishBtn} onPress={submitHandler}>
        <Text style={styles.publishBtnText}>Опублікувати</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  camera: {
    marginBottom: 32,
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  cameraBtn: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
  },
  input: {
    marginBottom: 32,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    fontFamily: 'Roboto-500',
    fontSize: 16,
    color: '#212121',
  },
  publishBtn: {
    paddingVertical: 16,
    borderRadius: 100,
    backgroundColor: '#FF6C00',
  },
  publishBtnText: {
    textAlign: 'center',
    fontFamily: 'Roboto-400',
    fontSize: 16,
    color: '#fff'
  }, 
});