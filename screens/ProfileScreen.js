import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../redux/auth/authSlice";
import { logoutUser } from "../redux/auth/authOperations";
import { getUserPosts } from "../firebase/get/getUserPosts";
import { Text, ImageBackground, StyleSheet, View, Image, TouchableOpacity, FlatList } from "react-native";
import { List } from "../components/common/List";
import { colors } from "../styles/colors";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const ProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const name = useSelector(state => state.auth.user.login);
  const userId = useSelector(state => state.auth.user.id);
  const dispatch = useDispatch();
  
  useEffect(() => {
    getAllUserPosts();
  }, []);

  const getAllUserPosts = async () => {
    const items = await getUserPosts(userId);
    setPosts(items);
  };

  const logoutHandler = async () => {
    await logoutUser();
    dispatch(deleteUser());
  };

  return (
    <ImageBackground style={styles.image} source={require('../assets/images/bg-register.jpg')}>
      <View style={styles.profile}>
        <Image source={require('../assets/images/userPhoto.png')} style={styles.photo} />
        <TouchableOpacity style={styles.logout} onPress={logoutHandler}>
          <MaterialIcons name="logout" color={colors.lightGray} size={24} />
        </TouchableOpacity>
        <Text style={styles.name}>{name}</Text>
        <List data={posts} navigation={navigation} />
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
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: colors.white,
  },
  photo: {
    position: 'absolute',
    top: -60,
    left: '50%',
    transform: [{ translateX: -50 }],
    height: 120,
  },
  logout: {
    marginLeft: 'auto',
    paddingHorizontal: 10,
    paddingBottom: 46,
  },
  name: {
    marginBottom: 8,
    fontFamily: 'Roboto-500',
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    color: colors.black,
  },
});