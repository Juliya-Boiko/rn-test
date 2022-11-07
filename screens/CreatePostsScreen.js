import { useState } from "react";
import { useSelector } from 'react-redux';
import { Camera } from 'expo-camera';
import { View, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { PrimaryBtn } from "../components/common/PrimaryBtn";
import { getLocation } from '../services/getLocation';
import { uploadPostToserver } from "../services/uploadPostToServer";
import { colors } from "../styles/colors";
import AntDesign from 'react-native-vector-icons/AntDesign';

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

  const snapshotHandler = async () => {
    requestPermission(true);
    const photo = await camera.takePictureAsync();
    const location = await getLocation();
    setPost((prevState) => ({ ...prevState, location, photo }));
  };

  const submitHandler = async () => {
    await uploadPostToserver(post, userId);
    setPost(initialState);
    navigation.navigate('DefaultScreen');
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        <TouchableOpacity style={styles.btn} onPress={snapshotHandler}>
          <AntDesign name="camera" color={colors.lightGray} size={20} />
        </TouchableOpacity>
      </Camera>
      <TextInput
        placeholder='Назва'
        placeholderTextColor={colors.lightGray}
        style={styles.input}
        //onFocus={() => setIsKeyboardShown(true)}
        value={post.title}
        onChangeText={(value) => setPost((prevState) => ({ ...prevState, title: value }))} 
      />
      <PrimaryBtn title='Опублікувати' action={submitHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  camera: {
    marginBottom: 32,
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  btn: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 30,
  },
  input: {
    marginBottom: 32,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.input.border,
    fontFamily: 'Roboto-500',
    fontSize: 16,
    color: colors.black,
  },
});