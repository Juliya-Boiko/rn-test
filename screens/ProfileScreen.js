import { Text, ImageBackground, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from "react-redux";
import { deleteUser } from "../redux/auth/authSlice";
import { logoutUser } from "../redux/auth/authOperations";

export const ProfileScreen = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    logoutUser();
    //console.log('logoutHandler ---->');
    dispatch(deleteUser());
  };

  return (
    <ImageBackground style={styles.image} source={require('../assets/images/bg-register.jpg')}>
      <View style={styles.profile}>
        <Image source={require('../assets/images/userPhoto.png')} style={styles.userPhoto} />
        <TouchableOpacity style={styles.logout} onPress={logoutHandler}>
          <MaterialIcons name="logout" color='#BDBDBD' size={24} />
        </TouchableOpacity>
        <Text style={styles.userName}>userName</Text>
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
  }
  // form: {
  //   paddingTop: 92,
  //   borderTopLeftRadius: 25,
  //   borderTopRightRadius: 25,
  //   backgroundColor: '#fff',
  // },
  // title: {
  //   fontFamily: 'Roboto-700',
  //   fontSize: 30,
  //   lineHeight: 35,
  //   textAlign: 'center',
  //   color: '#212121',
  //   marginBottom: 32
  // },
  // input: {
  //   padding: 10,
  //   marginBottom: 16,
  //   fontFamily: 'Roboto-400',
  //   fontSize: 16,
  //   borderWidth: 1,
  //   borderColor: '#E8E8E8',
  //   backgroundColor: '#F6F6F6',
  //   borderRadius: 6,
  //   color: '#212121',
  // },
  // btn: {
  //   marginBottom: 16,
  //   paddingVertical: 16,
  //   borderRadius: 100,
  //   backgroundColor: '#FF6C00',
  // },
  // btnText: {
  //   fontFamily: 'Roboto-400',
  //   fontSize: 16,
  //   textAlign: 'center',
  //   color: '#fff',
  // },
  // link: {
  //   textAlign: 'center',
  //   fontFamily: 'Roboto-400',
  //   fontSize: 16,
  //  // color: '#1B4371',
  // }
});