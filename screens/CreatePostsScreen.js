
import { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';
import AntDesign from 'react-native-vector-icons/AntDesign';

const initialState = {
  photo: '',
  location: '',
  title: ''
}

export const CreatePostsScreen = ({ navigation }) => {
  const [post, setPost] = useState(initialState);
  const [camera, setCamera] = useState(null);
  const [status, requestPermission] = Camera.useCameraPermissions();

  const takePhoto = async () => {
    requestPermission(true);
    await Location.requestForegroundPermissionsAsync();
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    setPost((prevState) => ({...prevState, location: location, photo: photo}))
  };

  const publishPhoto = () => {
    navigation.navigate('DefaultScreen', { post });
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
      <TouchableOpacity style={styles.publishBtn} onPress={publishPhoto}>
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